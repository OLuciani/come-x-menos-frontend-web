//Ver como lo utilicé en components/dashboardComponents/invitationQrScannerUser/InvitationQrScannerUser.tsx 
"use client"
import React, { useEffect, useContext } from 'react';
import { Context } from "@/context/Context";
import { useRouter } from "next/navigation";

interface MessageModalProps {
  isOpenMessageModal: boolean;
  onCloseMessageModal: () => void;
  messageTitle: string;
  messageText: string;
  messageRouterRedirection?: string;
  selectedNavBarOption: string;
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpenMessageModal, onCloseMessageModal, messageText, messageTitle, messageRouterRedirection, selectedNavBarOption }) => {
  const { setSelectedOption } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (isOpenMessageModal) {
      const timer = setTimeout(() => {
        onCloseMessageModal();
        router.push(`${messageRouterRedirection}`); // Redirije a una vista cuando se cierra el modal con el mensaje
        setSelectedOption(`${selectedNavBarOption}`); // Marca la opción seleccionada en NavBar.tsx al cerrarse el modal
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [isOpenMessageModal, onCloseMessageModal, router]);

  if (!isOpenMessageModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        {/* Título del mensaje en el modal */}
        <h2 className="text-xl font-semibold mb-4">{messageTitle}</h2>

        {/* Texto del mensaje en el modal */}
        <p className="text-gray-700">{messageText}</p>
      </div>
    </div>
  );
};

export default MessageModal;