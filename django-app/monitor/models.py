from django.db import models

# Create your models here.
class SystemMetrics(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    cpu_usage = models.FloatField()
    memory_usage = models.FloatField()
    
    class Meta:
        ordering = ['-timestamp']