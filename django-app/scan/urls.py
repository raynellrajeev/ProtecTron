from django.urls import path
from . import views

urlpatterns = [
    path('start/', views.start_watch, name='start_watch'),
    path('stop/', views.stop_watch, name='stop_watch'),
    path('csrf/', views.get_csrf, name='get_csrf'),
]