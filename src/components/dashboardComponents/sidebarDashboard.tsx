/* import React from 'react';

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

export default Sidebar; */



//Nueva configuración
"use client"
import React, { useContext } from "react";
import { Context } from "@/context/Context";

const SidebarDashboard: React.FC<{ setSection: (section: string) => void }> = ({
  setSection,
}) => {
  const { businessName } = useContext(Context);
  return (
    <div className="bg-[#FFCF91] text-[#FD7B03] font-bold w-full lg:w-64 h-auto lg:h-screen flex flex-col">
      <div className="flex items-center justify-center bg-orange-600">
        <h1 className="text-2xl font-bold text-[#FFCF91] text-center px-2 py-4">{businessName}</h1>
      </div>
      <nav className="flex-grow p-4 space-y-4 mt-5">
        <button
          onClick={() => setSection("resumen")}
          className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
        >
          Resumen
        </button>
        <button
          onClick={() => setSection("descuentos")}
          className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
        >
          Descuentos
        </button>
        <button
          onClick={() => setSection("ventas")}
          className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
        >
          Ventas
        </button>
      </nav>
    </div>
  );
};

export default SidebarDashboard;
