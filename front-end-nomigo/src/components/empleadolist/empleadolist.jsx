import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './empleadolist.css';

const EmpleadoList = () => {
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        fetchEmpleados();
    }, []);

    const fetchEmpleados = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/empleados/empleadosrest/');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setEmpleados(data);
        } catch (error) {
            console.error('Error fetching empleados:', error);
        }
    };

    const handleEliminarRegistro = async (nro_documento) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/empleados/empleadosrest/${nro_documento}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el registro');
            }
            setEmpleados(empleados.filter(empleado => empleado.nro_documento !== nro_documento));
            alert('Registro eliminado exitosamente.');
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
            alert('Error al eliminar el registro.');
        }
    };

    return (
        <div className="empleado-list">
            <h2>Listado de Empleados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Número de Documento</th>
                        <th>Tipo de Documento</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Fecha de Ingreso</th>
                        <th>Salario base</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map(empleado => (
                        <tr key={empleado.nro_documento}>
                            <td>{empleado.nro_documento}</td>
                            <td>{empleado.tipo_documento}</td>
                            <td>{empleado.nombre1} {empleado.nombre2 ? empleado.nombre2 : ''}</td>
                            <td>{empleado.apellido1} {empleado.apellido2 ? empleado.apellido2 : ''}</td>
                            <td>{empleado.correo}</td>
                            <td>{empleado.rol}</td>
                            <td>{new Date(empleado.fecha_ingreso).toLocaleDateString()}</td>
                            <td>$ {empleado.salario_base}</td>
                            <td>
                                <button onClick={() => handleEliminarRegistro(empleado.nro_documento)}>Eliminar</button>
                                <Link to={`/empleadoput/${empleado.nro_documento}`}>Editar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/empleadoform">Registra un empleado</Link>
        </div>
    );
};

export default EmpleadoList;
