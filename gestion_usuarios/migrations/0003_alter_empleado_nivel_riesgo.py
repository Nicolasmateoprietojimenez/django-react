# Generated by Django 5.0.6 on 2024-06-20 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_usuarios', '0002_remove_empleado_documento_identidad'),
    ]

    operations = [
        migrations.AlterField(
            model_name='empleado',
            name='nivel_riesgo',
            field=models.CharField(blank=True, choices=[('0.522%', 'Riesgo I: 0.522%'), ('1.044%', 'Riesgo II: 1.044%'), ('2.436%', 'Riesgo III: 2.436%'), ('4.350%', 'Riesgo IV: 4.350%'), ('6.960%', 'Riesgo V: 6.960%')], help_text='Nivel de riesgo y porcentaje', max_length=20, null=True),
        ),
    ]
