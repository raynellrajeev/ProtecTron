from django.urls import path
from .views import (SystemMetricsList, CurrentSystemMetrics, 
                   StartMonitoring, StopMonitoring)

urlpatterns = [
    path('metrics/', SystemMetricsList.as_view(), name='metrics-list'),
    path('metrics/current/', CurrentSystemMetrics.as_view(), name='current-metrics'),
    path('monitor/start/', StartMonitoring.as_view(), name='start-monitoring'),
    path('monitor/stop/', StopMonitoring.as_view(), name='stop-monitoring'),
]