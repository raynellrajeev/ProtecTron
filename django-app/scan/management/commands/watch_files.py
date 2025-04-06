# scan/management/commands/watch_files.py
import os
import time
from django.core.management.base import BaseCommand
from watchdog.observers import Observer
from scan.watchdog import FileChangeHandler
import django
django.setup()

class Command(BaseCommand):
    help = 'Starts file system watcher for specified directory'

    def add_arguments(self, parser):
        parser.add_argument(
            '--path',
            type=str,
            default=os.getcwd(),
            help='Path to watch for changes'
        )
        parser.add_argument(
            '--recursive',
            action='store_true',
            help='Watch directory recursively'
        )

    def handle(self, *args, **options):
        path_to_watch = options['path']
        recursive = options['recursive']
        
        if not os.path.isdir(path_to_watch):
            self.stderr.write(f"Error: {path_to_watch} is not a valid directory")
            return

        self.stdout.write(f"Starting to watch {path_to_watch} {'recursively' if recursive else ''}...")
        
        event_handler = FileChangeHandler(path_to_watch)
        observer = Observer()
        observer.schedule(event_handler, path_to_watch, recursive=recursive)
        observer.start()

        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            observer.stop()
            self.stdout.write("\nStopped watching directory")
        observer.join()