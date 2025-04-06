import django, time, os, threading
django.setup()

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from django.db import transaction
from .models import FileChange

active_observers = {}

class FileChangeHandler(FileSystemEventHandler):
    def __init__(self, scan_path):
        self.scan_path = scan_path
        self.excluded_extensions = ['.tmp', '.swp', '.swx', '.swpx', '-journal','.sqlite3-journal','.db.sqlite', '.db.sqlite3', '.db.sqlite3-journal']
        self.excluded_keywords = ['~', '.git']

    def _should_process(self, event):
        path = event.src_path.lower()

        if any(path.endswith(ext) for ext in self.excluded_extensions):
            print(f"Excluded by extension: {event.src_path}")
            return False

        if any(keyword in path for keyword in self.excluded_keywords):
            print(f"Excluded by keyword: {event.src_path}")
            return False
        
        if 'db.sqlite' in os.path.basename(path):
            print(f"Excluded SQLite file: {event.src_path}")
            return False

        print(f"Processing: {event.src_path} (Directory: {event.is_directory})")
        return True

    def _log_change(self, change_type, event):
        try:
            with transaction.atomic():
                FileChange.objects.create(
                    path=os.path.normpath(event.src_path),
                    change_type=change_type,
                    dest_path=getattr(event, 'dest_path', None),
                    is_directory=event.is_directory
                )
                type_label = " Folder" if event.is_directory else " File"
                print(f" Logged {change_type}: {event.src_path} ({type_label})")
        except Exception as e:
            print(f" DB error during {change_type}: {event.src_path} => {e}")

    def on_created(self, event):
        print(f" Created event: {event.src_path}")
        if self._should_process(event):
            self._log_change('CREATED', event)

    def on_modified(self, event):
        print(f" Modified event: {event.src_path}")
        if self._should_process(event):
            self._log_change('MODIFIED', event)

    def on_deleted(self, event):
        print(f" Deleted event: {event.src_path}")
        if self._should_process(event):
            self._log_change('DELETED', event)

    def on_moved(self, event):
        print(f" Moved event: {event.src_path} -> {event.dest_path}")
        if self._should_process(event):
            self._log_change('MOVED', event)

def start_watching(path_to_watch):
    if not os.path.isdir(path_to_watch):
        raise ValueError(f" Path does not exist: {path_to_watch}")
    
    if path_to_watch in active_observers:
        stop_watching(path_to_watch)
    
    event_handler = FileChangeHandler(path_to_watch)
    observer = Observer()
    observer.schedule(event_handler, path_to_watch, recursive=True)
    observer.start()
    
    active_observers[path_to_watch] = {
        'observer': observer,
        'thread': threading.current_thread()
    }
    print(f" Started watching: {path_to_watch}")

def stop_watching(path_to_watch):
    if path_to_watch in active_observers:
        active_observers[path_to_watch]['observer'].stop()
        active_observers[path_to_watch]['observer'].join()
        del active_observers[path_to_watch]
        print(f"Stopped watching: {path_to_watch}")
