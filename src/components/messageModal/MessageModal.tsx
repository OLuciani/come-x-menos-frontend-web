//Ver como lo utilicé en components/dashboardComponents/invitationQrScannerUser/InvitationQrScannerUser.tsx 
"use client"
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

interface MessageModalProps {
  isOpenMessageModal: boolean;
  onCloseMessageModal: () => void;
  messageTitle: string;
  messageText: string;
  messageRouterRedirection: string;
}

const MessageModal: React.FC<MessageModalProps> = ({ isOpenMessageModal, onCloseMessageModal, messageText, messageTitle, messageRouterRedirection }) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpenMessageModal) {
      const timer = setTimeout(() => {
        onCloseMessageModal();
        router.push(`${messageRouterRedirection}`);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [isOpenMessageModal, onCloseMessageModal, router]);

  if (!isOpenMessageModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-4">{messageTitle}</h2>
        <p className="text-gray-700">{messageText}</p>
      </div>
    </div>
  );
};

export default MessageModal;