// src/componentes/buscarEmpleado.jsx
import React, { useState } from 'react';
import axiosInstance from '../../axiosconfig';
import { useNavigate } from 'react-router-dom';

function BuscarEmpleado({ onEmployeeFound }) {
  const [documento, setDocumento] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!documento) {
      setError('Por favor ingrese un número de documento');
      return;
    }

    axiosInstance.get(`empleados/${documento}/`)
      .then(response => {
        if (response.data) {
          console.log("Empleado encontrado:", response.data);
          onEmployeeFound(response.data); 
          setError(null);
          navigate('/empleado-detalle');
        } else {
          setError('Empleado no encontrado');
        }
      })
      .catch(error => {
        console.error('Error al buscar el empleado:', error);
        setError('Error al buscar el empleado');
      });
  };

  return (
    <div>
      <h2>Buscar Empleado</h2>
      <input
        type="text"
        value={documento}
        onChange={e => setDocumento(e.target.value)}
        placeholder="Ingrese número de documento"
      />
      <button onClick={handleSearch}>Buscar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default BuscarEmpleado;
