from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CustomUser
from django.http import JsonResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login, logout

class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

# Create your views here.
@csrf_exempt
def register_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            # Check if the user already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({"message": "Username already taken"}, status=400)

            # Create a new user
            user = User.objects.create_user(username=username, password=password)
            return JsonResponse({"message": "User registered successfully!"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON format"}, status=400)

    return JsonResponse({"message": "Method not allowed"}, status=405)


# ✅ Login a User
@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            # Authenticate user
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({"message": "Login successful"}, status=200)
            else:
                return JsonResponse({"message": "Invalid credentials"}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid JSON format"}, status=400)

    return JsonResponse({"message": "Method not allowed"}, status=405)


# ✅ Logout a User
@csrf_exempt
def logout_user(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({"message": "Logged out successfully"}, status=200)

    return JsonResponse({"message": "Method not allowed"}, status=405)

@csrf_exempt
def check_connection(request):
    return JsonResponse({"message": "Electron-Django connection successful!"}, status=200)

# @api_view(['GET'])
# def get_users(request):
#     users = UserData.objects.all()
#     serializer = UserDataSerializer(users, many=True)
#     return Response(serializer.data)

def test_api(request):
    return JsonResponse({"message": "Hello from Django!"})

# @api_view(['POST'])
# def create_message(request):
#     serializer = UserDataSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "Message saved successfully!"}, status=201)
#     return Response(serializer.errors, status=400)


# def login_view(request):
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)
#             username = data.get("username")
#             password = data.get("password")

#             if username == "admin" and password == "password123":  # Replace with actual authentication logic
#                 return JsonResponse({"message": "Login successful"}, status=200)
#             else:
#                 return JsonResponse({"message": "Invalid credentials"}, status=401)

#         except json.JSONDecodeError:
#             return JsonResponse({"message": "Invalid request format"}, status=400)

#     return JsonResponse({"message": "Method not allowed"}, status=405)