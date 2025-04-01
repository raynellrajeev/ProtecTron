from django.core.management.base import BaseCommand
from monitor.models import DiskUsage
import psutil
from datetime import datetime

class Command(BaseCommand):
    help = 'Collect disk usage statistics'

    def handle(self, *args, **options):
        for part in psutil.disk_partitions(all=False):
            try:
                usage = psutil.disk_usage(part.mountpoint)
                DiskUsage.objects.create(
                    drive=part.device.split('/')[-1],
                    usage_percent=round(usage.percent, 2),
                    total_space=usage.total,
                    used_space=usage.used
                )
                self.stdout.write(f"Saved {part.device} usage: {usage.percent}%")
            except Exception as e:
                self.stderr.write(f"Error saving {part.device}: {str(e)}")