from django.urls import path
from .views import get_users
from .views import test_api

urlpatterns = [
    path('users/', get_users),
    path('test/', test_api, name='test_api'),
]