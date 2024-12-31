"use client";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "@/context/Context";
import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineTag } from "react-icons/ai";
import { FiFileText } from "react-icons/fi";
import { FaChartLine } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { getUserNotifications } from "@/api/userService";
//import { getUserNotifications } from "@/services/apiCall";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
//import Link from "next/link";

interface SidebarBusinessAdminDashboardProps {
  setSection: (section: string) => void;
  section: string;
  setReduceHeight: (reduceHeight: boolean) => void; //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.
}

/* const SidebarDashboard: React.FC<{ setSection: (section: string) => void, section: string }> = ({
  setSection, section
}) => { */
const SidebarDashboard: React.FC<SidebarBusinessAdminDashboardProps> = ({
  setSection,
  section,
  setReduceHeight,
}) => {
  const { businessName, isLoggedIn, userRole } = useContext(Context);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [businessDirectorRole, setBusinessDirectorRole] = useState<
    string | undefined
  >("");

  const roleBusinessDirector = process.env.NEXT_PUBLIC_ROLE_BUSINESS_DIRECTOR;

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

  useEffect(() => {
    setBusinessDirectorRole(roleBusinessDirector);
  }, []);

  return (
    <div className="">
      <div
        className={`w-full flex justify-between items-center pl-4 fixed bg-white top-[57] border-b-2 lg:border-b-0 z-10`}
      >
        <span className="lg:hidden text-2xl font-semibold">{businessName}</span>
        <button
          className="lg:hidden py-4 pr-4"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
            const mainElement = document.querySelector("main");
            if (mainElement) {
              mainElement.scrollTo(0, 0);
            }
            if (isSidebarOpen) {
              setReduceHeight(true);
            } else {
              setReduceHeight(false);
            }
          }}
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
        className={`bg-[#FFCF91] text-[#2C2C2C] font-bold w-full lg:w-96 lg:h-screen 
      ${
        isSidebarOpen ? "block" : "hidden lg:block"
      } h-auto lg:sticky mb-3 lg:mb-0 lg:top-0 
      flex flex-col overflow-y-auto`}
      >
        <h1 className="text-2xl font-bold text-[#2C2C2C] text-center px-2 pt-4">
          {businessName}
        </h1>

        <nav className="flex-grow p-4">
          {/* Título para acciones en la cuenta */}
          <h2 className="text-lg text-center font-bold mt-6">ESTADISTICAS:</h2>

          <div className="button-group flex flex-col gap-1">
            {" "}
            {/* Usar una clase común para ambas secciones */}
            <button
              onClick={() => {
                setSection("overview");
                setIsSidebarOpen(false);
                setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.

                // Restablece el scroll del contenedor principal al inicio
                const mainElement = document.querySelector("main");
                if (mainElement) {
                  mainElement.scrollTo(0, 0);
                }
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white ${
                section === "overview"
                  ? "border-[2px] border-[#2C2C2C] hover:border-[#FD7B03]"
                  : "text-[#2C2C2C]"
              }`}
            >
              <FiFileText className="inline mr-2" />
              Resumen
            </button>


            <button
              onClick={() => {
                setSection("activeDiscountsOverview");
                setIsSidebarOpen(false);
                setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.

                // Aquí debakp establezco el scroll del contenedor principal al inicio
                const mainElement = document.querySelector("main");
                if (mainElement) {
                  mainElement.scrollTo(0, 0);
                }
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white ${
                section === "activeDiscountsOverview"
                  ? "border-[2px] border-[#2C2C2C] hover:border-[#FD7B03]"
                  : "text-[#2C2C2C]"
              }`}
            >
              <AiOutlineTag className="inline mr-2" />
              {`Descuentos activos (ver actividad)`} 
            </button>


            <button
              onClick={() => {
                setSection("sales");
                setIsSidebarOpen(false);
                setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.

                // Restablece el scroll del contenedor principal al inicio
                const mainElement = document.querySelector("main");
                if (mainElement) {
                  mainElement.scrollTo(0, 0);
                }
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white ${
                section === "sales"
                  ? "border-[2px] border-[#2C2C2C] hover:border-[#FD7B03]"
                  : "text-[#2C2C2C]"
              }`}
            >
              <FaChartLine className="inline mr-2" />
              {`Total de Ventas (descuentos utilizados)`}
            </button>


            <button
              onClick={() => {
                setSection("notificaciones");
                handleNotificationClick();
                setIsSidebarOpen(false);
                setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.

                // Restablece el scroll del contenedor principal al inicio
                const mainElement = document.querySelector("main");
                if (mainElement) {
                  mainElement.scrollTo(0, 0);
                }
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white relative ${
                section === "notificaciones"
                  ? "border-[2px] border-[#2C2C2C] hover:border-[#FD7B03]"
                  : "text-[#2C2C2C]"
              }`}
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
          <div className="button-group flex flex-col gap-1  scrollbar-hidden">
            <button
              onClick={() => {
                setSection("discountCreate");
                setIsSidebarOpen(false);
                setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.

                // Restablece el scroll del contenedor principal al inicio
                const mainElement = document.querySelector("main");
                if (mainElement) {
                  mainElement.scrollTo(0, 0);
                }
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white ${
                section === "discountCreate"
                  ? "border-[2px] border-[#2C2C2C] hover:border-[#FD7B03]"
                  : "text-[#2C2C2C]"
              }`}
            >
              Crear un descuento
            </button>

            <button
              onClick={() => {
                setSection("activeDiscountsGallery");
                setIsSidebarOpen(false);
                setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.

                // Restablece el scroll del contenedor principal al inicio
                const mainElement = document.querySelector("main");
                if (mainElement) {
                  mainElement.scrollTo(0, 0);
                }
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white ${
                section === "activeDiscountsGallery"
                  ? "border-[2px] border-[#2C2C2C] hover:border-[#FD7B03]"
                  : "text-[#2C2C2C]"
              }`}
            >
              Ver y gestionar mis descuentos activos
            </button>

            <button
              onClick={() => {
                setSection("editAccount");
                setIsSidebarOpen(false);
                setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.

                // Restablece el scroll del contenedor principal al inicio
                const mainElement = document.querySelector("main");
                if (mainElement) {
                  mainElement.scrollTo(0, 0);
                }
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white ${
                section === "editAccount"
                  ? "border-[2px] border-[#2C2C2C] hover:border-[#FD7B03]"
                  : "text-[#2C2C2C]"
              }`}
            >
              Editar datos de mi cuenta
            </button>

            {/* <Link href="/createDiscount">
              <button className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white"
              >
                Crear y publicar un descuento
              </button>
            </Link>

            <Link href="/myDiscounts">
              <button className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white">
                Ver y gestionar tus descuentos
              </button>
            </Link> */}

            {/* <Link href="/editAccount">
              <button className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white">
                Editar datos de tu cuenta
              </button>
            </Link> */}

            {businessDirectorRole && userRole === businessDirectorRole && (
              <>
                {/* <Link href="/editAccount">
                  <button className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white">
                    Editar datos de tu cuenta
                  </button>
                </Link> */}

                {/* <Link href="/invitationExtraBusinessAdminUser">
                  <button className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white">
                    Crear usuario administrador p/mi cuenta
                  </button>
                </Link> */}
                <button
                  onClick={() => {
                    setSection("invitationExtraBusinessAdmin");
                    setIsSidebarOpen(false);
                    setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.
                    
                    // Restablece el scroll del contenedor principal al inicio
                    const mainElement = document.querySelector("main");
                    if (mainElement) {
                      mainElement.scrollTo(0, 0);
                    }
                  }}
                  className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white ${
                    section === "invitationExtraBusinessAdmin"
                      ? "border-[2px] border-[#2C2C2C] hover:border-[#FD7B03]"
                      : "text-[#2C2C2C]"
                  }`}
                >
                  Crear usuario administrador p/mi cuenta
                </button>

                {/* <Link href="/invitationBusinessEmployeeUser">
                  <button className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white">
                    Crear usuario empleado p/mi cuenta
                  </button>
                </Link> */}

                  <button
                  onClick={() => {
                    setSection("invitationBusinessEmployee");
                    setIsSidebarOpen(false);
                    setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.
                    
                    // Restablece el scroll del contenedor principal al inicio
                    const mainElement = document.querySelector("main");
                    if (mainElement) {
                      mainElement.scrollTo(0, 0);
                    }
                  }}
                  className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white ${
                    section === "invitationBusinessEmployee"
                      ? "border-[2px] border-[#2C2C2C] hover:border-[#FD7B03]"
                      : "text-[#2C2C2C]"
                  }`}
                >
                  Crear usuario empleado p/mi cuenta
                </button>

                {/* <Link href="/asociatedBusinessUsers">
                  <button className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white">
                  Usuarios asociados a mi cuenta
                  </button>
                </Link> */}
                <button
                  onClick={() => {
                    setSection("asociatedBusinessUsers");
                    setIsSidebarOpen(false);
                    setReduceHeight(true); //reduce el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña.

                    // Restablece el scroll del contenedor principal al inicio
                    const mainElement = document.querySelector("main");
                    if (mainElement) {
                      mainElement.scrollTo(0, 0);
                    }
                  }}
                  className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white ${
                    section === "activeBusinessUsers"
                      ? "border-[2px] border-[#2C2C2C] hover:border-[#FD7B03]"
                      : "text-[#2C2C2C]"
                  }`}
                >
                  Usuarios asociados a mi cuenta
                </button>
              </>
            )}

            {/* <Link href="/invitationBusinessEmployeeUser">
              <button className="block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white">
              Crear usuario empleado p/mi cuenta
              </button>
            </Link> */}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SidebarDashboard;
