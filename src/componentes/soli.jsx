// src/componentes/soli.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosconfig'; // Ajusta la ruta según la ubicación real

function Soli() {
    const [primas, setPrimas] = useState([]);
    const [nuevaPrima, setNuevaPrima] = useState({ dias_trabajados: 0, empleado: 1 });

    useEffect(() => {
        fetchPrimas();
    }, []); // Llamada inicial para obtener las primas

    const fetchPrimas = () => {
        axiosInstance.get('primas/')
            .then(response => {
                setPrimas(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener las primas:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosInstance.post('primas/', nuevaPrima)
            .then(response => {
                setPrimas([...primas, response.data]);
                setNuevaPrima({ dias_trabajados: 0, empleado: 1 }); // Limpiar formulario después de éxito
            })
            .catch(error => {
                console.error('Hubo un error al crear la prima:', error);
            });
    };

    const handleChange = (event) => {
        setNuevaPrima({
            ...nuevaPrima,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div>
            <h1>Primas</h1>
            <ul>
                {primas.map(prima => (
                    <li key={prima.id}>
                        Empleado: {prima.empleado} - Días trabajados: {prima.dias_trabajados} - Prima calculada: {prima.prima_calculada}
                    </li>
                ))}
            </ul>

            <h2>Registrar nueva prima</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Días trabajados:
                    <input
                        type="number"
                        name="dias_trabajados"
                        value={nuevaPrima.dias_trabajados}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Empleado:
                    <input
                        type="number"
                        name="empleado"
                        value={nuevaPrima.empleado}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Registrar Prima</button>
            </form>
        </div>
    );
}

export default Soli;
