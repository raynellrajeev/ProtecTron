from rest_framework import serializers
from .models import SystemMetrics, DiskUsage

class SystemMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemMetrics
        fields = ['timestamp', 'cpu_usage', 'memory_usage']
class DiskUsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiskUsage
        fields = '__all__'