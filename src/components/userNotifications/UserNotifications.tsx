/* "use client";
import React, { useEffect, useContext, useState } from 'react';
import Cookies from "js-cookie";
import { Context } from "@/context/Context";
import { getUserNotifications, markUserNotificationsAsRead } from "@/services/apiCall"; // Asegúrate de importar la función
import axios from 'axios'; 

const UserNotifications = () => {
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
                const notificationsData = await getUserNotifications();
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
            const data = await markUserNotificationsAsRead(notificationId);
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
        <div className='w-full h-full flex flex-col items-center justify-center'>
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

export default UserNotifications; */



"use client";
import React, { useEffect, useContext, useState } from 'react';
import Cookies from "js-cookie";
import { Context } from "@/context/Context";
import { getUserNotifications, markUserNotificationsAsRead } from "@/services/apiCall"; // Asegúrate de importar las funciones correctas
import axios from 'axios'; 

const UserNotifications = () => {
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
        setUserToken(storedUserToken);

        const cookieUserRole = Cookies.get("userRole") || "";
        setUserRole(cookieUserRole);

        const cookieUserName = Cookies.get("userName") || "";
        setUserName(cookieUserName);

        setSelectedOption("Notificaciones");

        const fetchNotifications = async () => {
            try {
                const notificationsData = await getUserNotifications();
                setNotifications(notificationsData);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(error.response?.data?.message || 'Error al obtener las notificaciones');
                } else if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Error desconocido al obtener las notificaciones');
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
            }
        };

        // Llamar a la función para marcar como leídas al montar el componente
        markAllAsRead();
    }, [setUserToken, setUserRole, setUserName, setSelectedOption]);

    return (
        <div className="bg-white border-2 shadow-lg rounded-lg p-4 lg:py-4 h-full">
            <div className="bg-[#FFCF91] rounded-t-lg">
                <h2 className="text-xl lg:text-2xl font-semibold text-[#2C2C2C] text-center lg:text-l pl-6 py-4 mb-6">Notificaciones</h2>
            </div>
            {/* <h1 className='mt-5 text-center text-2xl text-gray-600'>Notificaciones</h1> */}
            {/* {error && <p className="text-red-500 text-center">{error}</p>} */} {/* Mostrar error si hay */}            
            <ul>
                {notifications.map((notification, index) => (
                    <li 
                        key={index} 
                        className="my-2 p-2 border-b-2"
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

export default UserNotifications;
