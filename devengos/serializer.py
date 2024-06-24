from rest_framework import serializers
from .models import HoraExtra

class HoraExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = HoraExtra
        fields = '__all__'