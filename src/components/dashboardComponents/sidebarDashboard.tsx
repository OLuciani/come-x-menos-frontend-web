import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden md:block md:w-1/4 lg:w-1/5 bg-gray-200 p-4">
      <nav>
        <ul>
          <li className="mb-4"><a href="#">Inicio</a></li>
          <li className="mb-4"><a href="#">Estadísticas</a></li>
          <li className="mb-4"><a href="#">Descuentos</a></li>
          <li className="mb-4"><a href="#">Usuarios</a></li>
          <li className="mb-4"><a href="#">Configuración</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
