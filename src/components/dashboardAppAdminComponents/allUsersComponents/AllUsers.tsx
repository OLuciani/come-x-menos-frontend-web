//Con paginación desde el frontend. Funciona perfecto.
"use client";
import React, { useState, useEffect, useContext } from "react";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { fetchAllUsersFromAPI } from "@/api/userService";
import { ActiveBusinessAdminUser } from "@/types/userTypes";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import SelectedUserModal from "@/components/dashboardAppAdminComponents/allUsersComponents/SelectedUserModal";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";

const AllUsers = () => {
  const {
    setUserToken,
    setSelectedOption,
    setUserRole,
    setUserName,
    setUserStatus,
    allUsers,
    setAllUsers,
  } = useContext(Context);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<ActiveBusinessAdminUser | null>(null);
  const [users, setUsers] = useState<ActiveBusinessAdminUser[]>([]);
  const [quantityAllUsers, setQuantityAllUsers] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUserRole, setSelectedUserRole] = useState<string>("Todos los Usuarios");
  const [roleFilteredUsers, setRoleFilteredUsers] = useState<ActiveBusinessAdminUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 4; //Por ahora los pagino de a 4 usuarios porque tengo pocos en la base de datos.

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
  }, [setUserToken, setUserRole, setUserName, setSelectedOption, setUserStatus]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetchAllUsersFromAPI();

        //Si el token expiró va a mostrar un modal informando al usuario
        if (response === "TOKEN_EXPIRED") {
          setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
          return; // Detiene la ejecución para evitar errores con response
        }
        
        if (response) {
          setAllUsers(response);
          setQuantityAllUsers(response.length);
          setUsers(response);
        }
      } catch (err) {
        setError("Ocurrió un error al cargar los usuarios. Inténtalo nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllUsers();
  }, [setAllUsers]);

  useEffect(() => {
    if (allUsers.length > 0) {

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
    }
  }, [allUsers, searchQuery, selectedUserRole]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const roleOptions = [
    "Todos los Usuarios",
    "Directores de Negocios",
    "Administradores de Negocios",
    "Empleados de Negocios",
    "Clientes App Móvil",
  ];

  const paginatedUsers = roleFilteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {selectedUser && (
        <SelectedUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:p-4 min-h-screen">
        {isLoading ? (
          <div className="flex justify-center mt-20">
            <CircularProgress size={30} />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <div className="bg-[#FFCF91] rounded-t-lg">
              <h2 className="text-xl lg:text-2xl font-bold text-[#2C2C2C] text-center lg:text-l pl-6 py-2 mb-6">
                {selectedUserRole} ({roleFilteredUsers.length})
              </h2>
            </div>

            <div className="w-full flex flex-row flex-wrap justify-center gap-3 items-center mb-3">
              <input
                type="text"
                placeholder="Buscar por email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[384px] p-2 border-[2px] border-gray-400 focus:border-gray-500 focus:outline-none rounded-md"
              />

              <select
                value={selectedUserRole}
                onChange={(e) => setSelectedUserRole(e.target.value)}
                className="w-full md:w-[384px] p-2 border-[2px] border-gray-400 rounded-md"
                onClick={() => setCurrentPage(1)}
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {roleFilteredUsers.length === 0 ? (
              <p className="text-center">No se encontraron usuarios</p>
            ) : (
              <>
                <ul className="flex flex-col items-center">
                  {paginatedUsers.map((user) => (
                    <li
                      key={user._id}
                      className="w-full md:w-[560px] xl:w-[650px] p-1 border-[3px] border-gray-400 hover:border-[#FFCF91] rounded-lg cursor-pointer mb-5 break-words"
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="ml-3">
                        <p>
                          <span className="font-semibold">Email:</span> {user.email}
                        </p>
                        <p>
                          <span className="font-semibold">Nombre del negocio:</span>{" "}
                          {user.businessName}
                        </p>
                        <p>
                          <span className="font-semibold">Rol:</span>{" "}
                          {user.role === "businessDirector"
                            ? "Director del negocio"
                            : user.role === "businessManager"
                            ? "Administrador del negocio"
                            : user.role === "businessEmployee"
                            ? "Empleado del negocio"
                            : "Cliente de aplicación móvil"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Pagination
                  count={Math.ceil(roleFilteredUsers.length / usersPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  className="flex justify-center mt-4"
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllUsers;




