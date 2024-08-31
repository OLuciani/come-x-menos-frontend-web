/* import React from 'react';

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

export default Header; */


//Nueva configuración
"use client"
import React, { useContext } from 'react';
import Link from 'next/link';
import { Context } from '@/context/Context';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";


const Header: React.FC = () => {
  const { userName, businessName, setUserToken, setUserRole, setUserName, setBusinessName, setBusinessType, setSelectedOption, setIsLoggedIn } = useContext(Context);

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token", { path: '/' }); // Eliminar la cookie 'token' con el path que se estableció al crearla en el controller login del backend.

    Cookies.remove("userToken");
    Cookies.remove("userRole");
    Cookies.remove("userName");
    Cookies.remove("businessName");
    Cookies.remove("businessType");

    setUserRole("");
    setUserToken("");
    setUserName("");
    setBusinessName("");
    setBusinessType("");
    
    setIsLoggedIn(false);

    setTimeout(() => {
      router.push("/login");
      setSelectedOption("Iniciar sesión");
    }, 1000); //Si no le doy 1 segundo con el setTimeout no funciona bien .
  };

  return (
    <header className="bg-orange-600 text-white p-4 flex justify-between items-center">
      {/* <div className="flex items-center space-x-4">
        <Link href="/">
          <p className="text-xl font-bold">Mi Aplicación</p>
        </Link>
        {businessName && (
          <span className="text-sm font-medium">Negocio: {businessName}</span>
        )}
      </div> */}
      <div className="w-full flex justify-between items-center space-x-4">
        <div>
          {userName && (
            <span className="text-sm font-medium">Hola, {userName}</span>
          )}
        </div>
        <div className="flex gap-4">
          <Link href="/myAccount">
            <p className="bg-blue-500 text-white py-2 px-4 rounded">Mi Cuenta</p>
          </Link>
          <button onClick={handleLogout} className="bg-red-700 text-white py-2 px-4 rounded">
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
