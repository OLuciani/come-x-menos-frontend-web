// Este componente `UserDetailsModal` muestra un modal con la información del usuario pendiente
// Incluye un botón para aprobar al usuario y enlaces para visualizar archivos relacionados (imágen de portada, logo, PDF de Affip).
// Si el contenido del modal es desplazable, muestra una indicación de "scroll".

"use client"
import React, { useState, useEffect, useRef } from "react";
import { UserPending, PendingBusiness } from "@/services/apiCall";
import Button from "@/components/button/Button";

import { toast, ToastContainer } from 'react-toastify'; // Importo toast y ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importo los estilos

interface UserDetailsModalProps {
  user: UserPending;
  onClose: () => void;
  onApprove: (userId: string) => void;
  successMessage: string | null;
  business: PendingBusiness;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  onClose,
  onApprove,
  successMessage,
  business,
}) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  //const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(!!successMessage);


  useEffect(() => {
    const modalContent = modalContentRef.current;

    if (modalContent) {
      // Comprobar si el contenido es desplazable
      const isScrollable =
        modalContent.scrollHeight > modalContent.clientHeight;

      setShowScrollIndicator(isScrollable);
    }
  }, []);


  const handleApprove = (userId: string) => {
    console.log("ID del usuario que será aprobado:", userId);
    onApprove(userId); // Llama a la función onApprove
    toast.success(`Usuario ${user.name} ${user.lastName} aprobado exitosamente!`, {
      autoClose: 5000,
    });
  };

  return (
    <>
      <ToastContainer />
      
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
        <div
          className="bg-white py-3 rounded-lg w-[90%] max-w-lg max-h-[92vh] overflow-y-auto relative"
          ref={modalContentRef}
        >
          {/* Flecha indicativa para scrollear */}
          {showScrollIndicator && (
            <div className="absolute bottom-0 right-3 w-full flex justify-end">
              <div className="animate-bounce text-gray-500">↓ Scroll</div>
            </div>
          )}

          <div className="w-full h-6 relative">
            <p
              onClick={onClose}
              className="absolute right-5 text-lg font-bold cursor-pointer"
            >
              X
            </p>
          </div>

          <h2 className="text-2xl text-center mb-4 font-semibold">
            Revisar cuenta de {user.name} {user.lastName}
          </h2>

          <div className="px-8 pb-1">
            <p>
              <strong>Nombre:</strong> {user.name}
            </p>
            <p>
              <strong>Apellido:</strong> {user.lastName}
            </p>
            <p>
              <strong>Teléfono:</strong> {user.phone}
            </p>
            <p>
              <strong>Email:</strong> {user.originalEmail}
            </p>
            <p>
              <strong>Nombre del negocio:</strong> {user.businessName}
            </p>

            {/* Enlace para ver la imágen de portada del negocio */}
            <a
              href={business.imageURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Ver Imágen de portada del negocio
            </a>

            <p>
              <strong>Tipo de negocio:</strong> {user.businessType}
            </p>
            <p>
              <strong>Rol de usuario:</strong> {user.role}
            </p>
            <p>
              <strong>Estado de la cuenta:</strong> {user.status}
            </p>
            <p>
              <strong>Teléfono:</strong> {user.phone}
            </p>

            {/* Enlace para ver el PDF */}
            <a
              href={user.pdfBusinessRegistration}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Ver PDF de AFIP
            </a>

            {/* Datos del negocio */}
            <p>
              <strong>Dirección del negocio:</strong> {business.address}
            </p>
            <p>
              <strong>Número de la dirección:</strong> {business.addressNumber}
            </p>
            <p>
              <strong>Latitud:</strong> {business.latitude}
            </p>
            <p>
              <strong>Longitud:</strong> {business.longitude}
            </p>
            <p>
              <strong>Ciudad:</strong> {business.city}
            </p>
            <p>
              <strong>País:</strong> {business.country}
            </p>

            {/* Enlace para ver el logo */}
            <a
              href={business.urlLogo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Ver el logo del negocio
            </a>
          </div>


          {/* Mostrar el mensaje de éxito si existe */}
          {/* {successMessage && (
            <div className="w-full absolute top-1/2 bg-orange-600 text-white text-2xl text-center py-10 rounded z-50">
              {successMessage}
            </div>
          )} */}

          <div className="mt-4 flex justify-center">
            <div className="w-[80%]">
              <Button
                buttonText="Aprobar"
                onClickButton={() => {onApprove(user._id); handleApprove(user._id);}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsModal;

