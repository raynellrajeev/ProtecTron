from django.urls import path
from .views import check_connection, register_user, login_user, logout_user, test_api, CreateUserView

urlpatterns = [
    # path('users/', get_users),
    path('test/', test_api, name='test_api'),
    # path("submit/", login_view, name="submit"),
    path("ping/", check_connection, name="ping"),
    path("register/", register_user, name="register"),
    path("login/", login_user, name="login"),
    path("logout/", logout_user, name="logout"),
]