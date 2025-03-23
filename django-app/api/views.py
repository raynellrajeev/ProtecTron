from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import UserData
from .serializers import UserDataSerializer
from django.http import JsonResponse

# Create your views here.

@api_view(['GET'])
def get_users(request):
    users = UserData.objects.all()
    serializer = UserDataSerializer(users, many=True)
    return Response(serializer.data)

def test_api(request):
    return JsonResponse({"message": "Hello from Django!"})

