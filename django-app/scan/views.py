# scan/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import FileChange
from .serializers import FileChangeSerializer
import os

# scan/views.py
@api_view(['POST'])
def start_watching(request):
    scan_path = request.data.get('path')
    
    if not scan_path or not os.path.isdir(scan_path):
        return Response(
            {"error": "Invalid directory path"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        from .watchdog import start_watching as start_watch
        start_watch(scan_path)  # Start the observer
        return Response({"status": f"Watching {scan_path}"})
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def stop_watching(request):
    scan_path = request.data.get('path')
    try:
        from .watchdog import stop_watching as stop_watch
        stop_watch(scan_path)  # Stop the observer
        return Response({"status": f"Stopped watching {scan_path}"})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_changes(request):
    try:
        print("Querying database for changes...")  # Debug log
        changes = FileChange.objects.all().order_by('-timestamp').values()[:100]
        print(f"Found {len(changes)} changes")  # Debug log
        
        serializer = FileChangeSerializer(changes, many=True)
        print("Serialized data:", serializer.data)  # Debug log
        
        return Response(serializer.data)
    except Exception as e:
        print("Error in get_changes:", str(e))  # Debug log
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
@api_view(['POST'])
def clear_logs(request):
    try:
        FileChange.objects.all().delete()
        return Response({'message': 'Logs cleared'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)