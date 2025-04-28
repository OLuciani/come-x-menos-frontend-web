"use client";
import React, { useState, useContext, useEffect, Suspense } from "react";
import axios, { AxiosError } from "axios";
import { DiscountsList } from "@/types/discountTypes";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import { isAfter, format } from "date-fns";
import SidebarDashboardAppAdmin from "@/components/dashboardAppAdminComponents/sidebarDashboardAppAdmin/SidebarDashboardAppAdmin";

/// Lazy load components (carga bajo demanda)
const PendingUsers = React.lazy(() => import('@/components/dashboardAppAdminComponents/pendingUsers/PendingUsers'));
const AllUsers = React.lazy(() => import('@/components/dashboardAppAdminComponents/allUsersComponents/AllUsers'));
const RoleManagement = React.lazy(() => import('@/components/dashboardAppAdminComponents/roleManagement/RoleManagement'));
const Notifications = React.lazy(() => import('@/components/dashboardAppAdminComponents/notifications/Notifications'));
const ActivityLogs = React.lazy(() => import('@/components/dashboardAppAdminComponents/activityLogs/ActivityLogs'));

// Definición de tipo de respuesta de error
interface ErrorResponse {
  error: string;
}

// Componente principal del dashboard de administración de la aplicación
const DashboardAplicationAdmin: React.FC = () => {
  const { userToken, setUserToken, isLoggedIn, setUserRole, setUserName, setBusinessName, setBusinessType, setSelectedOption, setUserStatus } = useContext(Context);
  const [section, setSection] = useState<string>("pendingUsers");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>([]);
  const [totalDiscounts, setTotalDiscounts] = useState<number>(0);
  const [reduceheight, setReduceHeight] = useState<boolean>(true); // Esta variable la utilizo para reducir el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña (menor a lg).

  // Efecto para manejar el token de usuario cuando está logueado
  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
    }
  }, [isLoggedIn, setUserToken]);

  // Efecto para cargar datos de usuario y negocio desde las cookies
  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get("userRole") || "";
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    setUserName(cookieUserName);

    const cookieBusinessName = Cookies.get("businessName") || "";
    setBusinessName(cookieBusinessName);

    const cookieBusinessType = Cookies.get("businessType") || "";
    setBusinessType(cookieBusinessType);

    const cookieUserStatus = Cookies.get("userStatus") || "";
    setUserStatus(cookieUserStatus);

    setSelectedOption("Mi cuenta");
  }, [setSelectedOption, setBusinessName, setBusinessType, setUserName, setUserRole, setUserToken, setUserStatus]);

  // Función para renderizar la sección correspondiente del dashboard
  const renderSection = () => {
    switch (section) {
      case "pendingUsers":
        return <PendingUsers />;
      case "allUsers":
        return <AllUsers />;
      case "roleManagement":
        return <RoleManagement />;
      case "notifications":
        return <Notifications />;
      case "activityLogs":
        return <ActivityLogs />;
      default:
        return <PendingUsers />;
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:min-h-screen">
        <div className="lg:flex">
          {/* Sidebar del dashboard de la administración de la aplicación */}
          <Suspense fallback={<div>Loading Sidebar...</div>}>
            <SidebarDashboardAppAdmin setSection={setSection} section={section} setReduceHeight={setReduceHeight} />
          </Suspense>
        </div>

        <main className={`flex-grow min-h-screen p-2 lg:p-6 bg-gray-100 ${reduceheight ? "mt-[57px]" : "mt-0"} lg:mt-0`}>
          {/* Contenido de la sección del dashboard seleccionada */}
          <Suspense fallback={<div>Loading Content...</div>}>
            {renderSection()}
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default DashboardAplicationAdmin;

