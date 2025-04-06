from django.db import models

class FileChange(models.Model):
    CHANGE_TYPES = [
        ('CREATED', 'Created'),
        ('MODIFIED', 'Modified'),
        ('DELETED', 'Deleted'),
        ('MOVED', 'Moved'),
    ]
    
    path = models.TextField()
    change_type = models.CharField(max_length=10, choices=CHANGE_TYPES)
    dest_path = models.TextField(null=True, blank=True)
    is_directory = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
        verbose_name = 'File Change Log'
        verbose_name_plural = 'File Change Logs'
    
    def __str__(self):
        return f"{self.change_type} {self.path}"