import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosconfig';

function EmpleadoDetalle({ numeroDocumento }) {
  const [empleado, setEmpleado] = useState(null);
  const [seguridadSocial, setSeguridadSocial] = useState({});
  const [prima, setPrima] = useState(null);
  const [arl, setArl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (numeroDocumento) {
      axiosInstance.get(`empleados/${numeroDocumento}/`)
        .then(response => {
          if (response.data) {
            setEmpleado(response.data);
            fetchSeguridadSocial();
            fetchPrima();
            fetchArl();
            setError(null);
          } else {
            setError('Empleado no encontrado');
            setEmpleado(null);
            setSeguridadSocial({});
            setPrima(null);
            setArl(null);
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
          setPrima(null);
          setArl(null);
        });
    } else {
      setError('No se ha ingresado ningún número de documento');
      setEmpleado(null);
      setSeguridadSocial({});
      setPrima(null);
      setArl(null);
    }
  }, [numeroDocumento]);

  const fetchSeguridadSocial = () => {
    axiosInstance.get(`seguridad_social/${numeroDocumento}/calcular_seguridad_social/`)
      .then(response => {
        setSeguridadSocial(response.data);
      })
      .catch(() => {
        console.error('Error al obtener seguridad social');
        setSeguridadSocial({});
      });
  };

  const fetchPrima = () => {
    axiosInstance.get(`primas/${numeroDocumento}/calcular_prima/`)
      .then(response => {
        setPrima(response.data.prima_calculada);
      })
      .catch(() => {
        console.error('Error al obtener prima');
        setPrima(null);
      });
  };

  const fetchArl = () => {
    axiosInstance.get(`nivel_riesgo/${numeroDocumento}/calcular_arl/`)
      .then(response => {
        setArl(response.data.valor_arl);
      })
      .catch(() => {
        console.error('Error al obtener ARL');
        setArl(null);
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
      <p>Documento: {empleado.nro_documento}</p>
      <p>Salario: {empleado.salario_base}</p>
      <p>Tipo de Empleado: {empleado.tipo_empleado}</p>
      <p>Nivel de Riesgo: {empleado.nivel_riesgo}</p>
      <h3>Seguridad Social</h3>
      <p>Salud Descuento: {seguridadSocial.salud_descuento}</p>
      <p>Pensión Descuento: {seguridadSocial.pension_descuento}</p>
      <p>Salario Final: {seguridadSocial.salario_final}</p>
      <h3>Prima</h3>
      <p>Prima Calculada: {prima !== null ? prima : 'No disponible'}</p>
      <h3>ARL</h3>
      <p>Valor ARL: {arl !== null ? arl : 'No disponible'}</p>
    </div>
  );
}

export default EmpleadoDetalle;
