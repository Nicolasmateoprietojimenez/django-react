import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmpleadoForm from './components/empleadoform/empleadoform';
import EmpleadoList from './components/empleadolist/empleadolist';
import EmpleadoPut from './components/empleadoput/empleadoput';
import EmpleadoDetalle from './components/deducciones/empleadoDetalle';
import Soli from './components/deducciones/soli';
// import BuscarEmpleado from './components/deducciones/buscarEmpleado';
// import SeguridadSocial from './components/deducciones/seguridadSocial';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<EmpleadoList />} />
          <Route path="/empleadoform" element={<EmpleadoForm />} />
          <Route path="/empleadolist" element={<EmpleadoList />} />
          <Route path="/empleadoput/:nro_documento" element={<EmpleadoPut/>} />
          <Route path="/seguridad/:nro_documento" element={<EmpleadoDetalle/>} />
          <Route path="/solicitarprima" element={<Soli />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;