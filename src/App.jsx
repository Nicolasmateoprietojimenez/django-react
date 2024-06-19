import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Soli from '../src/componentes/soli';
import SeguridadSocial from '../src/componentes/seguridadSocial';
import BuscarEmpleado from './componentes/buscarEmpleado';
import EmpleadoDetalle from './componentes/empleadoDetalle';

function App() {
  const [employee, setEmployee] = useState(null);

  const handleEmployeeFound = (emp) => {
    setEmployee(emp);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Aplicación de Deducciones</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Primas</Link>
              </li>
              <li>
                <Link to="/seguridad-social">Seguridad Social</Link>
              </li>
              <li>
                <Link to="/buscar-empleado">Buscar Empleado</Link>
              </li>
              <li>
                <a href="http://localhost:8000/swagger/" target="_blank" rel="noopener noreferrer">
                  Documentación API
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Soli />} />
          <Route path="/seguridad-social" element={<SeguridadSocial />} />
          <Route path="/buscar-empleado" element={<BuscarEmpleado onEmployeeFound={handleEmployeeFound} />} />
        </Routes>

        {employee && <EmpleadoDetalle empleado={employee} />}
      </div>
    </Router>
  );
}

export default App;
