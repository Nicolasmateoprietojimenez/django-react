# Generated by Django 5.0.6 on 2024-06-24 13:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('gestion_empleados', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TipoHoraRecargo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_hora_recargo', models.CharField(choices=[('extra_diurno', 'Hora extra diurno'), ('extra_nocturno', 'Hora extra nocturno'), ('extra_diurno_dominical_festivo', 'Hora extra diurno dominical y festivo'), ('extra_nocturno_dominical_festivo', 'Hora extra nocturno en domingos y festivos'), ('recargo_nocturno', 'recargo nocturno'), ('recargo_dominical_festivo', 'recargo dominical y festivo'), ('recargo_nocturno_dominical_festivo', 'recargo nocturno en dominical y festivo')], help_text='Tipo de hora con recargo', max_length=50)),
                ('porc_hora_recargo', models.DecimalField(decimal_places=2, help_text='Porcentaje del recargo de la hora', max_digits=5)),
            ],
        ),
        migrations.CreateModel(
            name='HoraExtra',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_hora', models.DateTimeField(help_text='Fecha y hora de la hora extra')),
                ('horas_Semanales', models.CharField(blank=True, choices=[('42', '42 Horas'), ('43', '43 Horas'), ('44', '44 Horas'), ('45', '45 Horas'), ('46', '46 Horas'), ('47', '47 Horas')], help_text='Horas semanales Trbajadas', max_length=3, null=True)),
                ('horas_trabajadas', models.DecimalField(blank=True, decimal_places=2, help_text='Número de horas trabajadas', max_digits=5, null=True)),
                ('valor', models.DecimalField(blank=True, decimal_places=2, help_text='Valor de las horas trabajadas', max_digits=10, null=True)),
                ('nro_documento', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='gestion_empleados.empleado')),
                ('tipo_Hora', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='devengos.tipohorarecargo')),
            ],
        ),
    ]
