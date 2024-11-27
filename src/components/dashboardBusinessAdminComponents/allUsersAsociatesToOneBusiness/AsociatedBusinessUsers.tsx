"use client";
import React, { useState, useEffect, useContext } from "react";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import {
  fetchAsociatedBusinessUsers,
  fetchPendingUsersFromAPI,
  approveUser,
  ActiveUser,
  ActiveBusinessAdminUser,
  fetchPendingBusinessFromAPI,
  PendingBusiness,
} from "@/services/apiCall";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import AsociatedOneBusinessUserDetail from "./AsociatedOneBusinessUserDetail";

const AsociatedBusinessUsers = () => {
  const {
    isLoggedIn,
    setUserToken,
    setSelectedOption,
    setUserRole,
    setUserName,
    setUserStatus,
    setAllUsers, 
    allUsers
  } = useContext(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<ActiveBusinessAdminUser | null>(null); 
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalActiveBusinessUsers, setTotalActiveBusinessUsers] =
    useState<number>(0);
  const [totalInactiveBusinessUsers, setTotalInactiveBusinessUsers] =
  useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
  }, [
    setUserToken,
    setSelectedOption,
    setUserName,
    setUserRole,
    setUserStatus,
  ]);

  // Fetch de usuarios activos asociados a la cuenta de un negocio
  useEffect(() => {
    const fetchBusinesUsers = async () => {
      const response = await fetchAsociatedBusinessUsers();
      console.log("Respuesta del backend:", response); // Verifica la estructura del array de usuarios
  
      if (response === "Token inválido o expirado") {
        setIsModalOpen(true);
        return;
      }
  
      //setBusinessUsers(response);

      if(response) {

        setAllUsers(response);
    
        setTotalUsers(response.length);
        console.log("Usuarios pendientes guardados en el estado:", response); // Verifica que los usuarios se hayan guardado correctamente
        const activeUsers: ActiveUser[] = response.filter((user: ActiveUser) => user.status === "active")
        setTotalActiveBusinessUsers(activeUsers.length);
    
        const inactiveUsers: ActiveUser[] = response.filter((user: ActiveUser) => user.status === "pending")
        setTotalInactiveBusinessUsers(inactiveUsers.length);
      }
    };

    fetchBusinesUsers();
  }, [])
  

  return (
    <div>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />


      {
      //Si se cumple esta condición se va amostrar el usuario seleccionado
      !selectedUser ?
      <div /* className="bg-white border-2 shadow-lg rounded-lg p-4 lg:py-4 h-screen flex flex-col items"*/className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 min-h-screen">
        <div className="bg-[#FFCF91] rounded-t-lg mb-3 pb-2">
          <h2 className="text-xl lg:text-2xl font-semibold text-[#2C2C2C] text-center py-2 px-2">
            Usuarios asociados a mi cuenta
          </h2>
          <div className="px-4 custom-w-450:px-8 md:px-48 lg:px-44 xl:px-56 flex justify-between">
            <p className="text-base lg:text-lg font-semibold text-[#2C2C2C]">Activos: {totalActiveBusinessUsers}</p>

            <p className="text-base lg:text-lg font-semibold text-[#2C2C2C]">Inactivos:  {totalInactiveBusinessUsers}</p>
          </div>
        </div>

        {totalUsers && totalUsers > 0 ? (
          <ul className="flex flex-col items-center">
            {allUsers.length > 0 &&allUsers.map((oneUser) => (
              <li
                key={oneUser._id}
                /* className="p-2 border-[3px] border-gray-400 hover:border-[#FFCF91] rounded-lg cursor-pointer mb-5" */
                className="w-full md:w-[560px] md:justify-center xl:w-[650px] p-1 border-[3px] border-gray-400 hover:border-[#FFCF91] rounded-lg cursor-pointer mb-5 break-words"
                onClick={() => setSelectedUser(oneUser)}
              >
                <div className="ml-3">
                <p>
                  <span className="font-semibold">Nombre completo:</span> {oneUser.name} {oneUser.lastName}
                </p>

                <p>
                  <span className="font-semibold">Email:</span> {oneUser.email}
                </p>

                <p>
                  <span className="font-semibold">Rol:</span>{" "}
                  {oneUser.role === "businessDirector"
                    ? "Director del negocio"
                    : oneUser.role === "businessManager"
                    ? "Administrador del negocio"
                    : oneUser.role === "businessEmployee"
                    ? "Empleado del negocio"
                    : oneUser.role === "mobileCustomer"
                    ? "Cliente de aplicación móvil"
                    : null}
                </p>

                <p>
                  <span className="font-semibold">
                    Estado de la cuenta de usuario:
                  </span>{" "}
                  {oneUser.status === "active"
                    ? "Activa"
                    : oneUser.status === "pending"
                    ? "Inactiva (cuenta suspendida temporalmente)"
                    : null}
                </p>
              </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-center mt-[20%] md:mt-[10%] font-bold ">No se encontraron usuarios</p>
        )}
      </div>
      : <AsociatedOneBusinessUserDetail user={selectedUser} onClose={() => 
        setSelectedUser(null)
        }  />
      }
    </div>
  );
};

export default AsociatedBusinessUsers;
