import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './empleadoput.css';
const FormularioEmpleado = () => {
  const { nro_documento } = useParams();
  const [formData, setFormData] = useState({
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
  const [error, setError] = useState('');
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/empleados/empleadosrest/${nro_documento}/`);
        setFormData(res.data);
      } catch (err) {
        setError(err.response.data);
      }
    };
    cargarUsuario();
  }, [nro_documento]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.put(`http://127.0.0.1:8000/nomina/empleadorest/${nro_documento}/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormularioEnviado(true);
    } catch (err) {
      setError(err.response.data);
      console.error('Error:', err.response.data);
    }
  };

  return (
    <div>
      {formularioEnviado ? (
        <div>
          <p>¡Empleado actualizado exitosamente!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Tipo de Documento:
              <select name="tipo_documento" value={formData.tipo_documento} onChange={handleChange}>
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
              <input type="date" name="fecha_expedicion" value={formData.fecha_expedicion} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Número de Documento:
              <input type="text" name="nro_documento" value={formData.nro_documento} onChange={handleChange} disabled />
            </label>
          </div>
          <div>
            <label>
              Contraseña:
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Correo Electrónico:
              <input type="email" name="correo" value={formData.correo} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Estado de Cuenta:
              <input type="checkbox" name="estado_cuenta" checked={formData.estado_cuenta} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Ciudad:
              <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Primer Nombre:
              <input type="text" name="nombre1" value={formData.nombre1} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Segundo Nombre:
              <input type="text" name="nombre2" value={formData.nombre2} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Primer Apellido:
              <input type="text" name="apellido1" value={formData.apellido1} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Segundo Apellido:
              <input type="text" name="apellido2" value={formData.apellido2} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Número de Celular:
              <input type="text" name="numero_celular" value={formData.numero_celular} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Fecha de Nacimiento:
              <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Salario Base:
              <input type="number" name="salario_base" value={formData.salario_base} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Fecha de Ingreso:
              <input type="date" name="fecha_ingreso" value={formData.fecha_ingreso} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Rol:
              <select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="GESTOR">Gestor</option>
                <option value="OPERADOR">Operador</option>
                <option value="LECTOR">Lector</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Tipo de Empleado:
              <select name="tipo_empleado" value={formData.tipo_empleado} onChange={handleChange}>
                <option value="">Seleccione...</option>
                <option value="INDEPENDIENTE">Independiente</option>
                <option value="DEPENDIENTE">Dependiente</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Auxilio de Transporte:
              <input type="checkbox" name="auxilio_transporte" checked={formData.auxilio_transporte} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Dirección:
              <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Estado Civil:
              <input type="text" name="estado_civil" value={formData.estado_civil} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Nivel de Riesgo:
              <select name="nivel_riesgo" value={formData.nivel_riesgo} onChange={handleChange}>
                <option value="">Seleccione...</option>
                <option value="0.522%">Riesgo I: 0.522%</option>
                <option value="1.044%">Riesgo II: 1.044%</option>
                <option value="2.436%">Riesgo III: 2.436%</option>
                <option value="4.350%">Riesgo IV: 4.350%</option>
                <option value="6.960%">Riesgo V: 6.960%</option>
              </select>
            </label>
          </div>
          <button type="submit">Actualizar Empleado</button>
        </form>
      )}
      <Link to="/empleadoform">Registra un empleado</Link>
    </div>
  );
};

export default FormularioEmpleado;
