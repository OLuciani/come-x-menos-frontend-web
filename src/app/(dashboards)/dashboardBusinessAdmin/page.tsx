"use client";
import React, { useState, useContext, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { discountsList } from "@/api/discountService";
import { DiscountsList } from "@/types/discountTypes";
import SidebarBusinessAdminDashboard from "@/components/dashboardBusinessAdminComponents/sidebarBusinessAdminDashboard/SidebarBusinessAdminDashboard";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import { isAfter, format } from "date-fns";
import dynamic from "next/dynamic";

// Importaciones dinámicas (lazy loading) de componentes para optimizar la carga inicial.
const Overview = dynamic(
  () =>
    import("@/components/dashboardBusinessAdminComponents/overview/Overview")
);
const ActiveDiscountsOverview = dynamic(
  () =>
    import(
      "@/components/dashboardBusinessAdminComponents/activeDiscountsOverview/ActiveDiscountsOverview"
    )
);
const EffectiveSales = dynamic(
  () =>
    import(
      "@/components/dashboardBusinessAdminComponents/effectiveSales/EffectiveSales"
    )
);
const UserNotifications = dynamic(
  () => import("@/components/userNotifications/UserNotifications")
);
const AsociatedBusinessUsers = dynamic(
  () =>
    import(
      "@/components/dashboardBusinessAdminComponents/allUsersAsociatesToOneBusiness/AsociatedBusinessUsers"
    )
);
const ActiveDiscountsGallery = dynamic(
  () =>
    import(
      "@/components/dashboardBusinessAdminComponents/myActiveDiscounts/activeDiscountsGallery/ActiveDiscountsGallery"
    )
);
const DiscountCreate = dynamic(
  () =>
    import(
      "@/components/dashboardBusinessAdminComponents/discountCreate/DiscountCreate"
    )
);
const EditAccount = dynamic(
  () =>
    import(
      "@/components/dashboardBusinessAdminComponents/editAccount/EditAccount"
    )
);
const InvitationBusinessEmployeeUser = dynamic(
  () =>
    import(
      "@/components/dashboardBusinessAdminComponents/invitationBusinessEmployeeUser/InvitationBusinessEmployeeUser"
    )
);
const InvitationExtraBusinessAdminUser = dynamic(
  () =>
    import(
      "@/components/dashboardBusinessAdminComponents/invitationExtraBusinessAdminUser/InvitationExtraBusinessAdminUser"
    )
);
// const TokenExpiredModal = dynamic(() => import("@/components/tokenExpiredModal/TokenExpiredModal"), { ssr: false });

// Interfaz para el tipo de respuesta de error que se espera de la API.
interface ErrorResponse {
  error: string;
}

// Componente principal del Dashboard para el administrador del negocio.
const DashboardBusinessAdmin: React.FC = () => {
  const {
    userToken,
    setUserToken,
    isLoggedIn,
    setUserRole,
    setUserName,
    setBusinessName,
    setBusinessType,
    setUserStatus,
    setSelectedOption,
  } = useContext(Context);
  const [section, setSection] = useState<string>("resumen");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>(
    []
  );
  const [totalDiscounts, setTotalDiscounts] = useState<number>(0);
  const [reduceheight, setReduceHeight] = useState<boolean>(true); // Esta variable la utilizo para reducir el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña (menor a lg).

  // useEffect para gestionar el token del usuario al momento del inicio de sesión.
  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
    }
  }, [isLoggedIn, setUserToken]);

  // useEffect que carga los datos del usuario y su negocio desde las cookies.
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
  }, [
    setSelectedOption,
    setBusinessName,
    setBusinessType,
    setUserName,
    setUserRole,
    setUserToken,
    setUserStatus,
  ]);

  // Función para renderizar la sección activa del dashboard según la opción seleccionada.
  const renderSection = () => {
    switch (section) {
      case "notificaciones":
        return <UserNotifications />;
      case "overview":
        return <Overview />;
      case "activeDiscountsOverview":
        return <ActiveDiscountsOverview />;
      case "sales":
        return <EffectiveSales />;
      case "asociatedBusinessUsers":
        return <AsociatedBusinessUsers />;
      case "discountCreate":
        return <DiscountCreate setSection={setSection} section={section} />;
      case "activeDiscountsGallery":
        return <ActiveDiscountsGallery />;
      case "editAccount":
        return <EditAccount setSection={setSection} section={section} />;
      case "invitationBusinessEmployee":
        return (
          <InvitationBusinessEmployeeUser
            setSection={setSection}
            setReduceHeight={setReduceHeight}
          />
        );
      case "invitationExtraBusinessAdmin":
        return <InvitationExtraBusinessAdminUser setSection={setSection} />;
      default:
        return <Overview />;
    }
  };

  // Función para obtener los descuentos desde la API.
  const fetchDiscounts = useCallback(async () => {
    try {
      if (userToken) {
        console.log("Valor de userToken en fetchDiscounts: ", userToken);
        const response = await discountsList();

        if (typeof response !== "string") {
          const now = new Date();
          const validDiscounts = response.filter(
            (discount) =>
              !discount.validityPeriod ||
              !isAfter(
                now,
                new Date(discount.startDateTime).setDate(
                  new Date(discount.startDateTime).getDate() +
                    discount.validityPeriod
                )
              )
          );
          setDiscountsArrayList(validDiscounts);
        } else {
          console.error("Error al obtener descuentos: ", response);
        }
      } else {
        console.error(
          "No se puede obtener descuentos, falta businessId o userToken"
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage =
          axiosError.response?.data.error ||
          "Error en la solicitud de actualización";
        console.error("Error al obtener descuentos: ", errorMessage);
      } else {
        console.error("Error desconocido al obtener descuentos: ", error);
      }
    }
  }, [userToken]); // Aquí añadimos userToken como dependencia

  // useEffect para ejecutar la función fetchDiscounts cuando cambia el token del usuario.
  useEffect(() => {
    if (userToken) {
      fetchDiscounts();
    }
  }, [userToken, fetchDiscounts]);

  // useEffect para actualizar el total de descuentos cada vez que cambia la lista de descuentos.
  useEffect(() => {
    if (discountsArrayList.length > 0) {
      setTotalDiscounts(discountsArrayList.length);
    } else {
      setTotalDiscounts(0); // En caso de que no haya descuentos, asegurarse de que totalDiscounts sea 0.
    }
  }, [discountsArrayList, setTotalDiscounts]);

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:min-h-screen">
        <div className="lg:flex">
          {/* Sidebar del del dashboard del administrador del negocio */}
          <SidebarBusinessAdminDashboard
            setSection={setSection}
            section={section}
            setReduceHeight={setReduceHeight}
          />
        </div>

        <main
          className={`flex-grow min-h-screen p-2 lg:p-6 bg-gray-100 ${
            reduceheight ? "mt-[57px]" : "mt-0"
          } lg:mt-0`}
        >
          {/* Renderiza la sección seleccionada */}
          {renderSection()}
        </main>
      </div>
    </>
  );
};

export default DashboardBusinessAdmin;
