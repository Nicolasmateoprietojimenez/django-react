# Generated by Django 5.0.6 on 2024-06-20 13:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('deducciones', '0001_initial'),
        ('gestion_usuarios', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='prima',
            name='empleado',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion_usuarios.empleado'),
        ),
        migrations.AddField(
            model_name='seguridadsocial',
            name='empleado',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='seguridad_social', to='gestion_usuarios.empleado'),
        ),
    ]
