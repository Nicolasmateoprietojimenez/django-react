// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Soli from './componentes/soli';
import SeguridadSocial from './componentes/seguridadSocial';
import BuscarEmpleado from './componentes/buscarEmpleado';
import EmpleadoDetalle from './componentes/empleadoDetalle';

function App() {
  const [empleado, setEmpleado] = React.useState(null);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Buscar Empleado</Link>
            </li>
            <li>
              <Link to="/soli">Primas</Link>
            </li>
            <li>
              <Link to="/seguridad-social">Seguridad Social</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<BuscarEmpleado onEmployeeFound={setEmpleado} />} />
          <Route path="/soli" element={<Soli />} />
          <Route path="/seguridad-social" element={<SeguridadSocial />} />
          <Route path="/empleado-detalle" element={empleado && <EmpleadoDetalle numeroDocumento={empleado.nro_documento} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
