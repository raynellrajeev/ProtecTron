# scan/serializers.py
from rest_framework import serializers
from .models import FileChange

class FileChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileChange
        fields = '__all__'
        
    def to_representation(self, instance):
        print("Serializing:", instance)  # Debug log
        return super().to_representation(instance)