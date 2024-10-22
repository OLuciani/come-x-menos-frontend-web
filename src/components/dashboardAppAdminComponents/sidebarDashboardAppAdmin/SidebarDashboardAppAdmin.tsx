"use client";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "@/context/Context";
import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineTag } from "react-icons/ai";
import { FiFileText } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { getUserNotifications } from "@/services/apiCall";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

const SidebarDashboardAppAdmin: React.FC<{ setSection: (section: string) => void }> = ({
  setSection,
}) => {
  const { userName, isLoggedIn } = useContext(Context);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /* const fetchUnreadNotifications = async () => {
    try {
      const notificationsData = await getUserNotifications();
      const unreadNotifications = notificationsData.filter(
        (notification: any) => !notification.read
      );
      setUnreadCount(unreadNotifications.length);
    } catch (error) {
      console.error("Error al obtener las notificaciones no leídas:", error);
    }
  };

  const handleNotificationClick = async () => {
    setTimeout(() => {
      fetchUnreadNotifications();
    }, 1000);
    setSection("notificaciones");
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchUnreadNotifications();
  }, [isLoggedIn, setSection]); */

  return (
    <div className="">
      <div
        className={`w-full flex ${
          !isSidebarOpen ? "justify-between" : "justify-end"
        } items-center pl-4`}
      >
        {!isSidebarOpen && (
          <span className="lg:hidden text-2xl font-semibold">
            {userName}
          </span>
        )}
        <button
          className="lg:hidden py-4 pr-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <AiOutlineClose size={25} />
          ) : (
            <AiOutlineMenu size={25} />
          )}
        </button>
      </div>

      {/* <div
        className={`mb-3 lg:mb-0 lg:block ${isSidebarOpen ? "block" : "hidden"}
        bg-[#FFCF91] text-[#FD7B03] font-bold w-full lg:w-80 h-auto lg:min-h-screen flex flex-col`}
      > */}
      <div
      className={`bg-[#FFCF91] text-[#FD7B03] font-bold w-full lg:w-80 lg:h-screen 
      ${isSidebarOpen ? "block" : "hidden lg:block"} h-auto lg:sticky mb-3 lg:mb-0 lg:top-0 
      flex flex-col overflow-y-auto`}
    >
        <h1 className="text-2xl font-bold text-orange-600 text-center px-2 pt-4">
          {userName}
        </h1>
        <nav className="flex-grow p-4">
          {/* Título para acciones en la cuenta */}
          <h2 className="text-lg text-center font-bold mt-6">ADMINISTRACION DE LA APP:</h2>
          <div className="button-group">
            {" "}
            {/* Usar una clase común para ambas secciones */}
            <button
              onClick={() => {
                setSection("pendingUsers");
                setIsSidebarOpen(false);
              }}
              className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
            >
              Usuarios/negocios pendientes
            </button>
            
            <button
              onClick={() => {
                setSection("usuariosActivos");
                setIsSidebarOpen(false);
              }}
              className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
            >
              Usuarios/Negocios activos
            </button>

            <button
              onClick={() => {
                setSection("rolesPermisos");
                setIsSidebarOpen(false);
              }}
              className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
            >
              Gestión de roles
            </button>

            <button
              onClick={() => {
                setSection("historial");
                //handleNotificationClick();
                setIsSidebarOpen(false);
              }}
              className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white relative"
            >
              Registros de actividad
              {/* {unreadCount > 0 && (
                <span className="ml-5 lg:absolute lg:top-[30%] lg:right-3 bg-red-600 text-white text-xs rounded-full px-2">
                  {unreadCount}
                </span>
              )} */}
            </button>

            <button
              onClick={() => {
                setSection("notificaciones");
                //handleNotificationClick();
                setIsSidebarOpen(false);
              }}
              className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white relative"
            >
              {/* <AiOutlineBell className="inline mr-2" /> */}
              Notificaciones
              {/* {unreadCount > 0 && (
                <span className="ml-5 lg:absolute lg:top-[30%] lg:right-3 bg-red-600 text-white text-xs rounded-full px-2">
                  {unreadCount}
                </span>
              )} */}
            </button>
          </div>

         
          {/* <h2 className="text-lg text-center font-bold mt-6">
            ACCIONES EN MI CUENTA:
          </h2>

          
          <div className="button-group">
            <Link href="/createDiscount">
              <button className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white">
                Crear y publicar un descuento
              </button>
            </Link>

            <Link href="/myDiscounts">
              <button className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white">
                Ver y gestionar tus descuentos
              </button>
            </Link>

            <Link href="/editAccount">
              <button className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white">
                Editar datos de tu cuenta
              </button>
            </Link>
          </div> */}
        </nav>
      </div>
    </div>
  );
};

export default SidebarDashboardAppAdmin;