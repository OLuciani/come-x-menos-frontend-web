/* "use client"
import React, { useState, useContext, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { discountsList, DiscountsList } from "@/services/apiCall";
import SidebarDashboard from "@/components/dashboardAppAdminComponents/sidebarDashboardAppAdmin/SidebarDashboardAppAdmin";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { isAfter, format } from "date-fns";
import UserNotifications from "@/components/userNotifications/UserNotifications";
import PendingUsers from "@/components/dashboardAppAdminComponents/pendingUsers/page";
import ActiveBusinessesAdminsUsers from '@/app/dashboardAppAdmin/activeBusinessesAdmins/page';
import RoleManagement from "@/components/dashboardAppAdminComponents/roleManagement/RoleManagement";
import Notifications from "@/components/dashboardAppAdminComponents/notifications/Notifications";
import ActivityLogs from "@/components/dashboardAppAdminComponents/activityLogs/ActivityLogs";

interface ErrorResponse {
  error: string;
}

const DashboardAplicationAdmin: React.FC = () => {
  const { userToken, setUserToken, isLoggedIn, setUserRole, setUserName, setBusinessName, setBusinessType, setSelectedOption } = useContext(Context);
  const [section, setSection] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>([]);
  const [totalDiscounts, setTotalDiscounts] = useState<number>(0);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
    }
  }, [isLoggedIn]);

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

    setSelectedOption("Mi cuenta");
  }, [setSelectedOption, setBusinessName, setBusinessType, setUserName, setUserRole]);

  

  const renderSection = () => {
    switch (section) {
      case "pendingUsers":
        return <PendingUsers />
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

    <div className="flex flex-col lg:flex-row lg:min-h-screen">
      <div className="lg:flex">
        <SidebarDashboard setSection={setSection} />
      </div>
        
      
      <main className="flex-grow lg:p-8 bg-gray-100 lg:mt-0">
        {renderSection()}
      </main>
    </div>
  </>
);
};

export default DashboardAplicationAdmin; */



"use client"
import React, { useState, useContext, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { discountsList, DiscountsList } from "@/services/apiCall";
import SidebarDashboard from "@/components/dashboardAppAdminComponents/sidebarDashboardAppAdmin/SidebarDashboardAppAdmin";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { isAfter, format } from "date-fns";
import UserNotifications from "@/components/userNotifications/UserNotifications";
import PendingUsers from "@/components/dashboardAppAdminComponents/pendingUsers/page";
import AllUsers from '@/components/dashboardAppAdminComponents/allUsersComponents/AllUsers';
import RoleManagement from "@/components/dashboardAppAdminComponents/roleManagement/RoleManagement";
import Notifications from "@/components/dashboardAppAdminComponents/notifications/Notifications";
import ActivityLogs from "@/components/dashboardAppAdminComponents/activityLogs/ActivityLogs";
import SidebarDashboardAppAdmin from "@/components/dashboardAppAdminComponents/sidebarDashboardAppAdmin/SidebarDashboardAppAdmin";

interface ErrorResponse {
  error: string;
}

const DashboardAplicationAdmin: React.FC = () => {
  const { userToken, setUserToken, isLoggedIn, setUserRole, setUserName, setBusinessName, setBusinessType, setSelectedOption, setUserStatus } = useContext(Context);
  const [section, setSection] = useState<string>("pendingUsers");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>([]);
  const [totalDiscounts, setTotalDiscounts] = useState<number>(0);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
    }
  }, [isLoggedIn]);

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
  }, [setSelectedOption, setBusinessName, setBusinessType, setUserName, setUserRole]);

  const renderSection = () => {
    switch (section) {
      case "pendingUsers":
        return <PendingUsers />
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
  }

  return (
    <>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="flex flex-col lg:flex-row lg:min-h-screen">
        <div className="lg:flex">
          <SidebarDashboardAppAdmin setSection={setSection} section={section} />
        </div>
          
        <main className="flex-grow min-h-screen p-4 lg:p-8 bg-gray-100 mt-[57px] lg:mt-0">
          {renderSection()}
        </main>
      </div>
    </>
  );
};

export default DashboardAplicationAdmin;
