import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css'; // Asegúrate de tener tu archivo de estilos CSS importado correctamente

const Listar = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                const res = await axios.get('http://localhost:8000/devengos/HorasRest/');
                setUsers(res.data);
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
            }
        };

        cargarUsuarios();
    }, []);

    return (
        <div>
            <nav>
                <a href="#" className="slideIn" id="Empleados">Listar Horas</a>
                <a href="#" className="slideIn" id="Horas_Extras">Registrar Horas Extra</a>
            </nav>

            <div className="cont1">
                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Fecha y hora</th>
                            <th>Horas semanales</th>
                            <th>Tipo de hora</th>
                            <th>Horas trabajadas</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(usr => (
                            <tr key={usr.id}>
                                <td>{usr.nro_documento}</td>
                                <td>{usr.fecha_hora}</td>
                                <td>{usr.horas_Semanales}</td>
                                <td>{usr.tipo_Hora}</td>
                                <td>{usr.horas_trabajadas}</td>
                                <td>{usr.valor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Listar;
