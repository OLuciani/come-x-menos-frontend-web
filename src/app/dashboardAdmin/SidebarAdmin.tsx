// SidebarAdmin.tsx
/* "use client";
import React from "react";

const SidebarAdmin: React.FC<{ setSection: (section: string) => void }> = ({ setSection }) => {
  return (
    <div className="bg-[#FFCF91] text-[#FD7B03] font-bold w-full lg:w-64 h-auto lg:h-screen flex flex-col">
      <div className="flex items-center justify-center bg-orange-600">
        <h1 className="text-2xl font-bold text-[#FFCF91] text-center px-2 py-4">Administración</h1>
      </div>
      <nav className="flex-grow p-4 space-y-4 mt-5">
        <button
          onClick={() => setSection("usuariosPendientes")}
          className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
        >
          Usuarios Pendientes
        </button>
        <button
          onClick={() => setSection("rolesPermisos")}
          className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
        >
          Roles y Permisos
        </button>
        <button
          onClick={() => setSection("notificaciones")}
          className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
        >
          Notificaciones
        </button>
        <button
          onClick={() => setSection("historial")}
          className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
        >
          Historial de Actividad
        </button>
      </nav>
    </div>
  );
};

export default SidebarAdmin; */



/* import React from 'react';

interface SidebarAdminProps {
  isOpen: boolean; // Estado para controlar si el sidebar está abierto
  setSection: (section: string) => void; // Función para cambiar la sección
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ isOpen, setSection }) => {
  return (
    <div className={`bg-gray-800 text-white ${isOpen ? 'block' : 'hidden'} h-full lg:block w-64`}>
      <ul className="flex flex-col">
        <li className="px-4 py-2 cursor-pointer" onClick={() => setSection("usuariosPendientes")}>
          Usuarios Pendientes
        </li>
        <li className="px-4 py-2 cursor-pointer" onClick={() => setSection("rolesPermisos")}>
          Roles y Permisos
        </li>
        <li className="px-4 py-2 cursor-pointer" onClick={() => setSection("notificaciones")}>
          Notificaciones
        </li>
        <li className="px-4 py-2 cursor-pointer" onClick={() => setSection("historial")}>
          Historial de Actividad
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin; */



import React from "react";

interface SidebarAdminProps {
  isOpen: boolean;
  setSection: (section: string) => void;
  onOptionSelect: () => void; // Callback para ocultar el sidebar
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ isOpen, setSection, onOptionSelect }) => {
  const handleOptionClick = (section: string) => {
    setSection(section);
    onOptionSelect(); // Oculta el sidebar en pantallas pequeñas
  };

  return (
    <aside
      className={`${
        isOpen ? "block" : "hidden"
      } lg:block bg-gray-700 text-white w-1/2 sm:w-1/3 lg:w-64 space-y-6 py-7 px-2 absolute top-14 lg:relative lg:top-0 left-0 min-h-full transform lg:transform-none transition duration-200 ease-in-out`}
    >
      <ul>
        <li className="px-4 py-2">
          <button onClick={() => handleOptionClick("usuariosPendientes")} className="text-left">Usuarios pendientes</button>
        </li>
        <li className="px-4 py-2">
          <button onClick={() => handleOptionClick("rolesPermisos")} className="text-left">Gestión de roles</button>
        </li>
        <li className="px-4 py-2">
          <button onClick={() => handleOptionClick("historial")} className="text-left">Registros de actividad</button>
        </li>
        <li className="px-4 py-2">
          <button onClick={() => handleOptionClick("notificaciones")} className="text-left">Notificaciones</button>
        </li>
      </ul>
    </aside>
  );
};

export default SidebarAdmin;
