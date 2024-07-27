"use client"
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Context } from '@/context/Context';
import { deleteDiscount } from '@/services/apiCall';
import Cookies from "js-cookie";

export default function DeleteDiscountButton() {
  const { discountId, setSelectedOption, isLoggedIn, discountRecovered, setDiscountId, setUserRole, setUserId, setUserName, setBusinessName, setBusinessId, setBusinessType } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userToken, setUserToken] = useState<string>("");
  const navigation = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);

    }
  }, [isLoggedIn]); 

  useEffect(() => {
    if (discountRecovered !== null) {
      console.log("Setting discount from discountRecovered", discountRecovered);
      //setDiscount(discountRecovered);

      const cookieDiscountId = Cookies.get("discountId") || "";
        setDiscountId(cookieDiscountId);
    }
  }, [discountRecovered, setDiscountId]);
  

  //A este useEffect lo creé para cuando se refresca la vista de este componente
  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get('userRole') || '';
    setUserRole(cookieUserRole); 

    const cookieUserId = Cookies.get("userId") || "";
    setUserId(cookieUserId);

    const cookieUserName = Cookies.get("userName") || "";
    setUserName(cookieUserName);

    const cookieBusinessName = Cookies.get("businessName") || "";
    setBusinessName(cookieBusinessName);

    const cookieBusinessId = Cookies.get("businessId") || "";
    setBusinessId(cookieBusinessId);

    const cookieBusinessType = Cookies.get("businessType") || "";
    setBusinessType(cookieBusinessType);

    const cookieDiscountId = Cookies.get("discountId") || "";
    setDiscountId(cookieDiscountId);

   setSelectedOption("Mi cuenta");

}, [setUserToken,
    setUserRole,
    setUserId,
    setUserName,
    setBusinessName,
    setBusinessId,
    setBusinessType,
    setDiscountId,
    setSelectedOption
    ]);   

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    setError(undefined);
    setIsLoading(true);
    try {
      const response = await deleteDiscount(discountId, userToken);
      console.log("Valor que devuelve response al eliminar el descuento: ", response);
      
      if (typeof response === "string") {
        console.log("Valor que devuelve response dentro del if al eliminar el descuento: ", response);
        setError(response);
      } else if (response.success) {
        console.log("Valor de responese.success en el else: ", response.success);
        setError('');
        navigation.push('/myDiscounts'); // Redirige a la vista de Mis descuentos.
        setSelectedOption("Mi cuenta");
      } else {
        setError(response.message || 'Error al eliminar el descuento');
      }
    } catch (err: any) {
      setError('Network error or server is unreachable');
    } finally {
      setIsLoading(false);
      closeModal(); // Cerramos el modal después de eliminar el descuento
    }
  };

  const confirmDelete = () => {
    handleDelete();
  };

  return (
    <div className=" flex justify-center">
      <div className="w-full px-6 sm:w-[500px] sm:px-0 mt-[15%]">
        <div className="flex flex-col items-center mx-auto gap-6">
          <button
            onClick={openModal}
            className="w-full bg-[#FFCF91] text-[18px] text-white font-semibold mt-3 h-[60px] rounded-[30px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91]"
            disabled={isLoading}
          >
            <div className="flex justify-center">
              <div className="w-[98%] bg-[#FD7B03] rounded-[30px] py-[7px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
                {isLoading ? 'Cargando...' : 'Eliminar Descuento'}
              </div>
            </div>
          </button>
          {error && (
            <p className="text-center mb-2 text-red-700 font-semibold">{error}</p>
          )}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white rounded-lg w-[85%] h-[300px] sm:w-[50%] sm:h-[50%] mx-auto text-center flex flex-col justify-evenly">
                <p className="text-lg font-semibold ">
                  ¿Estás seguro que deseas eliminar este descuento?
                </p>
                <div className="flex justify-center gap-4 px-2">
                  <button
                    onClick={confirmDelete}
                    className="w-[120px] bg-[#FFCF91] text-[18px] text-white font-semibold h-[40px] rounded-[20px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91]"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Cargando...' : 'Eliminar'}
                  </button>
                  <button
                    onClick={closeModal}
                    className="w-[120px] bg-gray-300 text-[18px] text-gray-700 font-semibold h-[40px] rounded-[20px] border-[5px] border-gray-400 transition-colors duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900 hover:border-gray-900"
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
  );
}


