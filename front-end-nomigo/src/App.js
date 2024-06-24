import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmpleadoForm from './components/empleadoform/empleadoform';
import EmpleadoList from './components/empleadolist/empleadolist';
import EmpleadoPut from './components/empleadoput/empleadoput';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<EmpleadoList />} />
          <Route path="/empleadoform" element={<EmpleadoForm />} />
          <Route path="/empleadolist" element={<EmpleadoList />} />
          <Route path="/empleadoput/:nro_documento" element={<EmpleadoPut/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;