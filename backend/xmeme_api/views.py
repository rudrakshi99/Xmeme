from django.shortcuts import render
from .models import Meme
from django.http import HttpResponse
from .serializers import MemeSerializer, MemeUpdateSerializer
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import mixins
from rest_framework import status
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from rest_framework import serializers
from django.db.models import Count

class MemeAPIView(generics.ListCreateAPIView):
    serializer_class = MemeSerializer
    queryset = Meme.objects.all()[:100]
    
    def list(self, request):
        queryset = self.get_queryset()
        serializer = MemeSerializer(queryset, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def create(self, request):
        serializer = MemeSerializer(data=request.data)
        url = serializer['url'] 
        if serializer.is_valid():
            serializer.save()
            validate = URLValidator()
            value = serializer['url']  
            if value:        
                try:
                    validate(value)
                except ValidationError:
                    return HttpResponse(status=status.HTTP_400_BAD_REQUEST) 
                         
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
    
class MemeUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = MemeSerializer
    queryset = Meme.objects.all()
    
    lookup_field = 'id'
    

    def retrieve(self, request, id=None):
        try:
            meme = Meme.objects.get(id=id)
        except Meme.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        
        serializer = MemeSerializer(meme)
        return Response(serializer.data)
    
    def patch(self, request, id):
        try:
            meme = Meme.objects.get(id=id)
        except Meme.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)        
       
        serializer = MemeUpdateSerializer(meme, data=request.data)
        
        if serializer.is_valid():   
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
 