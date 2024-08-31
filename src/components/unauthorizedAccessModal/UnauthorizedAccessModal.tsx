"use client"
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

interface SessionExpiredModalProps {
  isOpenUnauthorizedAccess: boolean;
  onCloseUnauthorizedAccess: () => void;
}

const UnauthorizedAccesssModal: React.FC<SessionExpiredModalProps> = ({ isOpenUnauthorizedAccess, onCloseUnauthorizedAccess }) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpenUnauthorizedAccess) {
      const timer = setTimeout(() => {
        onCloseUnauthorizedAccess();
        router.push('/');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpenUnauthorizedAccess, onCloseUnauthorizedAccess, router]);

  if (!isOpenUnauthorizedAccess) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-4">Acceso Denegado </h2>
        <p className="text-gray-700">No tienes autorización para iniciar sesión en esta aplicación.</p>
      </div>
    </div>
  );
};

export default UnauthorizedAccesssModal;