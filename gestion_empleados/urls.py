from django.urls import include, path
from . import views 
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'empleadosrest', views.EmpleadoViewSet)
# Asocias la direccion de la vista
urlpatterns = [
        path('', include(router.urls)),
        path('empleados/<str:nro_documento>/', views.EmpleadoDetalle.as_view(), name='empleado-detalle'),
        path('api/', include('deducciones.api_urls')),  # Incluir las URLs de la app deducciones
]