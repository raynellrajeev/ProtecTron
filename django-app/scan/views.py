import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from django.http import JsonResponse
from django.middleware.csrf import get_token
import threading
from time import time

active_observers = {}

@api_view(['GET'])
def get_csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

class ScanHandler(FileSystemEventHandler):
    def __init__(self, scan_path):
        self.scan_path = scan_path
        self.last_event_time = 0

    def on_any_event(self, event):
        if time() - self.last_event_time > 0.1:  # 100ms debounce
            if not event.is_directory:
                excluded = ['-journal', '.tmp', '.swp']  # Add other patterns to exclude
                if not any(event.src_path.endswith(ext) for ext in excluded):
                    print(f"Detected change: {event.event_type} - {event.src_path}")
            self.last_event_time = time()
        
    def on_created(self, event):
        if not event.is_directory:
            print(f"File created: {event.src_path}")
        else:
            print(f"Directory created: {event.src_path}")
            
    def on_modified(self, event):
        if not event.is_directory:
            print(f"File modified: {event.src_path}")
        else:
            print(f"Directory modified: {event.src_path}")
            
    def on_deleted(self, event):
        if not event.is_directory:
            print(f"File deleted: {event.src_path}")
        else:
            print(f"Directory deleted: {event.src_path}")
            
    def on_moved(self, event):
        if not event.is_directory:
            print(f"File moved: {event.src_path} -> {event.dest_path}")
        else:
            print(f"Directory moved: {event.src_path} -> {event.dest_path}")


@api_view(['POST'])
def start_watch(request):
    scan_path = request.data.get('path')
    
    if not scan_path or not os.path.isdir(scan_path):
        return Response(
            {"error": "Invalid directory path"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if scan_path in active_observers:
        active_observers[scan_path]['observer'].stop()
        active_observers[scan_path]['observer'].join()
    
    event_handler = ScanHandler(scan_path)
    observer = Observer()
    observer.schedule(event_handler, scan_path, recursive=True)
    observer.start()
    
    active_observers[scan_path] = {
        'observer': observer,
        'thread': threading.current_thread()
    }
    
    return Response({"status": f"Watching {scan_path}"})

@api_view(['POST'])
def stop_watch(request):
    scan_path = request.data.get('path')
    
    if scan_path in active_observers:
        active_observers[scan_path]['observer'].stop()
        active_observers[scan_path]['observer'].join()
        del active_observers[scan_path]
        return Response({"status": f"Stopped watching {scan_path}"})
    
    return Response(
        {"error": "No active watch for this path"},
        status=status.HTTP_404_NOT_FOUND
    )