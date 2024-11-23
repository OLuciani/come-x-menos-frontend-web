/* "use client";
import React, { useState, useEffect, useContext } from "react";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import {
  fetchAllUsersFromAPI,
  ActiveBusinessAdminUser,
  fetchActiveBusinessFromAPI,
  ActiveBusiness,
} from "@/services/apiCall";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
//import ActiveBusinessAdminUserDetailsModal from "./SelectedUserModal";
import Link from "next/link";
//import AsociatedBusinessUserDetail from "@/app/asociatedBusinessUserDetail/AsociateBusinessUserDetail";
import SelectedUserModal from "./SelectedUserModal";

const AllUsers = () => {
  const { setUserToken, setSelectedOption, setUserRole, setUserName, setUserStatus } =
    useContext(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] =
    useState<ActiveBusinessAdminUser | null>(null); // Para mostrar detalles del usuario
  const [allUsers, setAllUsers] = useState<ActiveBusinessAdminUser[]>([]);
  const [users, setUsers] = useState<ActiveBusinessAdminUser[]>([]);
  const [quantityAllUsers, setQuantityAllUsers] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeBusiness, setActiveBusiness] = useState<ActiveBusiness | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para el texto de búsqueda
  const [showLabelRoleFilter, setShowLabelRoleFilter] = useState<boolean>(true);
  const [showRoleFilter, setShowRoleFilter] = useState<boolean>(false);
  const [selectedUserRole, setSelectedUserRole] = useState<string>("Todos los Usuarios");
  const [roleFilteredUsers, setRoleFilteredUsers] = useState<ActiveBusinessAdminUser[]>([]);

  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get("userRole") || "";
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    setUserName(cookieUserName);

    const storedUserStatus = Cookies.get("userStatus") || "";
    setUserStatus(storedUserStatus);

    //setSelectedOption("AdminApp");

    setSelectedOption("Mi cuenta");
  }, [setUserToken, setUserRole, setUserName, setSelectedOption]);

  // Fetch de usuarios activos
  const fetchAllUsers = async () => {
    const response = await fetchAllUsersFromAPI();

    if (response === "Token inválido o expirado") {
      setIsModalOpen(true);
      return;
    }

    if (response) {
      setAllUsers(response);
      setQuantityAllUsers(response.length);
      setUsers(response);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Filtrar usuarios por búsqueda y rol seleccionado
  useEffect(() => {
    let filtered = allUsers.filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    if (selectedUserRole !== "Todos los Usuarios") {
      filtered = filtered.filter(
        (user) =>
          user.role ===
          (selectedUserRole === "Directores de Negocios"
            ? "businessDirector"
            : selectedUserRole === "Administradores de Negocios"
            ? "businessManager"
            : selectedUserRole === "Empleados de Negocios"
            ? "businessEmployee"
            : "mobileCustomer")
      );
    }

    setRoleFilteredUsers(filtered);
  }, [allUsers, searchQuery, selectedUserRole]);

  return (
    <div>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {selectedUser &&  (
        <SelectedUserModal
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            setSuccessMessage(null); // Resetea el mensaje al cerrar el modal
          }}
        />
      )}

      <div className="bg-white border-2 shadow-lg rounded-lg p-4 lg:py-4 min-h-screen">
        <div className="bg-[#FFCF91] rounded-t-lg">
          <h2 className="text-xl lg:text-2xl font-semibold text-[#2C2C2C] text-center lg:text-l pl-6 py-2 mb-6">
            Total de usuarios ({quantityAllUsers})
          </h2>
        </div>

        <div className="w-full flex flex-row flex-wrap justify-center md:justify-evenly gap-3 items-center mb-3">
          <input
            type="text"
            placeholder="Buscar por email..."
            value={searchQuery}
            onChange={(e) => [setSearchQuery(e.target.value), setSelectedUserRole("Todos los Usuarios")]}
            className="w-full md:w-[384px] p-2 border-[2px] border-gray-400 focus:border-gray-500 focus:outline-none rounded-md"
          />

          {showLabelRoleFilter &&  (
            <div
              onClick={() => [
                setShowRoleFilter(true),
                setShowLabelRoleFilter(false),
              ]}
              className="w-full md:w-[384px] bg-gray-300 border-[2px] border-gray-300 hover:bg-[gray] hover:text-white rounded-md py-2 cursor-pointer"
            >
              <p className="cursor-pointer text-center">Filtrar por roles</p>
            </div>
          )}
        </div>

        {showRoleFilter && (
          <div className="w-full flex flex-col mb-5 border-[2px] border-gray-400 rounded-lg px-3 pb-3 relative">
            <div className="flex justify-center px-1 my-2">
              <p className="font-semibold cursor-pointer">Filtrar por roles</p>
              <p
                className="font-bold cursor-pointer absolute right-3"
                onClick={() => [
                  setShowRoleFilter(false),
                  setShowLabelRoleFilter(true),
                ]}
              >
                X
              </p>
            </div>
            <div className="w-full flex flex-row flex-wrap justify-center gap-3">
              {[
                { label: "Directores de Negocios", role: "businessDirector" },
                { label: "Administradores de Negocios", role: "businessManager" },
                { label: "Empleados de Negocios", role: "businessEmployee" },
                { label: "Clientes App Móvil", role: "mobileCustomer" },
                { label: "Todos los Usuarios", role: "Todos los Usuarios" },
              ].map(({ label, role }) => (
                <p
                  key={role}
                  className={`w-[40%] text-center py-2 rounded-lg cursor-pointer ${
                    selectedUserRole === label
                      ? "bg-[#FD7B03] text-white"
                      : "bg-[#FFCF91] hover:bg-[#FD7B03] hover:text-white"
                  }`}
                  onClick={() => [setSelectedUserRole(label), setSearchQuery("")]}
                >
                  {label}
                </p>
              ))}
            </div>
          </div>
        )}

        {
          !searchQuery && 
          <h3 className="text-center text-lg font-semibold py-3">
            {selectedUserRole} ({roleFilteredUsers.length})
          </h3>
        }

        {roleFilteredUsers.length === 0 && (
          <p className="text-center ">No se encontraron usuarios</p>
        )}

        <ul className="flex flex-col items-center">
          {roleFilteredUsers.map((user) => (
            <li
              key={user._id}
              className="w-full md:w-[600px] md:justify-center p-2 border-[3px] border-gray-400 hover:border-[#FFCF91] rounded-lg cursor-pointer mb-5"
              onClick={() => setSelectedUser(user)}
            >
              <div className="ml-3">
                <strong className="text-xl">
                  {user.name} {user.lastName}
                </strong>

                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                </p>

                <p>
                  <span className="font-semibold">Rol:</span>{" "}
                  {user.role === "businessDirector"
                    ? "Director del negocio"
                    : user.role === "businessManager"
                    ? "Administrador del negocio"
                    : user.role === "businessEmployee"
                    ? "Empleado del negocio"
                    : user.role === "mobileCustomer"
                    ? "Cliente de aplicación móvil"
                    : null}
                </p>

                <p>
                  <span className="font-semibold">
                    Estado de la cuenta de usuario:
                  </span>{" "}
                  {user.status === "active"
                    ? "Activa"
                    : user.status === "pending"
                    ? "Inactiva (cuenta suspendida temporalmente)"
                    : null}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllUsers; */



"use client";
import React, { useState, useEffect, useContext } from "react";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import {
  fetchAllUsersFromAPI,
  ActiveBusinessAdminUser,
  fetchActiveBusinessFromAPI,
  ActiveBusiness,
} from "@/services/apiCall";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
//import ActiveBusinessAdminUserDetailsModal from "./SelectedUserModal";
import Link from "next/link";
//import AsociatedBusinessUserDetail from "@/app/asociatedBusinessUserDetail/AsociateBusinessUserDetail";
import SelectedUserModal from "@/components/dashboardAppAdminComponents/allUsersComponents/SelectedUserModal";
import CircularProgress from "@mui/material/CircularProgress";

const AllUsers = () => {
  const { setUserToken, setSelectedOption, setUserRole, setUserName, setUserStatus, allUsers, setAllUsers } =
    useContext(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] =
    useState<ActiveBusinessAdminUser | null>(null); // Para mostrar detalles del usuario
  //const [allUsers, setAllUsers] = useState<ActiveBusinessAdminUser[]>([]);
  const [users, setUsers] = useState<ActiveBusinessAdminUser[]>([]);
  const [quantityAllUsers, setQuantityAllUsers] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  //const [activeBusiness, setActiveBusiness] = useState<ActiveBusiness | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para el texto de búsqueda
  const [showLabelRoleFilter, setShowLabelRoleFilter] = useState<boolean>(true);
  const [showRoleFilter, setShowRoleFilter] = useState<boolean>(false);
  const [selectedUserRole, setSelectedUserRole] = useState<string>("Todos los Usuarios");
  const [roleFilteredUsers, setRoleFilteredUsers] = useState<ActiveBusinessAdminUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get("userRole") || "";
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    setUserName(cookieUserName);

    const storedUserStatus = Cookies.get("userStatus") || "";
    setUserStatus(storedUserStatus);

    setSelectedOption("Mi cuenta");
  }, [setUserToken, setUserRole, setUserName, setSelectedOption, setSelectedOption]);


  useEffect(() => {
    // Fetch de usuarios activos
  const fetchAllUsers = async () => {
    setIsLoading(true); // Activar indicador de carga
    const response = await fetchAllUsersFromAPI();

    if (response === "Token inválido o expirado") {
      setIsModalOpen(true);
      setIsLoading(false);
      return;
    }

    if (response) {
      setAllUsers(response);
      setQuantityAllUsers(response.length);
      setUsers(response);
    }
    setIsLoading(false);//Desactivo indicador de carga
  };

    fetchAllUsers();
  }, []);

  // Filtrar usuarios por búsqueda y rol seleccionado
  useEffect(() => {
    let filtered = allUsers.filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    

    if (selectedUserRole !== "Todos los Usuarios") {
      filtered = filtered.filter(
        (user) =>
          user.role ===
          (selectedUserRole === "Directores de Negocios"
            ? "businessDirector"
            : selectedUserRole === "Administradores de Negocios"
            ? "businessManager"
            : selectedUserRole === "Empleados de Negocios"
            ? "businessEmployee"
            : "mobileCustomer")
      );
    }

    setRoleFilteredUsers(filtered);
  }, [allUsers, searchQuery, selectedUserRole]);

  return (
    <div>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {selectedUser &&  (
        <SelectedUserModal
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            //setSuccessMessage(null); // Resetea el mensaje al cerrar el modal
          }}
        />
      )}

      <div className="bg-white border-2 shadow-lg rounded-lg p-4 lg:py-4 min-h-screen">
      {/* {isLoading ? (
          <div className="flex justify-center mt-20">
            <CircularProgress size={30} />
          </div>
        ) : (
          <> */}
        <div className="bg-[#FFCF91] rounded-t-lg">
          <h2 className="text-xl lg:text-2xl font-semibold text-[#2C2C2C] text-center lg:text-l pl-6 py-2 mb-6">
            Total de usuarios ({quantityAllUsers})
          </h2>
        </div>

        <div className="w-full flex flex-row flex-wrap justify-center md:justify-evenly gap-3 items-center mb-3">
          <input
            type="text"
            placeholder="Buscar por email..."
            value={searchQuery}
            onChange={(e) => [setSearchQuery(e.target.value), setSelectedUserRole("Todos los Usuarios")]}
            className="w-full md:w-[384px] p-2 border-[2px] border-gray-400 focus:border-gray-500 focus:outline-none rounded-md"
          />

          {showLabelRoleFilter &&  (
            <div
              onClick={() => [
                setShowRoleFilter(true),
                setShowLabelRoleFilter(false),
              ]}
              className="w-full md:w-[384px] bg-gray-300 border-[2px] border-gray-300 hover:bg-[gray] hover:text-white rounded-md py-2 cursor-pointer"
            >
              <p className="cursor-pointer text-center">Filtrar por roles</p>
            </div>
          )}
        </div>
        {isLoading ? (
          <div className="flex justify-center mt-20">
            <CircularProgress size={30} />
          </div>
        ) : (
          <>

        {showRoleFilter && (
          <div className="w-full flex flex-col mb-5 border-[2px] border-gray-400 rounded-lg px-3 pb-3 relative">
            <div className="flex justify-center px-1 my-2">
              <p className="font-semibold cursor-pointer">Filtrar por roles</p>
              <p
                className="font-bold cursor-pointer absolute right-3"
                onClick={() => [
                  setShowRoleFilter(false),
                  setShowLabelRoleFilter(true),
                ]}
              >
                X
              </p>
            </div>
            <div className="w-full flex flex-row flex-wrap justify-center gap-3">
              {[
                { label: "Directores de Negocios", role: "businessDirector" },
                { label: "Administradores de Negocios", role: "businessManager" },
                { label: "Empleados de Negocios", role: "businessEmployee" },
                { label: "Clientes App Móvil", role: "mobileCustomer" },
                { label: "Todos los Usuarios", role: "Todos los Usuarios" },
              ].map(({ label, role }) => (
                <p
                  key={role}
                  className={`w-[40%] text-center py-2 rounded-lg cursor-pointer ${
                    selectedUserRole === label
                      ? "bg-[#FD7B03] text-white"
                      : "bg-[#FFCF91] hover:bg-[#FD7B03] hover:text-white"
                  }`}
                  onClick={() => [setSelectedUserRole(label), setSearchQuery("")]}
                >
                  {label}
                </p>
              ))}
            </div>
          </div>
        )}

        {
          !searchQuery && 
          <h3 className="text-center text-lg font-semibold py-3">
            {selectedUserRole} ({roleFilteredUsers.length})
          </h3>
        }

        {roleFilteredUsers.length === 0 && (
          <p className="text-center ">No se encontraron usuarios</p>
        )}

        <ul className="flex flex-col items-center">
          {roleFilteredUsers.map((user) => (
            <li
              key={user._id}
              className="w-full md:w-[560px] md:justify-center xl:w-[650px] p-2 border-[3px] border-gray-400 hover:border-[#FFCF91] rounded-lg cursor-pointer mb-5"
              onClick={() => setSelectedUser(user)}
            >
              <div className="ml-3">
                <strong className="text-xl">
                  {user.name} {user.lastName}
                </strong>

                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                </p>

                <p>
                  <span className="font-semibold">Rol:</span>{" "}
                  {user.role === "businessDirector"
                    ? "Director del negocio"
                    : user.role === "businessManager"
                    ? "Administrador del negocio"
                    : user.role === "businessEmployee"
                    ? "Empleado del negocio"
                    : user.role === "mobileCustomer"
                    ? "Cliente de aplicación móvil"
                    : null}
                </p>

                <p>
                  <span className="font-semibold">
                    Estado de la cuenta de usuario:
                  </span>{" "}
                  {user.status === "active"
                    ? "Activa"
                    : user.status === "pending"
                    ? "Inactiva (cuenta suspendida temporalmente)"
                    : null}
                </p>
              </div>
            </li>
          ))}
        </ul>
        </>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
