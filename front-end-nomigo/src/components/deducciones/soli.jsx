import React, { useState, useEffect } from 'react';

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
        fetch('http://127.0.0.1:8000/api/primas/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Hubo un error al obtener las primas');
                }
                return response.json();
            })
            .then(data => {
                setPrimas(data);
                setLoading(false);
                setError(null);
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

        fetch(`http://127.0.0.1:8000/api/primas/${empleado.id}/calcular_prima/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dias_trabajados: diasTrabajados
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al calcular la prima');
                }
                return response.json();
            })
            .then(data => {
                const prima = data.prima_calculada;
                setPrimaCalculada(prima.toFixed(2));  // Redondea a dos decimales
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
