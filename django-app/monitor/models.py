from django.db import models
from django.utils import timezone

# Create your models here.
class SystemMetrics(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    cpu_usage = models.FloatField()
    memory_usage = models.FloatField()
    
    class Meta:
        ordering = ['-timestamp']

class DiskUsage(models.Model):
    timestamp = models.DateTimeField(default=timezone.now)
    drive = models.CharField(max_length=10)
    usage_percent = models.FloatField()
    total_space = models.BigIntegerField()
    used_space = models.BigIntegerField()

    class Meta:
        ordering = ['-timestamp']