import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosconfig';

function Soli() {
    const [primas, setPrimas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [documentoEmpleado, setDocumentoEmpleado] = useState('');
    const [diasTrabajados, setDiasTrabajados] = useState('');
    const [primaCalculada, setPrimaCalculada] = useState(null);

    useEffect(() => {
        fetchPrimas();
    }, []);

    const fetchPrimas = () => {
        axiosInstance.get('primas/')
            .then(response => {
                setPrimas(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Hubo un error al obtener las primas:', error);
                setError('Hubo un error al obtener las primas');
                setLoading(false);
            });
    };

    const handleCalcularPrima = () => {
        if (!documentoEmpleado || !diasTrabajados) {
            alert('Por favor ingrese el documento del empleado y los días trabajados.');
            return;
        }

        const empleado = primas.find(prima => {
            if (typeof prima.empleado === 'object' && prima.empleado !== null) {
                return prima.empleado.nro_documento === documentoEmpleado;
            } else {
                return prima.empleado === documentoEmpleado;
            }
        });

        if (!empleado) {
            alert('Empleado no encontrado.');
            return;
        }

        axiosInstance.post(`primas/${empleado.id}/calcular_prima/`, {
            dias_trabajados: diasTrabajados
        })
        .then(response => {
            setPrimaCalculada(response.data.prima_calculada);
        })
        .catch(error => {
            console.error('Error al calcular la prima:', error);
            alert('Error al calcular la prima');
        });
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Primas para Documento: {documentoEmpleado}</h1>
            <h2>Calcular Prima para Empleado Específico</h2>
            <label htmlFor="documentoEmpleado">Documento del Empleado:</label>
            <input
                type="text"
                id="documentoEmpleado"
                value={documentoEmpleado}
                onChange={(e) => setDocumentoEmpleado(e.target.value)}
            />
            <br />
            <label htmlFor="diasTrabajados">Días trabajados:</label>
            <input
                type="number"
                id="diasTrabajados"
                value={diasTrabajados}
                onChange={(e) => setDiasTrabajados(e.target.value)}
            />
            <br />
            <button onClick={handleCalcularPrima}>Calcular Prima</button>
            {primaCalculada !== null && (
                <div>
                    <h3>Días trabajados:</h3>
                    <p>{diasTrabajados}</p>
                    <h3>Prima Calculada:</h3>
                    <p>{primaCalculada}</p>
                </div>
            )}
        </div>
    );
}

export default Soli;
