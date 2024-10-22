/* "use client";
import React from 'react';

const ActiveBusinessesAdmins: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Usuarios/Negocios activos</h2>
      <p>Aquí puedo administrar las cuentas de usuarios y negocios activos</p>
    </div>
  );
};

export default ActiveBusinessesAdmins; */

/* "use client"
import React, { useState, useEffect, useContext } from "react";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { fetchActiveBusinessesAdminsUsersFromAPI, ActiveBusinessAdminUser, fetchActiveBusinessFromAPI ,ActiveBusiness } from "@/services/apiCall";
//import UserDetailsModal from "./UserDetailModals";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import ActiveBusinessAdminUserDetailsModal from "./ActiveBusinessAdminUserDetailsModal";

const ActiveBusinessesAdmins = () => {
  const {
    setUserToken,
    setSelectedOption,
    setUserRole,
    setUserName,
  } = useContext(Context); 

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<ActiveBusinessAdminUser | null>(null); // Para mostrar detalles del usuario
  const [activeUsers, setActiveUsers] = useState<ActiveBusinessAdminUser[]>([]);
  const [totalActiveUsers, setTotalActiveUsers] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeBusiness, setActiveBusiness] = useState<ActiveBusiness | null>(null);



  useEffect(() => {
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
  }, [setUserToken, setUserRole, setUserName, setSelectedOption]);

  // Fetch de usuarios activos
  const fetchActiveBusinessesAdminsUsers = async () => {
    const response = await fetchActiveBusinessesAdminsUsersFromAPI();
    console.log("Respuesta del backend response activeUsers:", response); // Verifica la estructura del array de usuarios

    if (response === "Token inválido o expirado") {
      setIsModalOpen(true);
      return;
    }
     
    if (response) {
    setActiveUsers(response);
    console.log("Usuarios pendientes guardados en el estado:", response); // Verifica que los usuarios se hayan guardado correctamente

    setTotalActiveUsers(response.length);
    }
  };


  // Fetch de negocio pendiente para complementar datos del usuario
  const fetchActiveBusiness = async (businessId: string | null) => {
    //const businessId = selectedUser ? selectedUser.businessId : null;
    const response = await fetchActiveBusinessFromAPI(businessId);
    console.log("Respuesta del negocio pendiente del backend en el componente PendingUsers.tsx:", response); // Verifica los datos de un negocio asociado al usuario pendiente.

    setActiveBusiness(response);
    console.log("Negocio pendiente guardado en el estado:", response); // Verifica que el negocio se haya guardado correctamente
  };



  useEffect(() => {
    fetchActiveBusinessesAdminsUsers();
    console.log("Valor de activeUsers: ", activeUsers);
  }, []);

  return (
    <div>
      <TokenExpiredModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      
      {(selectedUser && activeBusiness) && (
        <ActiveBusinessAdminUserDetailsModal
          user={selectedUser}
          business= {activeBusiness}
          onClose={() => {
            setSelectedUser(null);
            setSuccessMessage(null); // Resetea el mensaje al cerrar el modal
          }} 
          //onApprove={handleApprove}
          successMessage={successMessage}
        />
      )}


      <div className="p-4">
        <h2 className="text-2xl mb-4 font-semibold">Usuarios activos ({totalActiveUsers})</h2>
        <ul>
          {activeUsers && activeUsers.map((activeUser) => (
            <li key={activeUser._id} className="p-2 border-[3px] border-gray-400 hover:border-[#FFCF91] rounded-lg cursor-pointer mb-5" onClick={() => [setSelectedUser(activeUser), fetchActiveBusiness(activeUser.businessId)]}>
              <div className="ml-3">
                <strong className="text-xl">{activeUser.name} {activeUser.lastName}</strong> 
                <p><span className="font-semibold">Email:</span> {activeUser.email}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActiveBusinessesAdmins; */

"use client";
import React, { useState, useEffect, useContext } from "react";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import {
  fetchActiveBusinessesAdminsUsersFromAPI,
  ActiveBusinessAdminUser,
  fetchActiveBusinessFromAPI,
  ActiveBusiness,
} from "@/services/apiCall";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import ActiveBusinessAdminUserDetailsModal from "./ActiveBusinessAdminUserDetailsModal";

const ActiveBusinessesAdmins = () => {
  const { setUserToken, setSelectedOption, setUserRole, setUserName } =
    useContext(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] =
    useState<ActiveBusinessAdminUser | null>(null); // Para mostrar detalles del usuario
  const [activeUsers, setActiveUsers] = useState<ActiveBusinessAdminUser[]>([]);
  const [totalActiveUsers, setTotalActiveUsers] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeBusiness, setActiveBusiness] = useState<ActiveBusiness | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para el texto de búsqueda

  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get("userRole") || "";
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    setUserName(cookieUserName);

    setSelectedOption("AdminApp");
  }, [setUserToken, setUserRole, setUserName, setSelectedOption]);

  // Fetch de usuarios activos
  const fetchActiveBusinessesAdminsUsers = async () => {
    const response = await fetchActiveBusinessesAdminsUsersFromAPI();

    if (response === "Token inválido o expirado") {
      setIsModalOpen(true);
      return;
    }

    if (response) {
      setActiveUsers(response);
      setTotalActiveUsers(response.length);
    }
  };

  // Fetch de negocio pendiente para complementar datos del usuario
  const fetchActiveBusiness = async (businessId: string | null) => {
    const response = await fetchActiveBusinessFromAPI(businessId);
    setActiveBusiness(response);
  };

  useEffect(() => {
    fetchActiveBusinessesAdminsUsers();
  }, []);

  // Filtra los usuarios según el texto de búsqueda
  const filteredUsers = activeUsers.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {selectedUser && activeBusiness && (
        <ActiveBusinessAdminUserDetailsModal
          user={selectedUser}
          business={activeBusiness}
          onClose={() => {
            setSelectedUser(null);
            setSuccessMessage(null); // Resetea el mensaje al cerrar el modal
          }}
          //successMessage={successMessage}
        />
      )}

      <div className="p-4">
        <div className="bg-orange-600 rounded-t-lg">
          <h2 className="text-xl lg:text-2xl font-semibold text-[#FFCF91] text-center lg:text-l pl-6 py-2 mb-6">
            Usuarios activos ({totalActiveUsers})
          </h2>
        </div>

        {/* Campo de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full custom-w-450:w-[400px] mb-4 p-2 border border-gray-300 focus:border-gray-500 focus:outline-none rounded"
        />

        <ul>
          {filteredUsers &&
            filteredUsers.map((activeUser) => (
              <li
                key={activeUser._id}
                className="p-2 border-[3px] border-gray-400 hover:border-[#FFCF91] rounded-lg cursor-pointer mb-5"
                onClick={() => [
                  setSelectedUser(activeUser),
                  fetchActiveBusiness(activeUser.businessId),
                ]}
              >
                <div className="ml-3">
                  <strong className="text-xl">
                    {activeUser.name} {activeUser.lastName}
                  </strong>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {activeUser.email}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ActiveBusinessesAdmins;
