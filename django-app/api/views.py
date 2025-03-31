from django.contrib.auth import get_user_model, authenticate, login, logout
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse
from rest_framework.parsers import JSONParser, FormParser

from .serializers import UserSerializer

User = get_user_model()  # Uses custom user model if defined

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser, FormParser]  # Allow JSON and x-www-form-urlencoded

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password are required"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=400)

        user = User.objects.create_user(username=username, password=password)
        return Response({"message": "User registered successfully!"}, status=201)

class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response({"message": "Login successful"}, status=200)
        return Response({"error": "Invalid credentials"}, status=401)

class LogoutUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=200)

@api_view(["GET"])
@permission_classes([AllowAny])
def check_connection(request):
    return Response({"message": "Electron-Django connection successful!"})

@api_view(["GET"])
@permission_classes([AllowAny])
def test_api(request):
    return Response({"message": "Hello from Django!"})