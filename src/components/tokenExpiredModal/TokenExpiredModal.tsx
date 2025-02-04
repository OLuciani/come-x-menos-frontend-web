"use client"
import React, { useEffect, useContext } from 'react';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { Context } from "@/context/Context";
import { FaLock } from "react-icons/fa6";
import Button from "@/components/button/Button";

interface SessionExpiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TokenExpiredModal: React.FC<SessionExpiredModalProps> = ({ isOpen, onClose }) => {
  const {
    setUserRole,
    setUserName,
    setUserToken,
    setIsLoggedIn,
    setBusinessName,
    setBusinessType,
    setUserStatus,
    setSelectedOption
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();

        Cookies.remove("userToken");
        Cookies.remove("token"); //Remueve la cookie con el token
        Cookies.remove("userRole");
        Cookies.remove("userName");
        Cookies.remove("businessName");
        Cookies.remove("businessType");
        Cookies.remove("usersStatus");

        setUserRole("");
        setUserToken("");
        setUserName("");
        setBusinessName("");
        setBusinessType(""); 
        setUserStatus("");
        setIsLoggedIn(false);
        setSelectedOption("Iniciar sesión");

        router.push('/login');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, router]);

  if (!isOpen) return null;

  const handleGoLogin = () => {
    Cookies.remove("userToken");
    Cookies.remove("token"); //Remueve la cookie con el token
    Cookies.remove("userRole");
    Cookies.remove("userName");
    Cookies.remove("businessName");
    Cookies.remove("businessType");
    Cookies.remove("usersStatus");

    setUserRole("");
    setUserToken("");
    setUserName("");
    setBusinessName("");
    setBusinessType(""); 
    setUserStatus("");
    setIsLoggedIn(false);
    setSelectedOption("Iniciar sesión");

    router.push('/login');
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg px-4 py-6 md:py-8 max-w-2xl w-full text-center">
        <div className='flex justify-center items-center pb-6'>
          <FaLock className='text-yellow-400 text-4xl md:text-5xl' />
        </div>
        <div className='bg-gray-600 py-2 mb-4 flex justify-center items-center rounded-lg'>
          <h2 className="text-xl md:text-2xl text-white font-semibold">Sesión Expirada</h2>
        </div>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">
         Tu sesión ha expirado o no se encontró un token válido. Serás redirigido a Inicio de sesión.`
        </p>

        <div className='flex justify-center md:justify-end mt-8'>
          <button 
            className='bg-blue-600 p-2 px-4 rounded-md text-white font-semibold 
                      shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300'
            onClick={() => handleGoLogin()}
          >
            Ir a Inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenExpiredModal;
