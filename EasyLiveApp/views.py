from django.shortcuts import render
from EasyLiveApp.models import Client, Appareil, Position

from .models import sensor
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from  django.conf import settings
import os
import json

from .models import sensor
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .serializers import IOTSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status



client = Client.objects.all()
appareil = Appareil.objects.all()
pos = Position.objects.all()
# Create your views here.
def Home (Request):
    return render(Request,'client.html',{'client':client, 'appareil':appareil,'pos':pos})

def Smart(Request):
    return render(Request, 'control.html')

def Login(Request):
    return render(Request, 'login.html' )

def Appareil(Request):
    return render(Request, 'appareils.html',{'client':client,'appareil':appareil,'pos':pos} )

def posit(Request):
    return render(Request, 'position.html',{ 'client':client,'appareil':appareil,'pos':pos} )

def create(Request):
    return render(Request, 'creation.html' )

def vocal(Request):
    return render(Request, 'vocal.html' )



@api_view(['GET' ,'POST'])
def liste(request):
    if request.method=='GET':
        Iot = sensor.objects.all()
        seriali = IOTSerializer(Iot, many=True)
        return JsonResponse({'sensor':seriali.data})
    if request.method== 'POST':
        seriali = IOTSerializer(data=request.data)
        if seriali.is_valid():
            seriali.save()
            return Response (seriali.data, status=status.HTTP_201_CREATED)
        
@api_view(['PUT','GET','DELETE'])

def uni(request,id):
    try :
        senso = sensor.objects.get(id=id)
    except sensor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    senso = get_object_or_404(sensor, pk=id)
    if request.method=='PUT':   
        serial = IOTSerializer(senso, data=request.data)
        if serial.is_valid():
            serial.save()
            return Response(serial.data, status=status.HTTP_202_ACCEPTED)
        return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)
        
    if request.method=='GET':
        serial = IOTSerializer(senso)
        return JsonResponse(serial.data, safe=False)
    
    if request.method == 'DELETE':
        senso = sensor.objects.get(id=id)
        senso.delete()
        return Response("delete")


