/* "use client"
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

        <button
          onClick={() => setSection("notificaciones")}
          className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
        >
          Notificaciones
        </button>
      </nav>
    </div>
  );
};

export default SidebarDashboard; */

//Funciona bien pero no muestra bien el numero de mensajes nuevos en el sidebar
/* "use client";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "@/context/Context";
import { AiOutlineBell } from "react-icons/ai"; // Importamos el icono de campana
import { getUserNotifications } from "@/services/apiCall"; // Importar la función para obtener notificaciones

const SidebarDashboard: React.FC<{ setSection: (section: string) => void }> = ({
  setSection,
}) => {
  const { businessName, isLoggedIn } = useContext(Context); // Añadimos isLoggedIn del contexto
  const [unreadCount, setUnreadCount] = useState(0); // Estado para almacenar la cantidad de no leídas

  // Este efecto obtiene las notificaciones solo si el usuario está logueado
  useEffect(() => {
    if (!isLoggedIn) return; // Si el usuario no está logueado, no hace nada

    const fetchNotifications = async () => {
      try {
        // Hacemos la solicitud a la API para obtener las notificaciones
        const notificationsData = await getUserNotifications();

        // Filtra las notificaciones no leídas
        const unreadNotifications = notificationsData.filter(
          (notification: any) => !notification.read
        );
        
        // Actualiza el estado con la cantidad de notificaciones no leídas
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error("Error al obtener las notificaciones:", error);
      }
    };

    // Llama a la función para obtener las notificaciones cuando el componente se monte
    fetchNotifications();
  }, [isLoggedIn]); // El efecto se activa solo si cambia isLoggedIn

  return (
    <div className="bg-[#FFCF91] text-[#FD7B03] font-bold w-full lg:w-64 h-auto lg:h-screen flex flex-col">
      <div className="flex items-center justify-center bg-orange-600">
        <h1 className="text-2xl font-bold text-[#FFCF91] text-center px-2 py-4">
          {businessName}
        </h1>
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

        
        <button
          onClick={() => setSection("notificaciones")}
          className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white relative"
        >
          <AiOutlineBell className="inline mr-2" /> 
          Notificaciones
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2">
              {unreadCount} 
            </span>
          )}
        </button>
      </nav>
    </div>
  );
};

export default SidebarDashboard;
 */

/* "use client";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "@/context/Context";
import { AiOutlineBell } from "react-icons/ai"; // Icono de campana
import { getUserNotifications } from "@/services/apiCall"; // Función para obtener las notificaciones

const SidebarDashboard: React.FC<{ setSection: (section: string) => void }> = ({
  setSection,
}) => {
  const { businessName, isLoggedIn } = useContext(Context);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnreadNotifications = async () => {
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

  // Manejar el clic en el botón de notificaciones
  const handleNotificationClick = async () => {
    try {
      setTimeout(() => {
        fetchUnreadNotifications(); // Llamar a la función para actualizar el contador
      }, 1000); // Retraso de 500 ms (ajusta según sea necesario)

      setSection("notificaciones"); // Cambiar la sección a "notificaciones"
    } catch (error) {
      console.error("Error al marcar las notificaciones como leídas:", error);
    }
  };

  // Este efecto se ejecuta cada vez que se cambia la sección a "notificaciones"
  useEffect(() => {
    if (!isLoggedIn) return;
    fetchUnreadNotifications(); // Obtener notificaciones no leídas cuando el componente Sidebar se monta
  }, [isLoggedIn, setSection]); // El efecto se dispara cuando cambia la sección o el estado de sesión

  return (
    <div className="bg-[#FFCF91] text-[#FD7B03] font-bold w-full lg:w-64 h-auto lg:h-screen flex flex-col">
      <h1 className="text-2xl font-bold text-orange-600 text-center px-2 pt-4">
        {businessName}
      </h1>

      <nav className="flex-grow p-4 space-y-4">
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

        <button
          onClick={() => {
            setSection("notificaciones");
            handleNotificationClick(); // Actualizar al abrir la sección de notificaciones
          }}
          className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white relative"
        >
          <AiOutlineBell className="inline mr-2" />
          Notificaciones
          {unreadCount > 0 && (
            <span className="absolute top-3 right-0 bg-red-600 text-white text-xs rounded-full px-2">
              {unreadCount}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
};

export default SidebarDashboard; */

/* "use client";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "@/context/Context";
import { AiOutlineBell } from "react-icons/ai"; // Icono de campana
import { AiOutlineTag } from "react-icons/ai"; // Icono de descuentos
import { FiFileText } from "react-icons/fi"; // Icono de resumen
import { FaChartLine } from "react-icons/fa"; // Icono de ventas
import { AiOutlinePlus } from "react-icons/ai"; // Icono de crear un descuento
import { getUserNotifications } from "@/services/apiCall"; // Función para obtener las notificaciones
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Para el menú hamburguesa
import Link from "next/link";

const SidebarDashboard: React.FC<{ setSection: (section: string) => void }> = ({ setSection }) => {
  const { businessName, isLoggedIn } = useContext(Context);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controlar la visibilidad del sidebar

  const fetchUnreadNotifications = async () => {
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
  }, [isLoggedIn, setSection]);

  return (
    <div>
      <div className="w-full flex justify-end">
        <button
          className="lg:hidden py-4 pr-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </button>
      </div>

      
      <div
        className={`mb-3 lg:mb-0 lg:block ${
          isSidebarOpen ? "block" : "hidden"
        } bg-[#FFCF91] text-[#FD7B03] font-bold w-full lg:w-80 h-auto lg:h-screen flex flex-col`}
      >
        <h1 className="text-2xl font-bold text-orange-600 text-center px-2 pt-4">
          {businessName}
        </h1>
        <nav className="flex-grow p-4 space-y-4">
          <h2 className="text-lg text-center font-bold mt-6">ESTADISTICAS:</h2>
          <button
            onClick={() => {
              setSection("resumen");
              setIsSidebarOpen(false); // Cerrar el sidebar al seleccionar una sección
            }}
            className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
          >
            <FiFileText className="inline mr-2" />

            Resumen
          </button>
          <button
            onClick={() => {
              setSection("descuentos");
              setIsSidebarOpen(false);
            }}
            className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
          >
            <AiOutlineTag className="inline mr-2" />

            Descuentos (Estad.)
          </button>
          <button
            onClick={() => {
              setSection("ventas");
              setIsSidebarOpen(false);
            }}
            className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
          >
            <FaChartLine className="inline mr-2" />

            Ventas
          </button>
          <button
            onClick={() => {
              setSection("notificaciones");
              handleNotificationClick();
              setIsSidebarOpen(false);
            }}
            className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white relative"
          >
            <AiOutlineBell className="inline mr-2" />
            Notificaciones
            {unreadCount > 0 && (
              <span className="ml-5 lg:absolute lg:top-[30%] lg:right-3 bg-red-600 text-white text-xs rounded-full px-2">
                {unreadCount}
              </span>
            )}
          </button>
          

          <h2 className="text-lg text-center font-bold mt-6">ACCIONES EN MI CUENTA:</h2>

          <Link href="/createDiscount">
            <div className="block w-full text-left ml-3 p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white relative">
              Crear y publicar un descuento
            </div>
          </Link>

          <Link href="/myDiscounts">
            <div className="block w-full text-left ml-3 p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white relative">
              Ver y gestionar tus descuentos
            </div>
          </Link>

          <Link href="/editAccount">
            <div className="block w-full text-left ml-3 p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white relative">
              Editar datos de tu cuenta
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SidebarDashboard; */

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

const SidebarDashboard: React.FC<{ setSection: (section: string) => void }> = ({
  setSection,
}) => {
  const { businessName, isLoggedIn } = useContext(Context);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchUnreadNotifications = async () => {
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
  }, [isLoggedIn, setSection]);

  return (
    <div className="">
      <div
        className={`w-full flex ${
          !isSidebarOpen ? "justify-between" : "justify-end"
        } items-center pl-4`}
      >
        {!isSidebarOpen && (
          <span className="lg:hidden text-2xl font-semibold">
            {businessName}
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
          {businessName}
        </h1>
        <nav className="flex-grow p-4">
          {/* Título para acciones en la cuenta */}
          <h2 className="text-lg text-center font-bold mt-6">ESTADISTICAS:</h2>
          <div className="button-group">
            {" "}
            {/* Usar una clase común para ambas secciones */}
            <button
              onClick={() => {
                setSection("resumen");
                setIsSidebarOpen(false);
              }}
              className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
            >
              <FiFileText className="inline mr-2" />
              Resumen
            </button>
            <button
              onClick={() => {
                setSection("descuentos");
                setIsSidebarOpen(false);
              }}
              className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
            >
              <AiOutlineTag className="inline mr-2" />
              Descuentos
            </button>
            <button
              onClick={() => {
                setSection("ventas");
                setIsSidebarOpen(false);
              }}
              className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
            >
              <FaChartLine className="inline mr-2" />
              Ventas
            </button>
            <button
              onClick={() => {
                setSection("notificaciones");
                handleNotificationClick();
                setIsSidebarOpen(false);
              }}
              className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white relative"
            >
              <AiOutlineBell className="inline mr-2" />
              Notificaciones
              {unreadCount > 0 && (
                <span className="ml-5 lg:absolute lg:top-[30%] lg:right-3 bg-red-600 text-white text-xs rounded-full px-2">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Título para acciones en la cuenta */}
          <h2 className="text-lg text-center font-bold mt-6">
            ACCIONES EN MI CUENTA:
          </h2>

          {/* Mismo grupo de botones */}
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
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SidebarDashboard;
