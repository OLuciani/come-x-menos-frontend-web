// Este componente `UserDetailsModal` muestra un modal con la información del usuario pendiente
// Incluye un botón para aprobar al usuario y enlaces para visualizar archivos relacionados (imágen de portada, logo, PDF de Affip).
// Si el contenido del modal es desplazable, muestra una indicación de "scroll".

/* "use client"
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

const PendingUserDetailsModal: React.FC<UserDetailsModalProps> = ({
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

            
            <a
              href={user.pdfBusinessRegistration}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Ver PDF de AFIP
            </a>

            
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

            
            <a
              href={business.urlLogo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Ver el logo del negocio
            </a>
          </div>

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

export default PendingUserDetailsModal; */




"use client"
import React, { useState, useEffect, useRef } from "react";
import { UserPending, PendingBusiness, sendUserNotification/* sendNotificationPendingUser */ } from "@/services/apiCall"; // Importar la función de envío
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

const PendingUserDetailsModal: React.FC<UserDetailsModalProps> = ({
  user,
  onClose,
  onApprove,
  successMessage,
  business,
}) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);
  
  const [message, setMessage] = useState(''); // Estado para el mensaje de notificación

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

  const handleSendNotification = async () => {
    if (!message.trim()) {
      toast.error("Por favor, escribe un mensaje antes de enviar."); // Validación simple
      return;
    }

    //const response = await sendNotificationPendingUser(user._id, message);
    const response = await sendUserNotification(user._id, message);

    
    if (response.success) {
      toast.success("Notificación enviada exitosamente."); // Mensaje de éxito
      setMessage(''); // Limpiar el textarea
    } else {
      toast.error("Error al enviar la notificación."); // Mensaje de error
    }
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

          {/* Textarea para enviar notificación */}
          <div className="px-8 pb-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe un mensaje para el usuario..."
              rows={4}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mt-4 flex justify-center">
            <div className="w-[40%] mr-2">
              <Button
                buttonText="Enviar Notificación"
                onClickButton={handleSendNotification} // Llama a la función para enviar notificación
              />
            </div>
            <div className="w-[40%]">
              <Button
                buttonText="Aprobar"
                onClickButton={() => { onApprove(user._id); handleApprove(user._id); }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingUserDetailsModal;
