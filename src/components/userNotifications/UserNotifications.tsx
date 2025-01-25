"use client";
import React, { useEffect, useContext, useState } from "react";
import Cookies from "js-cookie";
import { Context } from "@/context/Context";
import {
  getUserNotifications,
  markUserNotificationsAsRead,
} from "@/api/userService";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const UserNotifications = () => {
  const {
    userToken,
    setUserToken,
    selectedOption,
    setSelectedOption,
    isLoggedIn,
    setUserRole,
    setUserName,
    setUserStatus,
  } = useContext(Context);

  const [notifications, setNotifications] = useState<any[]>([]); // Para almacenar las notificaciones
  const [error, setError] = useState<string | null>(null); // Para almacenar errores
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get("userRole") || "";
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    setUserName(cookieUserName);

    const cookieUserStatus = Cookies.get("userStatus") || "";
    setUserStatus(cookieUserStatus);

    setSelectedOption("Notificaciones");

    const fetchNotifications = async () => {
      try {
        const notificationsData = await getUserNotifications();
        setNotifications(notificationsData);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message ||
              "Error al obtener las notificaciones"
          );
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error desconocido al obtener las notificaciones");
        }
      }
    };

    // Llamada para obtener las notificaciones al montar el componente
    fetchNotifications();

    // Marcar todas las notificaciones como leídas al abrir el componente
    const markAllAsRead = async () => {
      try {
        const data = await markUserNotificationsAsRead(); // API que marca todas como leídas
        if (data.success) {
          // Actualiza el estado de las notificaciones para reflejar que están leídas
          setNotifications((prev) =>
            prev.map((notification) => ({ ...notification, read: true }))
          );
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error("Error al marcar las notificaciones como leídas:", error);
      } finally {
        setLoading(false);
      }
    };

    // Llamar a la función para marcar como leídas al montar el componente
    markAllAsRead();
  }, [setUserToken, setUserRole, setUserName, setSelectedOption]);

  return (
    <>
      <div className="bg-[#FFCF91] rounded-t-lg">
        <h2 className="text-xl lg:text-2xl font-bold text-[#2C2C2C] text-center px-2 py-4 mb-6">
            Notificaciones
        </h2>
      </div>
      {loading ? (
        <div className="w-full flex justify-center items-center mt-[8%]">
          <CircularProgress color="secondary" size={24} className="mr-2" />
          <span className="text-gray-600">Cargando datos...</span>
        </div>
      ) : (
        <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 h-full">
          {/* <div className="bg-[#FFCF91] rounded-t-lg">
            <h2 className="text-xl lg:text-2xl font-bold text-[#2C2C2C] text-center px-2 py-4 mb-6">
              Notificaciones
            </h2>
          </div> */}
          <ul>
            {notifications.map((notification, index) => (
              <li key={index} className="my-2 p-2 border-b-2">
                <p>
                  <strong>{notification.message}</strong>
                </p>
                <p>{new Date(notification.timestamp).toLocaleString()}</p>
                <p>{notification.read ? "Leído" : "No leído"}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default UserNotifications;
