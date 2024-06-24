// seguridadSocial.jsx

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosconfig'; // Ajusta la ruta según la ubicación real

function SeguridadSocial() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = () => {
    axiosInstance.get('empleados/')
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
