import psutil
from django.utils import timezone
from ..models import SystemMetrics
from threading import Thread
import time

class SystemMonitor:
    def __init__(self, interval=1):
        self.interval = interval
        self._is_running = False
        self.thread = None

    def _collect_metrics(self):
        """Collect and return current system metrics"""
        return {
            'timestamp': timezone.now(),
            'cpu_usage': psutil.cpu_percent(interval=0.5),
            'memory_usage': psutil.virtual_memory().percent,
        }

    def _monitor_loop(self):
        while self._is_running:
            metrics = self._collect_metrics()
            SystemMetrics.objects.create(**metrics)
            time.sleep(self.interval)

    def start(self):
        if not self._is_running:
            self._is_running = True
            self.thread = Thread(target=self._monitor_loop)
            self.thread.daemon = True
            self.thread.start()

    def stop(self):
        self._is_running = False
        if self.thread:
            self.thread.join()

# Initialize and start immediately
monitor = SystemMonitor(interval=1)  # 1-second interval
monitor.start()