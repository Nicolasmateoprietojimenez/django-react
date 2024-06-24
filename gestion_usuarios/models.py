from django.db import models

class Departamento(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
    
    
class Ciudad(models.Model):
    nombre = models.CharField(max_length=100)
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre


class Empleado(models.Model):
    
    # Datos de logeo y verificación de registro
    TIPO_DOCUMENTO_CHOICES = (
        ('CC', 'Cédula de Ciudadanía'),
        ('CE', 'Cédula de Extranjería'),
        ('PSP', 'Pasaporte'),
    )
    tipo_documento = models.CharField(max_length=20, choices=TIPO_DOCUMENTO_CHOICES)
    fecha_expedicion = models.DateField()
    nro_documento = models.CharField(primary_key=True, max_length=20)
    password = models.CharField(max_length=100)
    correo = models.EmailField()
    estado_cuenta = models.BooleanField(default=False)  # Toda cuenta creada deberá ser activada por medio de correo electrónico

    
    # Datos básicos para todos los roles
    ciudad = models.ForeignKey(Ciudad, on_delete=models.CASCADE, null=True)
    nombre1 = models.CharField(max_length=255)
    nombre2 = models.CharField(max_length=255, blank=True, null=True)
    apellido1 = models.CharField(max_length=255)
    apellido2 = models.CharField(max_length=255, blank=True, null=True)
    numero_celular = models.CharField(max_length=20, blank=True, null=True)
    fecha_nacimiento = models.DateField(blank=True, null=True)

    # Campos para la nómina
    salario_base = models.IntegerField(blank=True, null=True)
    fecha_ingreso = models.DateField(blank=True, null=True)
    ROL_CHOICES = [
        ('GESTOR', 'Gestor'),
        ('OPERADOR', 'Operador'),
        ('LECTOR', 'Lector'),
    ]
    rol = models.CharField(max_length=8, choices=ROL_CHOICES, default='GESTOR')   
     
    TIPO_EMPLEADO_CHOICES = [
        ('INDEPENDIENTE', 'Independiente'),
        ('DEPENDIENTE', 'Dependiente'),
    ]
    tipo_empleado = models.CharField(max_length=13, choices=TIPO_EMPLEADO_CHOICES, blank=True, null=True)
    auxilio_transporte = models.BooleanField(default=True)

    # Campos específicos de los roles operador y lector
    
    direccion = models.CharField(max_length=255, blank=True, null=True)
    estado_civil = models.CharField(max_length=20, blank=True, null=True)
    
    # Relación con el modelo NivelRiesgo de deducciones
    NIVELES_RIESGO = [
        ('0.522%', 'Riesgo I: 0.522%'),
        ('1.044%', 'Riesgo II: 1.044%'),
        ('2.436%', 'Riesgo III: 2.436%'),
        ('4.350%', 'Riesgo IV: 4.350%'),
        ('6.960%', 'Riesgo V: 6.960%'),
    ]
    
    nivel_riesgo = models.CharField(
        max_length=20,
        choices=NIVELES_RIESGO,
        null=True,
        blank=True,
        help_text='Nivel de riesgo y porcentaje'
    )
    def __str__(self):
        return f"{self.nro_documento}"

