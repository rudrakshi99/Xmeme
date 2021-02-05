from django.shortcuts import render
from .models import Meme
from .serializers import MemeSerializer
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import mixins
from rest_framework import status

class MemeAPIView(generics.ListCreateAPIView):
    serializer_class = MemeSerializer
    queryset = Meme.objects.all()
    
    def list(self, request):
        queryset = self.get_queryset()
        serializer = MemeSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def create(self, request):
        serializer = MemeSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
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
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        
        serializer = MemeSerializer(meme)
        return Response(serializer.data)
    
    def patch(self, request, id):
        try:
            meme = Meme.objects.get(id=id)
        except Meme.DoesNotExist:
            return HttpResponse(status=status.HTTP_204_NO_CONTENT)
        
        serializer = MemeSerializer(meme, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
 