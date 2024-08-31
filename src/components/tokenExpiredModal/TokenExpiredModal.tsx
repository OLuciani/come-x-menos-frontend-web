"use client"
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

interface SessionExpiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TokenExpiredModal: React.FC<SessionExpiredModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
        router.push('/login');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-semibold mb-4">Sesión Expirada</h2>
        <p className="text-gray-700">Tu sesión ha expirado o tu token es inválido. Serás redirigido al inicio de sesión.</p>
      </div>
    </div>
  );
};

export default TokenExpiredModal;
