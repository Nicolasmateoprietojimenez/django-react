from django.urls import include, path
from . import views 
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'empleadosrest', views.EmpleadoViewSet)
# Asocias la direccion de la vista
urlpatterns = [
        path('', include(router.urls)),
]