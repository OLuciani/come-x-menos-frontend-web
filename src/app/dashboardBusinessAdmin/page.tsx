"use client"
import React, { useState, useContext, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { discountsList, DiscountsList } from "@/services/apiCall";
import SidebarBusinessAdminDashboard from "@/components/dashboardBusinessAdminComponents/sidebarBusinessAdminDashboard/SidebarBusinessAdminDashboard";
//import HeaderDashboard from "@/components/dashboardComponents/headerDashboard";
import Overview from "@/components/dashboardBusinessAdminComponents/overview/Overview";
import DashboardDiscounts from "@/components/dashboardBusinessAdminComponents/activeDiscountsOverview/ActiveDiscountsOverview";
import EffectiveSales from "@/components/dashboardBusinessAdminComponents/effectiveSales/EffectiveSales";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { isAfter, format } from "date-fns";
import UserNotifications from "@/components/userNotifications/UserNotifications";
import AsociatedBusinessUsers from "@/components/dashboardBusinessAdminComponents/allUsersAsociatesToOneBusiness/AsociatedBusinessUsers";
import ActiveDiscountsGallery from "@/components/dashboardBusinessAdminComponents/myActiveDiscounts/activeDiscountsGallery/ActiveDiscountsGallery";
import DiscountCreate from "@/components/dashboardBusinessAdminComponents/discountCreate/DiscountCreate";
//import AsociatedBusinessUserDetail from "@/components/dashboardBusinessAdminComponents/allUsersAsociatesToOneBusiness/AsociatedBusinessUserDetail";
//import CreateQrScannerUser from "@/components/dashboardComponents/invitationQrScannerUser/InvitationQrScannerUser";

interface ErrorResponse {
  error: string;
}

const DashboardBusinessAdmin: React.FC = () => {
  const { userToken, setUserToken, isLoggedIn, setUserRole, setUserName, setBusinessName, setBusinessType, setUserStatus, setSelectedOption } = useContext(Context);
  const [section, setSection] = useState<string>("resumen");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>([]);
  const [totalDiscounts, setTotalDiscounts] = useState<number>(0);
  const [reduceheight, setReduceHeight] = useState<boolean>(true); // Esta variable la utilizo para reducir el el espacio entre el Sidebar y renderSection en el dashboard cuando la pantalla es pequeña (menor a lg).

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
    }
  }, [isLoggedIn, setUserToken]);

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

  

  const renderSection = () => {
    switch (section) {
      case "notificaciones":
        return <UserNotifications />
      case "resumen":
        return <Overview />;
      case "descuentos":
        return <DashboardDiscounts />;
      case "ventas":
        return <EffectiveSales />;
      case "asociatedBusinessUsers":
        return <AsociatedBusinessUsers />;
      case "discountCreate":
      return <DiscountCreate setSection={setSection} section={section}/>
      case "activeDiscountsGallery":
        return <ActiveDiscountsGallery />
      default:
        return <Overview />;
    }
  };


  const fetchDiscounts = async () => {
    try {
      if (userToken) {
        console.log("Valor de userToken en fetchDiscounts: ", userToken);
        const response = await discountsList();

        if (response === "Token inválido o expirado en discountList") {
          setIsModalOpen(true); 
        }
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
  };

  useEffect(() => {
    if (userToken) {
      fetchDiscounts();
    }
  }, [userToken]);

  useEffect(() => {
    if (discountsArrayList.length > 0) {
      setTotalDiscounts(discountsArrayList.length);
    } else {
      setTotalDiscounts(0); // En caso de que no haya descuentos, asegurarse de que totalDiscounts sea 0.
    }
  }, [discountsArrayList, setTotalDiscounts]);
  
return (
  <>
    <TokenExpiredModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />

    {/* <AsociatedBusinessUserDetail setSection={setSection} /> */}

    <div className="flex flex-col lg:flex-row lg:min-h-screen">
      {/* <div className="absolute right-0 w-[220px] lg:block lg:relative"> */}
      <div className="lg:flex">
        <SidebarBusinessAdminDashboard setSection={setSection} section={section} setReduceHeight={setReduceHeight} />
      </div>
        
      {/* <main className="flex-grow min-h-screen p-2 lg:p-6 bg-gray-100 mt-[57px] lg:mt-0"> */}
      <main className={`flex-grow min-h-screen p-2 lg:p-6 bg-gray-100 ${reduceheight ? "mt-[57px]" : "mt-0"} lg:mt-0`}>
        {renderSection()}
      </main>
    </div>
  </>
);
};

export default DashboardBusinessAdmin;