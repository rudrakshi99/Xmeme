from django.shortcuts import render
from .models import Meme
from django.http import HttpResponse
from .serializers import MemeSerializer, MemeUpdateSerializer
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework.generics import GenericAPIView

# The generic views provided by Django REST framework allow you to quickly build API views that map closely to your database models.


## ------------------- GenericAPIview for GET and POST requests -------------------------##
class MemeAPIView(generics.ListCreateAPIView):
    serializer_class = MemeSerializer                                   # include the MemeSerializer class
    queryset = Meme.objects.all().order_by('-id')[:100]                 # get the latest 100 memes created by the backend
    
    # GET the list of memes
    def list(self, request):
        queryset = self.get_queryset()
        serializer = MemeSerializer(queryset, many=True)                 # convert complex data by passing into serializer
        return Response(serializer.data, status=status.HTTP_201_CREATED) # return http satuts 201
    
    
    # POST the meme
    def create(self, request):
        serializer = MemeSerializer(data=request.data)  # convert complex data by passing into serializer
        if serializer.is_valid():                       # check for validation of data
            new_name=request.data['name']
            new_caption=request.data['caption']
            new_url=request.data['url']
            duplicate_meme=Meme.objects.filter(name=new_name,caption=new_caption,url=new_url)  # check the duplicate meme

            if duplicate_meme.exists():
                return Response("Duplicate Values of Meme",status=status.HTTP_409_CONFLICT)   # return http status 409 for duplication
            serializer.save()          
            validate = URLValidator() 
            value = serializer.data['url']                                           # get the url value
            
            if value:                                                           # check for valid url 
                try:
                    validate(value)
                except ValidationError:
                    return HttpResponse(status=status.HTTP_400_BAD_REQUEST)     # return error for invalid url
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)    # return http satuts 201 when post is created successfully
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # return error for invalid data


        
## ------------------------------ GenericAPIview for RETRIEVE and PATCH requests ------------------------------------##
class MemeUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = MemeSerializer                                           # include the MemeSerializer class
    queryset = Meme.objects.all()                                               # Get the base queryset
    
    lookup_field = 'id'                                                         # comparing through id
    
    # RETRIEVE the specific meme through 'id'
    def retrieve(self, request, id=None):
        try:                                                        # check if meme exist
            meme = Meme.objects.get(id=id)
        except Meme.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)   # return http status 404 if meme doesn't exist
        
        serializer = MemeSerializer(meme)                           # convert complex data by passing into serializer
        return Response(serializer.data)                            # return the JSON response
    
    
    # UPDATE the specific meme details through 'id' except the name
    def patch(self, request, id):
        try:                                                        # check if meme exist
            meme = Meme.objects.get(id=id)                          
        except Meme.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)   # return http status 404 if meme doesn't exist   
       
        serializer = MemeUpdateSerializer(meme, data=request.data)  # convert complex data by passing into serializer 
                                                                    # but make name as 'read ony field'
        
        if serializer.is_valid():                                   # check for validation of data
            serializer.save()
            return Response(serializer.data)                        # return updated the JSON response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # return error for invalid data
     
    
    def delete(self,request,id):
        try:                                                        # check if meme exist
            meme = Meme.objects.get(id=id)
        except Meme.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)   # return http status 404 if meme doesn't exist
        meme.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)          # return http status 204 
