"use client"
import React, { useState, useEffect, useContext } from "react";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { fetchPendingUsersFromAPI, approveUser } from "@/api/userService";
import { fetchPendingBusinessFromAPI } from "@/api/businessService";
import { UserPending } from "@/types/userTypes";
import { PendingBusiness } from "@/types/businessTypes";
//import { fetchPendingUsersFromAPI, approveUser, UserPending, fetchPendingBusinessFromAPI, PendingBusiness } from "@/services/apiCall";
import PendingUserDetailsModal from "./PendingUserDetailModal";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";

const PendingUsers = () => {
  const {
    isLoggedIn,
    setUserToken,
    setSelectedOption,
    setUserRole,
    setUserName,
    setUserStatus
  } = useContext(Context); 

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserPending | null>(null); // Para mostrar detalles del usuario
  const [pendingUsers, setPendingUsers] = useState<UserPending[]>([]);
  const [totalPendingUsers, setTotalPendingUsers] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pendingBusiness, setPendingBusiness] = useState<PendingBusiness | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
      console.log("VALOR DE userToken EN pendingUsers: ", storedUserToken);
    }
  }, [isLoggedIn, setUserToken]);

  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get("userRole") || "";
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    setUserName(cookieUserName);

    const cookieUserStatus = Cookies.get("userStatus") || "";
    setUserStatus(cookieUserStatus);

    setSelectedOption("Mi cuenta");
  }, [setUserToken, setSelectedOption, setUserName, setUserRole, setUserStatus]);



  // Fetch de usuarios pendientes
  const fetchPendingUsers = async () => {
    const response = await fetchPendingUsersFromAPI();
    console.log("Respuesta del backend:", response); // Verifica la estructura del array de usuarios

    /* if (response === "Token inválido o expirado") {
      setIsModalOpen(true);
      return;
    } */

    setPendingUsers(response);
    console.log("Usuarios pendientes guardados en el estado:", response); // Verifica que los usuarios se hayan guardado correctamente

    setTotalPendingUsers(response.length);
  };


  // Fetch de negocio pendiente para complementar datos del usuario
  const fetchPendingBusiness = async (businessId: string | null) => {
    //const businessId = selectedUser ? selectedUser.businessId : null;
    const response = await fetchPendingBusinessFromAPI(businessId);
    console.log("Respuesta del negocio pendiente del backend en el componente PendingUsers.tsx:", response); // Verifica los datos de un negocio asociado al usuario pendiente.

    setPendingBusiness(response);
    console.log("Negocio pendiente guardado en el estado:", response); // Verifica que el negocio se haya guardado correctamente
  };

  // Aprobación de usuario
  const handleApprove = async (userId: string) => {
    console.log("Aprobando usuario con ID:", userId); // Verifica el ID que estás aprobando
    const response = await approveUser(userId);

    console.log("valor de response al aprobar un usuario: ", response)

    if (response.message === "Usuario aprobado exitosamente") {
      setPendingUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter(user => user._id !== userId);
        setTotalPendingUsers(updatedUsers.length);  // Actualizas el total aquí
        return updatedUsers;
      });
    
      // Se establezco un mensaje de éxito
      setSuccessMessage("Usuario aprobado exitosamente.");

      // Cierra el modal después de 5 segundos
      setTimeout(() => {
        setSuccessMessage(null); // Resetea el mensaje
        setSelectedUser(null); // Cierra el modal
      }, 5000); // Cierra el modal después de 5 segundos

      console.log(`Usuario con ID: ${userId} ha sido aprobado y eliminado de la lista.`);
    }
    
  };

  useEffect(() => {
    fetchPendingUsers();
    //fetchPendingBusiness(businessId);
  }, []);

  return (
    <div>
      {/* <TokenExpiredModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      
      {/* Modal para ver detalles del usuario */}
      {(selectedUser && pendingBusiness) && (
        <PendingUserDetailsModal
          user={selectedUser}
          business= {pendingBusiness}
          onClose={() => {
            setSelectedUser(null);
            setSuccessMessage(null); // Resetea el mensaje al cerrar el modal
          }} 
          onApprove={handleApprove}
          successMessage={successMessage}
        />
      )}


      <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 h-screen">
       <div className="bg-[#FFCF91] rounded-t-lg">
          <h2 className="w-full text-center text-xl lg:text-2xl font-bold text-[#2C2C2C] px-2 py-2 mb-6">
            Cuentas nuevas de negocios por activar ({totalPendingUsers})
          </h2>
        </div>
        
        {totalPendingUsers && totalPendingUsers > 0 ?
        <ul>
          {pendingUsers && pendingUsers.map((pendingUser) => (
            <li key={pendingUser._id} className="p-2 border-[3px] border-gray-400 hover:border-[#FFCF91] rounded-lg cursor-pointer mb-5" onClick={() => [setSelectedUser(pendingUser), fetchPendingBusiness(pendingUser.businessId)]}>
              <div className="ml-3">
                <strong className="text-xl">{pendingUser.name} {pendingUser.lastName}</strong> 
                <p><span className="font-semibold">Email:</span> {pendingUser.email}</p>
                <p><span className="font-semibold">Nombre del negocio:</span> {pendingUser.businessName}</p>
                {/* {pendingUser._id ? (
                  <p><span className="font-semibold">ID del usuario:</span> {pendingUser._id}</p> // Verifica que el ID del usuario esté disponible
                ) : (
                  <p>Error: Usuario sin ID</p> // Mensaje de error si falta el ID
                )} */}
              </div>
            </li>
          ))}
        </ul>
        : <p className="text-lg text-center font-semibold mt-16">No se encontraron usuarios pendientes</p>
}
      </div>
    </div>
  );
};

export default PendingUsers;



