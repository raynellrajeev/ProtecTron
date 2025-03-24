from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import UserData
from .serializers import UserDataSerializer
from django.http import JsonResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.

@csrf_exempt
def check_connection(request):
    return JsonResponse({"message": "Electron-Django connection successful!"}, status=200)

@api_view(['GET'])
def get_users(request):
    users = UserData.objects.all()
    serializer = UserDataSerializer(users, many=True)
    return Response(serializer.data)

def test_api(request):
    return JsonResponse({"message": "Hello from Django!"})

@api_view(['POST'])
def create_message(request):
    serializer = UserDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Message saved successfully!"}, status=201)
    return Response(serializer.errors, status=400)


def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            if username == "admin" and password == "password123":  # Replace with actual authentication logic
                return JsonResponse({"message": "Login successful"}, status=200)
            else:
                return JsonResponse({"message": "Invalid credentials"}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"message": "Invalid request format"}, status=400)

    return JsonResponse({"message": "Method not allowed"}, status=405)