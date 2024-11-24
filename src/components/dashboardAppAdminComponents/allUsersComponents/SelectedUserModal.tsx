"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import { sendUserNotification, desactivateUser, deleteUser, activateUser, fetchAllUsersFromAPI, ActiveBusinessAdminUser } from "@/services/apiCall";
import Button from "@/components/button/Button";

import { toast, ToastContainer } from "react-toastify"; // Importo toast y ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importo los estilos
import MessageModal from "@/components/messageModal/MessageModal";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";


interface UserDetailsModalProps {
  //user: UserPending;
  user: ActiveBusinessAdminUser;
  onClose: () => void;
  
}

const SelectedUserModal: React.FC<UserDetailsModalProps> = ({
  user,
  onClose,
  
}) => {
  const { setSelectedOption, setUserToken, setUserRole, setUserName, setUserStatus, setAllUsers } =
    useContext(Context);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState(""); // Estado para el mensaje de notificación

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageText, setMessageText] = useState<string>("");
  const [messageTitle, setMessageTitle] = useState<string>("");
  const [messageRouterRedirection, setMessageRouterRedirection] =
    useState<string>("");
  const [selectedNavBarOption, setSelectedNavBarOption] = useState<string>("");
  const [isOpenMessageModal, setIsOpenMessageModal] = useState<boolean>(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showDeactivateUserModal, setShowDeactivateUserModal] = useState(false);
  const [showActivateUserModal, setShowActivateUserModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

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
  }, [setUserToken, setUserRole, setUserName, setSelectedOption, setSelectedOption, setUserStatus]);

  useEffect(() => {
    const modalContent = modalContentRef.current;

    if (modalContent) {
      // Comprobar si el contenido es desplazable
      const isScrollable =
        modalContent.scrollHeight > modalContent.clientHeight;

      setShowScrollIndicator(isScrollable);
    }
  }, []);


  const openDeleteModal = () => setShowDeleteUserModal(true);
  const closeDeleteModal = () => setShowDeleteUserModal(false);

  const openDeactivateModal = () => setShowDeactivateUserModal(true);
  const closeDeactivateModal = () => setShowDeactivateUserModal(false);

  const openActivateModal = () => setShowActivateUserModal(true);
  const closeActivateModal = () => setShowActivateUserModal(false);


  // Función para refrescar la lista de usuarios
  const refreshUsers = async () => {
    try {
      const response = await fetchAllUsersFromAPI();
      /* const data: ActiveBusinessAdminUser[] = await response.json();
      setUsers(data); */
      if(response) {
        setAllUsers(response);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  const handleDeactivateUser = async () => {
    if(user) {
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
        const route: string = "/allUsers";
        setMessageRouterRedirection(route);
        
        setShowDeactivateUserModal(false);
  
        setIsOpenMessageModal(true); 
  
        const navBarOption: string = "Mi cuenta";
        setSelectedNavBarOption(navBarOption);


        //toast.success("Se ha desactivado al usuario momentaneamente."); // Mensaje de éxito
  
        setTimeout(() => {
          //window.location.reload();
          refreshUsers();
          setSelectedOption("Mi cuenta");
          onClose();
        }, 10000);
        
      }
    }
  };

  const handleActivateUser = async () => {
    if(user) {
    const response = await activateUser(user._id);

    if (response === "Token inválido o expirado") {
      setIsModalOpen(true);
      return;
    }

    console.log("Valor de response.message: ", response.message);
    console.log("Valor de response.success: ", response.success);

    if (response.success === true) {
      const title: string = "Activación de usuario exitosa";
      setMessageTitle(title);
      const text: string = `Se cambió el estado de la cuenta al usuario ${user.name} ${user.lastName} con email ${user.originalEmail} de pendiente a activo. Ahora el usuario puede operar con su cuenta en la app.`;
      setMessageText(text);
      const route: string = "/allUsers";
      setMessageRouterRedirection(route);
      
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
        const title: string = "Eliminación de usuario exitosa";
        setMessageTitle(title);
        const text: string = `Se eliminó la cuenta del usuario ${user.name} ${user.lastName} con email ${user.originalEmail} definitivamente. La cuenta ya no existe por lo tanto ya no está asociada a la cuenta de negocio.`;
        setMessageText(text);
        const route: string = "/allUsers";
        setMessageRouterRedirection(route);
  
        setShowDeleteUserModal(false);
  
        setIsOpenMessageModal(true);
  
        window.location.reload()
       const navBarOption: string = "Mi cuenta";
        setSelectedNavBarOption(navBarOption); 

        setTimeout(() => {
          //window.location.reload();
          refreshUsers();
          setSelectedOption("Mi cuenta");
          onClose();
        }, 10000);
      }
    }
  };

  const handleSendNotification = async () => {
    if (!message.trim()) {
      toast.error("Por favor, escribe un mensaje antes de enviar."); // Validación simple
      return;
    }

    //const response = await sendNotificationPendingUser(user._id, message);
    const response = await sendUserNotification(user._id, message);

    if (response.success) {
      toast.success("Notificación enviada exitosamente."); // Mensaje de éxito
      setMessage(""); // Limpiar el textarea
    } else {
      toast.error("Error al enviar la notificación."); // Mensaje de error
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex flex-col justify-center items-center z-50">
        <div
          className="bg-white py-3 rounded-lg w-[90%] max-h-[92vh] overflow-y-auto relative"
          ref={modalContentRef}
        >
          {/* Modal para mostrar mensajes al usuario */}
          <MessageModal
            isOpenMessageModal={isOpenMessageModal}
            onCloseMessageModal={() => setIsOpenMessageModal(false)}
            messageTitle={messageTitle}
            messageText={messageText}
            messageRouterRedirection={messageRouterRedirection}
            selectedNavBarOption={selectedNavBarOption}
          />


          {/* Flecha indicativa para scrollear */}
          {showScrollIndicator && (
            <div className="absolute bottom-0 right-3 w-full flex justify-end">
              <div className="animate-bounce text-gray-500">↓ Scroll</div>
            </div>
          )}

          <div className="w-full h-6 relative mb-2">
            <p
              onClick={onClose}
              className="absolute right-5 text-lg font-bold cursor-pointer"
            >
              X
            </p>
          </div>

          <h2 className="text-2xl text-center mb-4 font-semibold">
            Detalles cuenta de {user.name} {user.lastName}
          </h2>

          {/* <div className="px-8 pb-1"> */}
          <div className="w-[full] px-4 custom-w-450:px-6 pb-1 flex flex-col gap-3">
            <p>
              <strong>Nombre:</strong> {user.name}
            </p>
            <p>
              <strong>Apellido:</strong> {user.lastName}
            </p>
            
            <p>
              <strong>Email:</strong> {user.originalEmail}
            </p>

            <p>
              <strong>Rol de usuario:</strong> {user.role}
            </p>

            <p>
                <strong>Estado de la cuenta de usuario:</strong>{" "}
                {user.status === "active"
                  ? "Activa"
                  : user.status === "pending"
                  ? "Inactiva (cuenta suspendida temporalmente)"
                  : null}
              </p>
            

            


            {/* Textarea para enviar notificación */}
            <div className="mt-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje para el usuario..."
                rows={4}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>


          <div className="w-full px-4 mt-4 flex justify-center">
            <div className="w-full custom-w-450:w-[400px] lg:w-1/2">
              <Button
                buttonText="Enviar Notificación"
                onClickButton={handleSendNotification} // Llama a la función para enviar notificación
              />
            </div>
          </div>
        

        {
              user.status === "active" && 

            <div className="w-full lg:flex ">
                {/* Botón para desactivar */}
                <div className="w-full px-4 lg:w-[50%] flex justify-center">
                    <div className="w-full custom-w-450:w-[400px] lg:w-[95%]">
                        <Button
                        buttonText={isLoading ? "Cargando..." : "Desactivar Usuario"}
                        onClickButton={openDeactivateModal}
                        />
                    </div>
                </div>

                {/* Botón para eliminar */}
                <div className="w-full px-4 lg:w-[50%] flex justify-center">
                    <div className="w-full custom-w-450:w-[400px] lg:w-[95%]">
                        <Button
                        buttonText={isLoading ? "Cargando..." : "Eliminar Usuario"}
                        onClickButton={openDeleteModal}
                        />
                    </div>
                </div>
            </div>
            }

            {
              user.status === "pending" &&
              <div className="w-full lg:flex">
                  <div className="w-full px-4 lg:w-[50%] flex justify-center">
                    <div className="w-full custom-w-450:w-[400px] lg:w-[95%]">
                        <Button
                        buttonText={isLoading ? "Cargando..." : "Activar Usuario"}
                        onClickButton={openActivateModal}
                        />
                    </div>
                  </div>

                  {/* Botón para eliminar */}
                  <div className="w-full px-4 lg:w-[50%] flex justify-center">
                      <div className="w-full custom-w-450:w-[400px] lg:w-[95%]">
                          <Button
                          buttonText={isLoading ? "Cargando..." : "Eliminar Usuario"}
                          onClickButton={openDeleteModal}
                          />
                      </div>
                  </div>
              </div>
            }


            {/* Modal para confirmar eliminación */}
            {showDeleteUserModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white px-4 rounded-lg w-[85%] h-[300px] sm:w-[50%] sm:h-[50%] mx-auto text-center flex flex-col justify-evenly">
                  <p className="text-xl font-semibold">
                    ¿Estás seguro que deseas eliminar definitivamente la cuenta de este usuario?
                  </p>
                  <div className="flex justify-center gap-4 px-2">
                    <button
                      onClick={handleDeleteUser}
                      className="w-[120px] bg-[#FFCF91] text-[18px] text-white font-semibold h-[40px] rounded-[20px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Cargando..." : "Eliminar"}
                    </button>
                    <button
                      onClick={closeDeleteModal}
                      className="w-[120px] bg-gray-300 text-[18px] text-gray-700 font-semibold h-[40px] rounded-[20px] border-[5px] border-gray-400 transition-colors duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900"
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
                <div className="bg-white px-4 rounded-lg w-[85%] h-[300px] sm:w-[50%] sm:h-[50%] mx-auto text-center flex flex-col justify-evenly">
                  <p className="text-xl font-semibold">
                    ¿Estás seguro que deseas desactivar momentaneamente la cuenta de este usuario?
                  </p>
                  <div className="flex justify-center gap-4 px-2">
                    <button
                      onClick={() =>[handleDeactivateUser()]}
                      className="w-[120px] bg-[#FFCF91] text-[18px] text-white font-semibold h-[40px] rounded-[20px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Cargando..." : "Desactivar"}
                    </button>
                    <button
                      onClick={closeDeactivateModal}
                      className="w-[120px] bg-gray-300 text-[18px] text-gray-700 font-semibold h-[40px] rounded-[20px] border-[5px] border-gray-400 transition-colors duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900"
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
                      className="w-[120px] bg-[#FFCF91] text-[18px] text-white font-semibold h-[40px] rounded-[20px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Cargando..." : "Activar"}
                    </button>
                    <button
                      onClick={closeActivateModal}
                      className="w-[120px] bg-gray-300 text-[18px] text-gray-700 font-semibold h-[40px] rounded-[20px] border-[5px] border-gray-400 transition-colors duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900"
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
    </>
  );
};

export default SelectedUserModal;
