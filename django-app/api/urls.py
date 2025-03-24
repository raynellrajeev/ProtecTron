from django.urls import path
from .views import get_users
from .views import test_api
from .views import login_view
from .views import check_connection

urlpatterns = [
    path('users/', get_users),
    path('test/', test_api, name='test_api'),
    path("submit/", login_view, name="submit"),
    path("ping/", check_connection, name="ping"),
]