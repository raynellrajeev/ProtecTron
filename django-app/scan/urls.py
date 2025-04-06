from django.urls import path
from .views import start_watching, stop_watching, get_changes, clear_logs

urlpatterns = [
    path('start/', start_watching, name='start-watch'),
    path('stop/', stop_watching, name='stop-watch'),
    path('changes/', get_changes, name='file-changes'),
    path('clear/', clear_logs, name='clear_logs'),
]