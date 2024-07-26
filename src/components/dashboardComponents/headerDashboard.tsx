import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>Inicio</li>
          <li>Estadísticas</li>
          <li>Descuentos</li>
          <li>Usuarios</li>
          <li>Configuración</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
