from django.urls import path
from .views import start_watching, stop_watching, get_changes

urlpatterns = [
    path('start/', start_watching, name='start-watch'),
    path('stop/', stop_watching, name='stop-watch'),
    path('changes/', get_changes, name='file-changes'),
]