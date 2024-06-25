import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

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
                <Link to="/RegisHoras" className="slideIn" id="Empleados">Registrar Horas</Link>
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

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const ListarHoras = () => {
//   const [horas, setHoras] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchHoras = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/devengos/HorasRest/');
//         const data = await response.json();
//         setHoras(data);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchHoras();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:8000/devengos/HorasRest/${id}/`, {
//         method: 'DELETE',
//       });

//       if (response.status === 204) {
//         setHoras(horas.filter(hora => hora.id !== id));
//         setMessage('Hora eliminada exitosamente');
//       } else {
//         setMessage('Ocurrió un error al eliminar la hora');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('Ocurrió un error al eliminar la hora');
//     }
//   };

//   return (
//     <>
//       <h1>Listado de Horas Extra</h1>
//       {message && <p>{message}</p>}
//       <ul>
//         {horas.map(hora => (
//           <li key={hora.id}>
//             {`Documento: ${hora.nro_documento}, Fecha y Hora: ${hora.fecha_hora}, Tipo de Hora: ${hora.tipo_Hora}, Horas Trabajadas: ${hora.horas_trabajadas}, Valor: ${hora.valor}`}
//             <button onClick={() => handleDelete(hora.id)}>Eliminar</button>
//           </li>
//         ))}
//       </ul>
//       <Link to="/Registrar_Horas">Registrar Nueva Hora</Link>
//     </>
//   );
// };

// export default ListarHoras;

// import React, { useEffect, useState } from 'react';
// import { useParams, Link, useHistory } from 'react-router-dom';

// const ActualizarHoras = () => {
//   const { id } = useParams();
//   const history = useHistory();
//   const [documento, setDocumento] = useState('');
//   const [fechaHora, setFechaHora] = useState('');
//   const [horasSemanales, setHorasSemanales] = useState('');
//   const [tipoHora, setTipoHora] = useState('');
//   const [horasTrabajadas, setHorasTrabajadas] = useState('');
//   const [valor, setValor] = useState('');
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchHora = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/devengos/HorasRest/${id}/`);
//         const data = await response.json();
//         setDocumento(data.nro_documento);
//         setFechaHora(data.fecha_hora);
//         setHorasSemanales(data.horas_Semanales);
//         setTipoHora(data.tipo_Hora);
//         setHorasTrabajadas(data.horas_trabajadas);
//         setValor(data.valor);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     fetchHora();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('nro_documento', documento);
//       formData.append('fecha_hora', fechaHora);
//       formData.append('horas_Semanales', horasSemanales);
//       formData.append('tipo_Hora', tipoHora);
//       formData.append('horas_trabajadas', horasTrabajadas);
//       formData.append('valor', valor);

//       const response = await fetch(`http://localhost:8000/devengos/HorasRest/${id}/`, {
//         method: 'PUT',
//         body: formData,
//       });

//       if (response.status === 200) {
//         setMessage('Hora extra actualizada exitosamente');
//         history.push('/ListarHoras');
//       } else {
//         setMessage('Ocurrió un error al actualizar la hora');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <>
//       <h1>Actualizar Hora Extra</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={documento}
//           placeholder="Número de documento"
//           onChange={(e) => setDocumento(e.target.value)}
//         />
//         <input
//           type="datetime-local"
//           value={fechaHora}
//           onChange={(e) => setFechaHora(e.target.value)}
//         />
//         <select value={horasSemanales} onChange={(e) => setHorasSemanales(e.target.value)}>
//           <option value="">Selecciona horas semanales</option>
//           <option value="42">42 Horas</option>
//           <option value="43">43 Horas</option>
//           <option value="44">44 Horas</option>
//           <option value="45">45 Horas</option>
//           <option value="46">46 Horas</option>
//           <option value="47">47 Horas</option>
//         </select>
//         <input
//           type="text"
//           value={tipoHora}
//           placeholder="Tipo de hora"
//           onChange={(e) => setTipoHora(e.target.value)}
//         />
//         <input
//           type="number"
//           value={horasTrabajadas}
//           placeholder="Horas trabajadas"
//           onChange={(e) => setHorasTrabajadas(e.target.value)}
//         />
//         <input
//           type="number"
//           value={valor}
//           placeholder="Valor"
//           onChange={(e) => setValor(e.target.value)}
//         />
        
//         <button type="submit">Actualizar</button>
//         <div className="message">{message ? <p>{message}</p> : null}</div>
//       </form>
//       <Link to="/ListarHoras">Volver</Link>
//     </>
//   );
// };

// export default ActualizarHoras;

