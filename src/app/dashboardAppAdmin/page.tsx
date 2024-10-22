"use client";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import SidebarAdmin from "@/app/dashboardAppAdmin/SidebarAdmin";
import HeaderAdmin from "@/app/dashboardAppAdmin/headerAdmin/HeaderAdmin";
import { checkAdminAppPermissions } from "@/services/apiCall";
import PendingUsers from "@/app/dashboardAppAdmin/pendingUsers/page";
import RoleManagement from "@/app/dashboardAppAdmin/roleManagement/RoleManagement";
import ActivityLogs from "@/app/dashboardAppAdmin/activityLogs/ActivityLogs";
import Notifications from "@/app/dashboardAppAdmin/notifications/Notifications";
import { useRouter } from "next/router";
import CircularProgress from '@mui/material/CircularProgress';
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import ActiveBusinessesAdminsUsers from "@/app/dashboardAppAdmin/activeBusinessesAdmins/page";

const DashboardAdmin: React.FC = () => {
  const {
    userToken,
    setUserToken,
    selectedOption,
    setSelectedOption,
    isLoggedIn,
    setUserRole,
    setUserName,
  } = useContext(Context);
  const [section, setSection] = useState<string>("usuariosPendientes");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [showDashboardAdminApp, setShowDashboardAdminApp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para manejar el modal TokenExpiredModal.tsx


  useEffect(() => {
    async function handlePermissions() {
      try {
        const result = await checkAdminAppPermissions();
        if (result === "Token inválido o expirado") {
          setIsModalOpen(true);
        }

        if (
          result?.message === "Show the Admin App button and the dashboardAdmin"
        ) {
          setShowDashboardAdminApp(true);
          Cookies.set("showDashboardAdminApp", "true");
          setSelectedOption("Admin App");
        } else {
          Cookies.set("showDashboardAdminApp", "false");
        }
      } catch (error) {
        console.error("Error en handlePermissions:", error);
      } finally {
        setIsLoading(false); // Marcar como completado el proceso de carga
      }
    }

    handlePermissions();

    const storedUserToken = Cookies.get("userToken") || "";
    console.log("Token de usuario almacenado:", storedUserToken);
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get("userRole") || "";
    console.log("Rol de usuario de la cookie:", cookieUserRole);
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    console.log("Nombre de usuario de la cookie:", cookieUserName);
    setUserName(cookieUserName);

    setSelectedOption("Admin App");
  }, [setUserToken, setUserRole, setUserName, setSelectedOption]);

  // Función para ocultar el sidebar si la pantalla es menor a 1024px
  const handleOptionSelect = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false); // Ocultar el sidebar
    }
  };

  const renderSection = () => {
    switch (section) {
      case "usuariosPendientes":
        return <PendingUsers />;
      case "usuariosActivos":
        return <ActiveBusinessesAdminsUsers />;
      case "rolesPermisos":
        return <RoleManagement />;
      case "notificaciones":
        return <Notifications />;
      case "historial":
        return <ActivityLogs />;
      default:
        return <PendingUsers />;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-50">
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {showDashboardAdminApp ? (
        <div className="flex flex-col min-h-screen">  {/* en esta linea tenia relative */}
          <HeaderAdmin setSidebarOpen={setSidebarOpen} />
          <div className="flex flex-1">
            <SidebarAdmin
              isOpen={sidebarOpen}
              setSection={setSection}
              onOptionSelect={handleOptionSelect} // Pasar la función para ocultar el sidebar
            />
            <main className="flex-grow bg-gray-100">{renderSection()}</main>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50">
          <div className="text-center p-6">
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              ⚠️ Acceso denegado
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              No tienes permisos de administrador.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#FFCF91] text-gray-800 font-semibold rounded hover:bg-[#FD7B03] hover:text-white transition"
            >
              Volver a intentar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardAdmin;
