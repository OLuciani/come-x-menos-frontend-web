/* "use client";
import React, { useEffect, useContext, useState } from 'react';
import Cookies from "js-cookie";
import { Context } from "@/context/Context";
import { userPendingNotifications, markUserPendingNotificationAsRead } from "@/services/apiCall"; // Asegúrate de importar la función
import axios from 'axios'; 

const Notifications = () => {
    const {
        userToken,
        setUserToken,
        selectedOption,
        setSelectedOption,
        isLoggedIn,
        setUserRole,
        setUserName,
    } = useContext(Context);

    const [notifications, setNotifications] = useState<any[]>([]); // Para almacenar las notificaciones
    const [error, setError] = useState<string | null>(null); // Para almacenar errores

    useEffect(() => {
        const storedUserToken = Cookies.get("userToken") || "";
        console.log("Token de usuario almacenado:", storedUserToken);
        setUserToken(storedUserToken);

        const cookieUserRole = Cookies.get("userRole") || "";
        console.log("Rol de usuario de la cookie:", cookieUserRole);
        setUserRole(cookieUserRole);

        const cookieUserName = Cookies.get("userName") || "";
        console.log("Nombre de usuario de la cookie:", cookieUserName);
        setUserName(cookieUserName);

        setSelectedOption("Notificaciones");

        const fetchNotifications = async () => {
            try {
                const notificationsData = await userPendingNotifications();
                setNotifications(notificationsData);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data?.message || 'Error al obtener las notificaciones');
                } else if (error instanceof Error) {
                    setError(error.message); // Si es un error normal de JavaScript
                } else {
                    setError('Error desconocido al obtener las notificaciones'); // Para cualquier otro tipo de error
                }
            }
        };

        fetchNotifications();
    }, [setUserToken, setUserRole, setUserName, setSelectedOption]);

    // Tipar el parámetro notificationId como string
    const handleNotificationClick = async (notificationId: string) => {
        try {
            const data = await markUserPendingNotificationAsRead(notificationId);
            if (data.success) {
                // Actualiza el estado local de las notificaciones
                setNotifications((prev) => 
                    prev.map((notification) => 
                        notification._id === notificationId ? { ...notification, read: true } : notification
                    )
                );
            } else {
                setError(data.message); // Muestra el mensaje de error si ocurre
            }
        } catch (error) {
            console.error('Error al manejar la notificación:', error);
        }
    };
    

    return (
        <div className='w-full h-full'>
            <h1 className='mt-5 text-center text-2xl text-gray-600'>Notificaciones</h1>
            {error && <p className="text-red-500 text-center">{error}</p>} 
            <ul>
                {notifications.map((notification, index) => (
                    <li 
                        key={index} 
                        className="my-2 p-2 border-b cursor-pointer"
                        onClick={() => handleNotificationClick(notification._id)} // Manejar clic en la notificación
                    >
                        <p><strong>{notification.message}</strong></p>
                        <p>{new Date(notification.timestamp).toLocaleString()}</p>
                        <p>{notification.read ? 'Leído' : 'No leído'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications; */


"use client"
import React, { useContext, useEffect } from 'react';
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import UserNotifications from '@/components/userNotifications/UserNotifications';

const Notifications = () => {
    const { userToken, setUserToken, isLoggedIn, userRole, setUserRole, setUserName, setBusinessName, setBusinessType, setSelectedOption, setUserStatus } = useContext(Context);

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
      }, [ setBusinessName, setBusinessType, setUserName, setUserRole, setUserStatus]);
    
  return (
    <div> 
        <UserNotifications />
    </div>
  )
}

export default Notifications;