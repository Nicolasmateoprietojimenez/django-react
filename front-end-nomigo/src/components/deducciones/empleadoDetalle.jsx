import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EmpleadoDetalle() {
  const [empleado, setEmpleado] = useState(null);
  const { nro_documento } = useParams();
  const [seguridadSocial, setSeguridadSocial] = useState({});

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/empleados/${nro_documento}/`);
        if (!response.ok) {
          throw new Error('Error al obtener empleado');
        }
        const data = await response.json();
        setEmpleado(data);
        // Llamar a fetchSeguridadSocial solo después de haber establecido empleado
        fetchSeguridadSocial(data.nro_documento);
      } catch (error) {
        console.error('Error al obtener empleado:', error);
      }
    };

    if (nro_documento) {
      fetchEmpleado();
    }
  }, [nro_documento]);

  const fetchSeguridadSocial = async (doc) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/seguridad_social/${doc}/calcular_seguridad_social/`);
      if (!response.ok) {
        throw new Error('Error al obtener seguridad social');
      }
      const data = await response.json();
      setSeguridadSocial(data);
    } catch (error) {
      console.error('Error al obtener seguridad social:', error);
      setSeguridadSocial({});
    }
  };

  if (!empleado) {
    return null;
  }

  return (
    <div>
      <h2>Detalles del Empleado</h2>
      <p>Nombre: {empleado.nombre1} {empleado.nombre2}</p>
      <p>Apellido: {empleado.apellido1} {empleado.apellido2}</p>
      <p>Documento: {empleado.nro_documento}</p>
      <p>Salario: {empleado.salario_base}</p>
      <p>Tipo de Empleado: {empleado.tipo_empleado}</p>
      <p>Nivel de Riesgo: {empleado.nivel_riesgo}</p>

      <h3>Seguridad Social</h3>
      <p>Salud Descuento: {seguridadSocial.salud_descuento}</p>
      <p>Pensión Descuento: {seguridadSocial.pension_descuento}</p>
      <p>Salario Final: {seguridadSocial.salario_final}</p>
    </div>
  );
}

export default EmpleadoDetalle;
