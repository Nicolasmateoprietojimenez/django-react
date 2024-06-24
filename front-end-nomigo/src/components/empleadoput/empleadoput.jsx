import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmpleadoForm = () => {
  const { nro_documento } = useParams();
  const [empleado, setEmpleado] = useState({
    nro_documento: '',
    tipo_documento: '',
    fecha_expedicion: '',
    correo: '',
    estado_cuenta: false,
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    numero_celular: '',
    fecha_nacimiento: '',
    salario_base: '',
    fecha_ingreso: '',
    rol: '',
    tipo_empleado: '',
    auxilio_transporte: false,
    direccion: '',
    estado_civil: '',
    nivel_riesgo: '',
    ciudad: ''
  });

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/empleadosrest/${nro_documento}/`); // 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEmpleado(data);
      } catch (error) {
        console.error('Error fetching empleado:', error);
      }
    };

    fetchEmpleado();
  }, [nro_documento]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmpleado((prevEmpleado) => ({
      ...prevEmpleado,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/empleadosrest/${nro_documento}/`, { //
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(empleado)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert('Empleado actualizado exitosamente');
    } catch (error) {
      console.error('Error updating empleado:', error);
      alert('Error al actualizar el empleado');
    }
  };

  return (
    empleado ? (
      <form onSubmit={handleSubmit}>
        <label>
          Nro Documento:
          <input type="text" name="nro_documento" value={empleado.nro_documento} onChange={handleChange} readOnly />
        </label>
        <label>
          Tipo Documento:
          <input type="text" name="tipo_documento" value={empleado.tipo_documento} onChange={handleChange} />
        </label>
        <label>
          Fecha Expedición:
          <input type="date" name="fecha_expedicion" value={empleado.fecha_expedicion} onChange={handleChange} />
        </label>
        <label>
          Correo:
          <input type="email" name="correo" value={empleado.correo} onChange={handleChange} />
        </label>
        <label>
          Estado Cuenta:
          <input type="checkbox" name="estado_cuenta" checked={empleado.estado_cuenta} onChange={handleChange} />
        </label>
        <label>
          Primer Nombre:
          <input type="text" name="nombre1" value={empleado.nombre1} onChange={handleChange} />
        </label>
        <label>
          Segundo Nombre:
          <input type="text" name="nombre2" value={empleado.nombre2} onChange={handleChange} />
        </label>
        <label>
          Primer Apellido:
          <input type="text" name="apellido1" value={empleado.apellido1} onChange={handleChange} />
        </label>
        <label>
          Segundo Apellido:
          <input type="text" name="apellido2" value={empleado.apellido2} onChange={handleChange} />
        </label>
        <label>
          Número Celular:
          <input type="text" name="numero_celular" value={empleado.numero_celular} onChange={handleChange} />
        </label>
        <label>
          Fecha Nacimiento:
          <input type="date" name="fecha_nacimiento" value={empleado.fecha_nacimiento} onChange={handleChange} />
        </label>
        <label>
          Salario Base:
          <input type="number" name="salario_base" value={empleado.salario_base} onChange={handleChange} />
        </label>
        <label>
          Fecha Ingreso:
          <input type="date" name="fecha_ingreso" value={empleado.fecha_ingreso} onChange={handleChange} />
        </label>
        <label>
          Rol:
          <input type="text" name="rol" value={empleado.rol} onChange={handleChange} />
        </label>
        <label>
          Tipo Empleado:
          <input type="text" name="tipo_empleado" value={empleado.tipo_empleado} onChange={handleChange} />
        </label>
        <label>
          Auxilio Transporte:
          <input type="checkbox" name="auxilio_transporte" checked={empleado.auxilio_transporte} onChange={handleChange} />
        </label>
        <label>
          Dirección:
          <input type="text" name="direccion" value={empleado.direccion} onChange={handleChange} />
        </label>
        <label>
          Estado Civil:
          <input type="text" name="estado_civil" value={empleado.estado_civil} onChange={handleChange} />
        </label>
        <label>
          Nivel Riesgo:
          <input type="text" name="nivel_riesgo" value={empleado.nivel_riesgo} onChange={handleChange} />
        </label>
        <label>
          Ciudad:
          <input type="text" name="ciudad" value={empleado.ciudad || ''} onChange={handleChange} />
        </label>
        <button type="submit">Actualizar</button>
      </form>
    ) : (
      <p>Cargando...</p>
    )
  );
};

export default EmpleadoForm;
