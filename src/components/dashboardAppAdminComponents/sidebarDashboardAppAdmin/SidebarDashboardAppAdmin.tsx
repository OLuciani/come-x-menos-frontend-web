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

const SidebarDashboardAppAdmin: React.FC<{ setSection: (section: string) => void, section: string }> = ({
  setSection, section
}) => {
  const { userName, isLoggedIn } = useContext(Context);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="">
      <div
        className={`w-full flex ${
          !isSidebarOpen ? "justify-between" : "justify-end"
        } items-center pl-4 bg-white fixed border-b-[3px]`}
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
      className={`bg-[#FFCF91] text-[#2C2C2C] font-bold w-full lg:w-80 lg:h-screen 
      ${isSidebarOpen ? "block" : "hidden lg:block"} h-auto lg:sticky mb-3 lg:mb-0 lg:top-0 
      flex flex-col overflow-y-auto`}
    >
        <h1 className="text-2xl font-bold text-[#2C2C2C] text-center px-2 pt-4">
          {userName}
        </h1>

        <nav className="flex-grow p-4">
          <h2 className="text-lg text-center font-bold mt-6 mb-4">ADMINISTRACION DE LA APP:</h2>
          <div className="button-group flex flex-col gap-2">
            {" "}
            
            <button
              onClick={() => {
                setSection("pendingUsers");
                setIsSidebarOpen(false);
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white ${section === "pendingUsers" ? "border-[2px] border-[#2C2C2C]" : "text-[#2C2C2C]"}`}
            >
              Usuarios/negocios pendientes
            </button>
            
            <button
              onClick={() => {
                setSection("activeUsers");
                setIsSidebarOpen(false);
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white ${section === "activeUsers" ? "border-[2px] border-[#2C2C2C]" : "text-[#2C2C2C]"}`}
            >
              Usuarios/Negocios activos
            </button>

            <button
              onClick={() => {
                setSection("roleManagement");
                setIsSidebarOpen(false);
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white ${section === "roleManagement" ? "border-[2px] border-[#2C2C2C]" : "text-[#2C2C2C]"}`}
            >
              Gestión de roles
            </button>

            <button
              onClick={() => {
                setSection("activityLogs");
                //handleNotificationClick();
                setIsSidebarOpen(false);
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white relative ${section === "activityLogs" ? "border-[2px] border-[#2C2C2C]" : "text-[#2C2C2C]"}`}
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
                setSection("notifications");
                //handleNotificationClick();
                setIsSidebarOpen(false);
              }}
              className={`block w-full text-left p-2 rounded transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-white relative ${section === "notifications" ? "border-[2px] border-[#2C2C2C]" : "text-[#2C2C2C]"}`}
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
        </nav>
      </div>
    </div>
  );
};

export default SidebarDashboardAppAdmin;