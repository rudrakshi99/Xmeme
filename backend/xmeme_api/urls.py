from django.urls import path, include
from .views import MemeAPIView, MemeUpdateAPIView


urlpatterns = [
    path('memes/', MemeAPIView.as_view()),
    path('memes/<int:id>/', MemeUpdateAPIView.as_view()),
]