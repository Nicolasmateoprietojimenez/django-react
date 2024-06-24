// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Buscar Empleado</Link></li>
        <li><Link to="/primas">Primas</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
