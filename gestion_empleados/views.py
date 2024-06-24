from rest_framework import viewsets
from .models import Empleado
from .serializer import EmpleadoSerializer

# gestion_empleados/views.py

from django.shortcuts import render, get_object_or_404
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from .models import Empleado


class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer


class EmpleadoDetalle(RetrieveAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    lookup_field = 'nro_documento'  

    def retrieve(self, request, *args, **kwargs):

        empleado = get_object_or_404(self.queryset, nro_documento=kwargs['nro_documento'])
        serializer = self.serializer_class(empleado)
        return Response(serializer.data)
