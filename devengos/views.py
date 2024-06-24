from django.http import HttpRequest
from django.shortcuts import render,redirect
#from . forms import UsuarioForm

from . models import HoraExtra
from .serializer import HoraExtraSerializer
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser

class HorasView(viewsets.ModelViewSet):
    queryset = HoraExtra.objects.all()
    serializer_class = HoraExtraSerializer
    parser_classes = (MultiPartParser, FormParser)

