// seguridadSocial.jsx

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosconfig';
import { useParams } from 'react-router-dom';

function SeguridadSocial() {
  const [empleados, setEmpleados] = useState([]);
  const { nro_documento } = useParams();

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = () => {
    axiosInstance.get(`empleados/${nro_documento}/`)
      .then(response => {
        setEmpleados(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los empleados:', error);
      });
  };

  return (
    <div>
      <h1>Seguridad Social</h1>
      <ul>
        {empleados.map(empleado => (
          <li key={empleado.id}>
            Nombre: {empleado.nombre1} - Documento: {empleado.nro_documento}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeguridadSocial;
