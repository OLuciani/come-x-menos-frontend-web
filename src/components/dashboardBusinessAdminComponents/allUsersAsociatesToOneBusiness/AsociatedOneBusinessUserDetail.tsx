"use client";
import React, { useState, useEffect, useContext } from "react";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import {
  ActiveUser,
  desactivateUser,
  deleteUser,
  activateUser,
  fetchAsociatedBusinessUsers,
  ActiveBusinessAdminUser,
} from "@/services/apiCall";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import Button from "@/components/button/Button";
import MessageModal from "@/components/messageModal/MessageModal";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface UserDetailsModalProps {
  //user?: ActiveUser | undefined;
  user?: ActiveBusinessAdminUser;
  //onClose?: () => void | undefined;
  onClose: () => void;

  setSection?: (section: string) => void;
}

const AsociatedOneBusinessUserDetail: React.FC<UserDetailsModalProps> = ({
  user,
  onClose,
  setSection,
}) => {
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showDeactivateUserModal, setShowDeactivateUserModal] = useState(false);
  const [showActivateUserModal, setShowActivateUserModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    isLoggedIn,
    setUserToken,
    setSelectedOption,
    setUserRole,
    setUserName,
    setUserStatus,
    setAllUsers,
  } = useContext(Context);

  const [isOpenMessageModal, setIsOpenMessageModal] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const [messageTitle, setMessageTitle] = useState<string>("");
  const [messageRouterRedirection, setMessageRouterRedirection] =
    useState<string>("");
  const [selectedNavBarOption, setSelectedNavBarOption] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
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

  const openDeleteModal = () => setShowDeleteUserModal(true);
  const closeDeleteModal = () => setShowDeleteUserModal(false);

  const openDeactivateModal = () => setShowDeactivateUserModal(true);
  const closeDeactivateModal = () => setShowDeactivateUserModal(false);

  const openActivateModal = () => setShowActivateUserModal(true);
  const closeActivateModal = () => setShowActivateUserModal(false);

  // Función para refrescar la lista de usuarios
  const refreshUsers = async () => {
    try {
      const response = await fetchAsociatedBusinessUsers();
      /* const data: ActiveBusinessAdminUser[] = await response.json();
      setUsers(data); */
      if (response) {
        setAllUsers(response);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeactivateUser = async () => {
    if (user) {
      const response = await desactivateUser(user._id);

      if (response === "Token inválido o expirado") {
        setIsModalOpen(true);
        return;
      }

      console.log("Valor de response.message: ", response.message);
      console.log("Valor de response.success: ", response.success);

      if (response.success === true) {
        const title: string = "Desactivación de usuario exitosa";
        setMessageTitle(title);
        const text: string = `Se cambió el estado de la cuenta al usuario ${user.name} ${user.lastName} con email ${user.originalEmail} de activo a pendiente. Momentaneamente no podrá operar con su cuenta.`;
        setMessageText(text);
        /* const route: string = "/asociatedBusinessUsers";
        setMessageRouterRedirection(route); */

        setShowDeactivateUserModal(false);

        setIsOpenMessageModal(true);

        const navBarOption: string = "Mi cuenta";
        setSelectedNavBarOption(navBarOption);

        setTimeout(() => {
          refreshUsers();
          setSelectedOption("Mi cuenta");
          onClose();
        }, 10000);

        /* setTimeout(() => {
          if(onClose) {
            onClose();
          }
          window.location.reload()
        }, 15000); */
      }
    }
  };

  const handleActivateUser = async () => {
    if (user) {
      const response = await activateUser(user._id);

      if (response === "Token inválido o expirado") {
        setIsModalOpen(true);
        return;
      }

      console.log("Valor de response.message: ", response.message);
      console.log("Valor de response.success: ", response.success);

      if (response.success === true) {
        //alert("Correo de invitación enviado con éxito.");
        const title: string = "Activación de usuario exitosa";
        setMessageTitle(title);
        const text: string = `Se cambió el estado de la cuenta al usuario ${user.name} ${user.lastName} con email ${user.originalEmail} de pendiente a activo. Ahora el usuario puede operar con su cuenta en la app.`;
        setMessageText(text);
        /* const route: string = "/asociatedBusinessUsers";
      setMessageRouterRedirection(route); */

        setShowActivateUserModal(false);

        setIsOpenMessageModal(true);

        const navBarOption: string = "Mi cuenta";
        setSelectedNavBarOption(navBarOption);

        setTimeout(() => {
          //window.location.reload();
          refreshUsers();
          setSelectedOption("Mi cuenta");
          onClose();
        }, 10000);

        /* setTimeout(() => {
        if(onClose) {
          onClose();
        }
        window.location.reload()
      }, 15000); */
      }
    }
  };

  const handleDeleteUser = async () => {
    if (user) {
      const response = await deleteUser(user._id);

      if (response === "Token inválido o expirado") {
        setIsModalOpen(true);
        return;
      }

      console.log("Valor de response.message: ", response.message);
      console.log("Valor de response.success: ", response.success);
      console.log("valor de response.deletedUser: ", response.deletedUser);

      if (response.success === true) {
        //alert("Correo de invitación enviado con éxito.");
        const title: string = "Eliminación de usuario exitosa";
        setMessageTitle(title);
        const text: string = `Se eliminó la cuenta del usuario ${user.name} ${user.lastName} con email ${user.originalEmail} definitivamente. La cuenta ya no existe por lo tanto ya no está asociada a la cuenta de negocio.`;
        setMessageText(text);
        /* const route: string = "/asociatedBusinessUsers";
        setMessageRouterRedirection(route); */

        setShowDeleteUserModal(false);

        setIsOpenMessageModal(true);

        const navBarOption: string = "Mi cuenta";
        setSelectedNavBarOption(navBarOption);

        setTimeout(() => {
          //window.location.reload();
          refreshUsers();
          setSelectedOption("Mi cuenta");
          onClose();
        }, 10000);

        /* setTimeout(() => {
          if (onClose) {
            onClose();
          }
          window.location.reload()
        }, 15000); */
      }
    }
  };

  return (
    <>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {user && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <div
            className="bg-white rounded-lg w-[95%] md:w-[50%] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageModal
              isOpenMessageModal={isOpenMessageModal}
              onCloseMessageModal={() => setIsOpenMessageModal(false)}
              messageTitle={messageTitle}
              messageText={messageText}
              messageRouterRedirection={messageRouterRedirection}
              selectedNavBarOption={selectedNavBarOption}
            />

            <div className="p-4">
              <div className="flex justify-end mr-4 mt-2">
                <p 
                onClick={() => [onClose && onClose()]}
                className="text-lg cursor-pointer font-bold"
                >
                    X
                </p>
              </div>


              <h2 className="text-2xl text-center mb-4 font-semibold">
                Cuenta de {user.name} {user.lastName}
            </h2>

              <div className="lg:w-[90%] lg:mt-10 flex flex-col mx-auto gap-6 lg:border-[2px] border-[lightgray] rounded-xl py-10 px-4">
                <div className="w-full lg:w-[90%] lg:px-4 custom-w-450:px-6 flex flex-col justify-center gap-5">
                  {/* <p>
                    <strong>Nombre:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Apellido:</strong> {user.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.originalEmail}
                  </p>
                  <p>
                    <span className="font-semibold">Estado de la cuenta de usuario:</span>{" "}
                    {user.status === "active"
                      ? "Activa"
                      : user.status === "pending"
                      ? "Inactiva (cuenta suspendida temporalmente)"
                      : null}
                  </p> */}

                  <p>
                    <span className="font-semibold">Nombre completo:</span>{" "}
                    {user.name} {user.lastName}
                  </p>

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

                {user.status === "active" && (
                  <div className="w-full lg:flex">
                    <div className="w-full lg:w-[50%] flex justify-center">
                      <div className="w-full custom-w-450:w-[400px] lg:w-[95%]">
                        <Button
                          buttonText={
                            isLoading ? "Cargando..." : "Desactivar Usuario"
                          }
                          onClickButton={openDeactivateModal}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-[50%] flex justify-center">
                      <div className="w-full custom-w-450:w-[400px] lg:w-[95%]">
                        <Button
                          buttonText={
                            isLoading ? "Cargando..." : "Eliminar Usuario"
                          }
                          onClickButton={openDeleteModal}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {user.status === "pending" && (
                  <div className="w-full lg:flex">
                    <div className="w-full lg:w-[50%] flex justify-center">
                      <div className="w-full custom-w-450:w-[400px] lg:w-[95%]">
                        <Button
                          buttonText={
                            isLoading ? "Cargando..." : "Activar Usuario"
                          }
                          onClickButton={openActivateModal}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-[50%] flex justify-center">
                      <div className="w-full custom-w-450:w-[400px] lg:w-[95%]">
                        <Button
                          buttonText={
                            isLoading ? "Cargando..." : "Eliminar Usuario"
                          }
                          onClickButton={openDeleteModal}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal para confirmar eliminación */}
                {showDeleteUserModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white px-4 rounded-lg w-[85%] h-[300px] sm:w-[50%] sm:h-[70%] mx-auto text-center flex flex-col justify-evenly">
                      <p className="text-xl font-semibold">
                        ¿Estás seguro que deseas eliminar definitivamente la
                        cuenta de este usuario?
                      </p>
                      <div className="flex justify-center gap-4 px-2">
                        <button
                          onClick={handleDeleteUser}
                          className="w-[120px] bg-[#FFCF91] text-[18px] text-white font-semibold h-[40px] rounded-[20px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] px-2"
                          disabled={isLoading}
                        >
                          {isLoading ? "Cargando..." : "Eliminar"}
                        </button>
                        <button
                          onClick={closeDeleteModal}
                          className="w-[120px] bg-gray-300 text-[18px] text-gray-700 font-semibold h-[40px] rounded-[20px] border-[5px] border-gray-400 transition-colors duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900 px-2"
                          disabled={isLoading}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal para confirmar desactivación */}
                {showDeactivateUserModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white px-4 rounded-lg w-[85%] h-[300px] sm:w-[50%] mx-auto text-center flex flex-col justify-evenly">
                      <p className="text-xl font-semibold">
                        ¿Estás seguro que deseas desactivar momentaneamente la
                        cuenta de este usuario?
                      </p>
                      <div className="flex justify-center gap-4 px-2">
                        <button
                          onClick={handleDeactivateUser}
                          className="w-[120px] bg-[#FFCF91] text-[18px] text-white font-semibold h-[40px] rounded-[20px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] px-2"
                          disabled={isLoading}
                        >
                          {isLoading ? "Cargando..." : "Desactivar"}
                        </button>
                        <button
                          onClick={closeDeactivateModal}
                          className="w-[120px] bg-gray-300 text-[18px] text-gray-700 font-semibold h-[40px] rounded-[20px] border-[5px] border-gray-400 transition-colors duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900 px-2"
                          disabled={isLoading}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal para confirmar la activación de un usuario */}
                {showActivateUserModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white px-4 rounded-lg w-[85%] h-[300px] sm:w-[50%] sm:h-[50%] mx-auto text-center flex flex-col justify-evenly">
                      <p className="text-xl font-semibold">
                        ¿Estás seguro que deseas Activar este usuario?
                      </p>
                      <div className="flex justify-center gap-4 px-2">
                        <button
                          onClick={handleActivateUser}
                          className="w-[120px] bg-[#FFCF91] text-[18px] text-white font-semibold h-[40px] rounded-[20px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] px-2"
                          disabled={isLoading}
                        >
                          {isLoading ? "Cargando..." : "Activar"}
                        </button>
                        <button
                          onClick={closeActivateModal}
                          className="w-[120px] bg-gray-300 text-[18px] text-gray-700 font-semibold h-[40px] rounded-[20px] border-[5px] border-gray-400 transition-colors duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900 px-2"
                          disabled={isLoading}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AsociatedOneBusinessUserDetail;
