/* "use client"
import React, { useState, useContext, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { DiscountsList } from "@/types/discountTypes";
//import { discountsList, DiscountsList } from "@/services/apiCall";
//import SidebarDashboard from "@/components/dashboardAppAdminComponents/sidebarDashboardAppAdmin/SidebarDashboardAppAdmin";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { isAfter, format } from "date-fns";
//import UserNotifications from "@/components/userNotifications/UserNotifications";
import PendingUsers from "@/components/dashboardAppAdminComponents/pendingUsers/PendingUsers";
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
      <div className="flex flex-col lg:flex-row lg:min-h-screen">
        <div className="lg:flex">
          <SidebarDashboardAppAdmin setSection={setSection} section={section} setReduceHeight={setReduceHeight} />
        </div>
          
        <main className={`flex-grow min-h-screen p-2 lg:p-6 bg-gray-100 ${reduceheight ? "mt-[57px]" : "mt-0"} lg:mt-0`}>
          {renderSection()}
        </main>
      </div>
    </>
  );
};

export default DashboardAplicationAdmin; */



"use client";
import React, { useState, useContext, useEffect, Suspense } from "react";
import axios, { AxiosError } from "axios";
import { DiscountsList } from "@/types/discountTypes";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import { isAfter, format } from "date-fns";
import SidebarDashboardAppAdmin from "@/components/dashboardAppAdminComponents/sidebarDashboardAppAdmin/SidebarDashboardAppAdmin";

// Lazy load components
const PendingUsers = React.lazy(() => import('@/components/dashboardAppAdminComponents/pendingUsers/PendingUsers'));
const AllUsers = React.lazy(() => import('@/components/dashboardAppAdminComponents/allUsersComponents/AllUsers'));
const RoleManagement = React.lazy(() => import('@/components/dashboardAppAdminComponents/roleManagement/RoleManagement'));
const Notifications = React.lazy(() => import('@/components/dashboardAppAdminComponents/notifications/Notifications'));
const ActivityLogs = React.lazy(() => import('@/components/dashboardAppAdminComponents/activityLogs/ActivityLogs'));


interface ErrorResponse {
  error: string;
}

const DashboardAplicationAdmin: React.FC = () => {
  const { userToken, setUserToken, isLoggedIn, setUserRole, setUserName, setBusinessName, setBusinessType, setSelectedOption, setUserStatus } = useContext(Context);
  const [section, setSection] = useState<string>("pendingUsers");
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
          <Suspense fallback={<div>Loading Sidebar...</div>}>
            <SidebarDashboardAppAdmin setSection={setSection} section={section} setReduceHeight={setReduceHeight} />
          </Suspense>
        </div>

        <main className={`flex-grow min-h-screen p-2 lg:p-6 bg-gray-100 ${reduceheight ? "mt-[57px]" : "mt-0"} lg:mt-0`}>
          <Suspense fallback={<div>Loading Content...</div>}>
            {renderSection()}
          </Suspense>
        </main>
      </div>
    </>
  );
};

export default DashboardAplicationAdmin;

