// src/components/EmpleadoDetalle.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosconfig';

function EmpleadoDetalle({ numeroDocumento }) {
  const [empleado, setEmpleado] = useState(null);
  const [seguridadSocial, setSeguridadSocial] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (numeroDocumento) {
      axiosInstance.get(`empleados/${numeroDocumento}/`)
        .then(response => {
          if (response.data) {
            setEmpleado(response.data);
            fetchSeguridadSocial(response.data.nro_documento);
            setError(null);
          } else {
            setError('Empleado no encontrado');
            setEmpleado(null);
            setSeguridadSocial({});
          }
        })
        .catch(error => {
          console.error('Error al obtener empleado:', error);
          if (error.response && error.response.status === 404) {
            setError('Empleado no encontrado');
          } else {
            setError('Error al obtener empleado');
          }
          setEmpleado(null);
          setSeguridadSocial({});
        });
    } else {
      setError('No se ha ingresado ningún número de documento');
      setEmpleado(null);
      setSeguridadSocial({});
    }
  }, [numeroDocumento]);

  const fetchSeguridadSocial = (doc) => {
    axiosInstance.get(`seguridad_social/${doc}/calcular_seguridad_social/`)
      .then(response => {
        setSeguridadSocial(response.data);
      })
      .catch(() => {
        console.error('Error al obtener seguridad social');
        setSeguridadSocial({});
      });
  };

  if (!numeroDocumento) {
    return <div>No se ha ingresado ningún número de documento</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!empleado) {
    return <div>Cargando...</div>;
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
