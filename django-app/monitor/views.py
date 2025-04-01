import psutil
from django.utils import timezone
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SystemMetrics
from .serializers import SystemMetricsSerializer
from .services.monitor_service import monitor
from datetime import timedelta

class SystemMetricsList(generics.ListAPIView):
    serializer_class = SystemMetricsSerializer

    def get_queryset(self):
        # Return last 100 metrics from the last 5 minutes
        time_threshold = timezone.now() - timedelta(minutes=5)
        return SystemMetrics.objects.filter(
            timestamp__gte=time_threshold
        ).order_by('-timestamp')[:100]

class CurrentSystemMetrics(generics.GenericAPIView):
    def get(self, request):
        # Get the most recent metric
        latest = SystemMetrics.objects.last()
        if not latest:
            return Response({
                'error': 'No metrics collected yet',
                'timestamp': timezone.now().isoformat()
            }, status=503)
            
        return Response({
            'cpu_usage': latest.cpu_usage,
            'memory_usage': latest.memory_usage,
            'timestamp': latest.timestamp.isoformat()
        })

class StartMonitoring(APIView):
    def post(self, request):
        monitor.start()
        return Response({'status': 'Monitoring started'})

class StopMonitoring(APIView):
    def post(self, request):
        monitor.stop()
        return Response({'status': 'Monitoring stopped'})