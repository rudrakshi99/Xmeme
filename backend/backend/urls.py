from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('xmeme_api.urls'))  # Included another URLconf of Xmeme 
]
