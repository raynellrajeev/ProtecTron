from django.urls import path
from .views import check_connection, RegisterUserView, LoginUserView, LogoutUserView, test_api

urlpatterns = [
    path('test/', test_api, name='test_api'),
    path("ping/", check_connection, name="ping"),
    path("register/", RegisterUserView.as_view(), name="register"),
    path("login/", LoginUserView.as_view(), name="login"),
    path("logout/", LogoutUserView.as_view(), name="logout"),
]