import React, { useState } from 'react';

const Registrar_Horas = () => {
  const [documento, setDocumento] = useState('');
  const [fechaHora, setFechaHora] = useState('');
  const [horasSemanales, setHorasSemanales] = useState('');
  const [tipoHora, setTipoHora] = useState('');
  const [horasTrabajadas, setHorasTrabajadas] = useState('');
  const [valor, setValor] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nro_documento', documento);
      formData.append('fecha_hora', fechaHora);
      formData.append('horas_Semanales', horasSemanales);
      formData.append('tipo_Hora', tipoHora);
      formData.append('horas_trabajadas', horasTrabajadas);
      formData.append('valor', valor);

      const response = await fetch('http://localhost:8000/devengos/HorasRest/', {
        method: 'POST',
        body: formData,
      });

      const resJson = await response.json();
      if (response.status === 201) {
        setDocumento('');
        setFechaHora('');
        setHorasSemanales('');
        setTipoHora('');
        setHorasTrabajadas('');
        setValor('');
        setMessage('Hora extra creada exitosamente');
      } else {
        setMessage('Ocurrió un error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h1>Formulario de Horas Extra</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={documento}
          placeholder="Número de documento"
          onChange={(e) => setDocumento(e.target.value)}
        />
        <input
          type="datetime-local"
          value={fechaHora}
          onChange={(e) => setFechaHora(e.target.value)}
        />
        <select value={horasSemanales} onChange={(e) => setHorasSemanales(e.target.value)}>
          <option value="">Selecciona horas semanales</option>
          <option value="42">42 Horas</option>
          <option value="43">43 Horas</option>
          <option value="44">44 Horas</option>
          <option value="45">45 Horas</option>
          <option value="46">46 Horas</option>
          <option value="47">47 Horas</option>
        </select>
        <input
          type="text"
          value={tipoHora}
          placeholder="Tipo de hora"
          onChange={(e) => setTipoHora(e.target.value)}
        />
        <input
          type="number"
          value={horasTrabajadas}
          placeholder="Horas trabajadas"
          onChange={(e) => setHorasTrabajadas(e.target.value)}
        />
        <input
          type="number"
          value={valor}
          placeholder="Valor"
          onChange={(e) => setValor(e.target.value)}
        />
        <button type="submit">Crear</button>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </>
  );
};

export default Registrar_Horas;
