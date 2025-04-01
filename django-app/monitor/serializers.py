from rest_framework import serializers
from .models import SystemMetrics

class SystemMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemMetrics
        fields = ['timestamp', 'cpu_usage', 'memory_usage']