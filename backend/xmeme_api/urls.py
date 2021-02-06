from django.urls import path, include
from .views import MemeAPIView, MemeUpdateAPIView

# added endpoints
urlpatterns = [
    path('memes/', MemeAPIView.as_view()),  # endpoint to fetch the list of memes 
    path('memes/<int:id>/', MemeUpdateAPIView.as_view()),   # endpoint to fetch fetch a single Meme using a particular id
]