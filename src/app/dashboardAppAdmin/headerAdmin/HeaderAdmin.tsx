import React from 'react';

interface HeaderAdminProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>; // Cambiar a Dispatch
}

const HeaderAdmin: React.FC<HeaderAdminProps> = ({ setSidebarOpen }) => {
  return (
    <header className="bg-gray-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl">Panel de Administración</h1>
      <button 
        className="text-white lg:hidden" 
        onClick={() => setSidebarOpen(prev => !prev)} // Alternar la visibilidad del sidebar
      >
        Menú
      </button>
    </header>
  );
};

export default HeaderAdmin;

