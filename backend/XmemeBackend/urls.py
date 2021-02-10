from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# schema for swagger view
schema_view = get_schema_view(
   openapi.Info(
      title="XMeme API",
      default_version='v1',
      description="Meme Stream",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="sonirudrakshi99@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('xmemeApi.urls')),  # Included another URLconf of Xmeme 
    path('swagger-ui/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),  # Included another URLconf of swagger api
]
