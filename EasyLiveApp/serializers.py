from .models import sensor
from rest_framework import serializers

class IOTSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=sensor 
        fields=['id','nom','postion','state','status']