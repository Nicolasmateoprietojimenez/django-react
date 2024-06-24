import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './empleadoform.css';

const FormularioEmpleado = () => {
  const [formEmpleado, setFormEmpleado] = useState({
    tipo_documento: '',
    fecha_expedicion: '',
    nro_documento: '',
    password: '',
    correo: '',
    estado_cuenta: false,
    ciudad: '',
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    numero_celular: '',
    fecha_nacimiento: '',
    salario_base: null,
    fecha_ingreso: '',
    rol: 'GESTOR',
    tipo_empleado: '',
    auxilio_transporte: true,
    direccion: '',
    estado_civil: '',
    nivel_riesgo: '',
  });

  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormEmpleado(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/empleados/empleadosrest/', formEmpleado, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Empleado creado exitosamente:', response.data);
      setFormularioEnviado(true);
      setFormEmpleado({
        tipo_documento: '',
        fecha_expedicion: '',
        nro_documento: '',
        password: '',
        correo: '',
        estado_cuenta: false,
        ciudad: '',
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        numero_celular: '',
        fecha_nacimiento: '',
        salario_base: null,
        fecha_ingreso: '',
        rol: 'GESTOR',
        tipo_empleado: '',
        auxilio_transporte: true,
        direccion: '',
        estado_civil: '',
        nivel_riesgo: '',
      });
    } catch (error) {
      console.error('Error al crear empleado:', error);
    }
  };

  return (
    <div>
      {formularioEnviado ? (
        <p>¡Empleado creado exitosamente!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Tipo de Documento:
              <select name="tipo_documento" value={formEmpleado.tipo_documento} onChange={handleChange}>
                <option value="">Seleccione...</option>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PSP">Pasaporte</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Fecha de Expedición:
              <input type="date" name="fecha_expedicion" value={formEmpleado.fecha_expedicion} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Número de Documento:
              <input type="text" name="nro_documento" value={formEmpleado.nro_documento} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Contraseña:
              <input type="password" name="password" value={formEmpleado.password} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Correo Electrónico:
              <input type="email" name="correo" value={formEmpleado.correo} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Estado de Cuenta:
              <input type="checkbox" name="estado_cuenta" checked={formEmpleado.estado_cuenta} onChange={handleChange} />
            </label>
          </div>
          <div>

          </div>
          <div>
            <label>
              Primer Nombre:
              <input type="text" name="nombre1" value={formEmpleado.nombre1} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Segundo Nombre:
              <input type="text" name="nombre2" value={formEmpleado.nombre2} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Primer Apellido:
              <input type="text" name="apellido1" value={formEmpleado.apellido1} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Segundo Apellido:
              <input type="text" name="apellido2" value={formEmpleado.apellido2} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Número de Celular:
              <input type="text" name="numero_celular" value={formEmpleado.numero_celular} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Fecha de Nacimiento:
              <input type="date" name="fecha_nacimiento" value={formEmpleado.fecha_nacimiento} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Salario Base:
              <input type="number" name="salario_base" value={formEmpleado.salario_base} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Fecha de Ingreso:
              <input type="date" name="fecha_ingreso" value={formEmpleado.fecha_ingreso} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Rol:
              <select name="rol" value={formEmpleado.rol} onChange={handleChange}>
                <option value="GESTOR">Gestor</option>
                <option value="OPERADOR">Operador</option>
                <option value="LECTOR">Lector</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Tipo de Empleado:
              <select name="tipo_empleado" value={formEmpleado.tipo_empleado} onChange={handleChange}>
                <option value="">Seleccione...</option>
                <option value="INDEPENDIENTE">Independiente</option>
                <option value="DEPENDIENTE">Dependiente</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Auxilio de Transporte:
              <input type="checkbox" name="auxilio_transporte" checked={formEmpleado.auxilio_transporte} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Dirección:
              <input type="text" name="direccion" value={formEmpleado.direccion} onChange={handleChange} />
            </label>
          </div>
          <div>
          </div>
          <div>
            <label>
              Nivel de Riesgo:
              <select name="nivel_riesgo" value={formEmpleado.nivel_riesgo} onChange={handleChange}>
                <option value="">Seleccione...</option>
                <option value="0.522%">Riesgo I: 0.522%</option>
                <option value="1.044%">Riesgo II: 1.044%</option>
                <option value="2.436%">Riesgo III: 2.436%</option>
                <option value="4.350%">Riesgo IV: 4.350%</option>
                <option value="6.960%">Riesgo V: 6.960%</option>
              </select>
            </label>
          </div>
          <button type="submit">Crear Empleado</button>
        </form>
      )}
      <Link to="/empleadolist">Registra otro empleado</Link>
    </div>
  );
};

export default FormularioEmpleado;
