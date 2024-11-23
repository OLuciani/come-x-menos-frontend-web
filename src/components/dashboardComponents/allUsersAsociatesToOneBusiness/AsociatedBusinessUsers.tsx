"use client";
import React, { useState, useEffect, useContext } from "react";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import {
  fetchAsociatedBusinessUsers,
  fetchPendingUsersFromAPI,
  approveUser,
  ActiveUser,
  fetchPendingBusinessFromAPI,
  PendingBusiness,
} from "@/services/apiCall";
//import PendingUserDetailsModal from "./SelectedAsociatedBusinessUserModal";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
//import SelectedAsociatedBusinessUserModal from "./SelectedAsociatedBusinessUserModal";
import AsociatedBusinessUserDetail from "./AsociatedBusinessUserDetail";

const AsociatedBusinessUsers = () => {
  const {
    isLoggedIn,
    setUserToken,
    setSelectedOption,
    setUserRole,
    setUserName,
    setUserStatus,
  } = useContext(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<ActiveUser | null>(null); // Para mostrar detalles del usuario
  const [businessUsers, setBusinessUsers] = useState<ActiveUser[]>(
    []
  );
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalActiveBusinessUsers, setTotalActiveBusinessUsers] =
    useState<number>(0);
  const [totalInactiveBusinessUsers, setTotalInactiveBusinessUsers] =
  useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  //const [pendingBusiness, setActiveBusiness] = useState<PendingBusiness | null>(null);

  /* useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    console.log("Token de usuario almacenado:", storedUserToken);
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get('userRole') || '';
    console.log("Rol de usuario de la cookie:", cookieUserRole);
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    console.log("Nombre de usuario de la cookie:", cookieUserName);
    setUserName(cookieUserName);

    setSelectedOption("AdminApp");
  }, [setUserToken, setUserRole, setUserName, setSelectedOption]); */

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
  
      setBusinessUsers(response);
  
      setTotalUsers(response.length);
      console.log("Usuarios pendientes guardados en el estado:", response); // Verifica que los usuarios se hayan guardado correctamente
      const activeUsers: ActiveUser[] = response.filter((user: ActiveUser) => user.status === "active")
      setTotalActiveBusinessUsers(activeUsers.length);
  
      const inactiveUsers: ActiveUser[] = response.filter((user: ActiveUser) => user.status === "pending")
      setTotalInactiveBusinessUsers(inactiveUsers.length);
    };

    fetchBusinesUsers();
  }, [])
  

  /* useEffect(() => {
    fetchBusinesUsers();
  }, []); */

  return (
    <div>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />


      {
      //Si se cumple esta condición se va amostrar el usuario seleccionado
      !selectedUser ?
      <div className="bg-white border-2 shadow-lg rounded-lg p-4 lg:py-4 h-screen">
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
          <ul>
            {businessUsers.map((businessUser) => (
              <li
                key={businessUser._id}
                className="p-2 border-[3px] border-gray-400 hover:border-[#FFCF91] rounded-lg cursor-pointer mb-5"
                onClick={() => setSelectedUser(businessUser)}
              >
                <div className="ml-3">
                  <strong className="text-xl">
                    {businessUser.name} {businessUser.lastName}
                  </strong>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {businessUser.email}
                  </p>
                  <p>
                    <span className="font-semibold">Estado de la cuenta de usuario:</span>{" "}
                    {businessUser.status === "active" ? "Activa" : businessUser.status === "pending" ? "Inactiva (cuenta suspendida temporalmente)" : null}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-center mt-[20%] md:mt-[10%] font-bold ">No se encontraron usuarios</p>
        )}
      </div>
      : <AsociatedBusinessUserDetail user={selectedUser} onClose={() => 
        setSelectedUser(null)
        }  />
      }
    </div>
  );
};

export default AsociatedBusinessUsers;
