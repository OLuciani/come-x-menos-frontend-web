"use client"
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

interface SessionExpiredModalProps {
  isOpenRegistrationConfirmation: boolean;
  onCloseRegistrationConfirmation: () => void;
}

const RegistrationConfirmationModal: React.FC<SessionExpiredModalProps> = ({ isOpenRegistrationConfirmation, onCloseRegistrationConfirmation }) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpenRegistrationConfirmation) {
      const timer = setTimeout(() => {
        onCloseRegistrationConfirmation();
        router.push('/login');
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [isOpenRegistrationConfirmation, onCloseRegistrationConfirmation, router]);

  if (!isOpenRegistrationConfirmation) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4 py-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">¡Registro Exitoso!</h2>
        <p className="text-gray-700 mb-4">
          Hemos recibido tu solicitud y estamos revisando la información para asegurarnos de que cumpla con nuestros requisitos. 
          Si todo está correcto, te enviaremos un correo electrónico para informarte que tu cuenta ha sido aprobada. 
          A partir de entonces, tendrás acceso a todas las funcionalidades de la aplicación.
        </p>
        <p className="text-gray-700">
          ¡Gracias por tu comprensión y paciencia!
        </p>
      </div>
    </div>
  );
};

export default RegistrationConfirmationModal;