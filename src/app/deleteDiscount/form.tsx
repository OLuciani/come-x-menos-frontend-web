"use client"
/* import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { deleteDiscount } from "@/services/apiCall";
import { Context } from "@/context/Context";
import Input from "@/components/InputAuth/Input";

export default function DeleteDiscountForm() {
  const {
    userToken,
  } = useContext(Context);
  const [discountId, setDiscountId] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useRouter();

  const handleDelete = async () => {
    setError(undefined);
    setIsLoading(true);

    try {
      const response = await deleteDiscount(discountId, userToken);
      if (typeof response === "object" && response.success) {
        setError("");
        setTimeout(() => {
          navigation.push("/myDiscounts"); // Redirige a la vista de Mis descuentos.
        }, 2000);
      } else {
        setError(response);
      }
    } catch (err: any) {
      setError("Network error or server is unreachable");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full px-6 sm:w-[500px] sm:px-0">
        <form className="flex flex-col items-center mx-auto gap-6" onSubmit={(e) => { e.preventDefault(); handleDelete(); }}>
          <Input
            label=""
            placeholder="Ingresa el ID del descuento"
            type="hidden"
            name="discountId"
            value={discountId}
            onChange={(e) => setDiscountId(e.target.value)}
            minLength={1}
          />
          {error && (
            <p className="text-center mb-2 text-red-700 font-semibold">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#FFCF91] text-[18px] text-white font-semibold mt-3 h-[60px] rounded-[30px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91]"
            disabled={isLoading}
          >
            <div className="flex justify-center">
              <div className="w-[98%] bg-[#FD7B03] rounded-[30px] py-[7px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
                {isLoading ? "Cargando..." : "Eliminar Descuento"}
              </div>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
} */



/* import React, { useState, useContext } from 'react';
import Input from '@/components/InputAuth/Input';
import { useRouter } from 'next/navigation';
//import { useFormik } from 'formik';
//import * as Yup from 'yup';
import { deleteDiscount } from '@/services/apiCall';
import { Context } from '@/context/Context';

export default function DeleteDiscountForm() {
  const { userToken, discountId } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useRouter();

  

      try {
        const response = await deleteDiscount(discountId, userToken);
        if (typeof response === "string") {
          setError(response);
        } else if (response.success) {
          setError('');
          setTimeout(() => {
            navigation.push('/myDiscounts'); // Redirige a la vista de Mis descuentos.
          }, 2000);
        } else {
          setError(response.message);
        }
      } catch (err: any) {
        setError('Network error or server is unreachable');
      } finally {
        setIsLoading(false);
      }

 

  return (
    <div className="w-sreen flex justify-center">
      <div className="w-full px-6 sm:w-[500px] sm:px-0">
        <form className="flex flex-col items-center mx-auto gap-6" onSubmit={}>
          <button
            type="submit"
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
        </form>
      </div>
    </div>
  );
} */



/* import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { deleteDiscount } from '@/services/apiCall';
import { Context } from '@/context/Context';

export default function DeleteDiscountButton() {
  const { userToken, discountId } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useRouter();

  const handleDelete = async () => {
    setError(undefined);
    setIsLoading(true);
    try {
      const response = await deleteDiscount(discountId, userToken);
      if (typeof response === "string") {
        setError(response);
      } else if (response.success) {
        setError('');
        setTimeout(() => {
          navigation.push('/myDiscounts'); // Redirige a la vista de Mis descuentos.
        }, 2000);
      } else {
        setError(response.message);
      }
    } catch (err: any) {
      setError('Network error or server is unreachable');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen flex justify-center">
      <div className="w-full px-6 sm:w-[500px] sm:px-0">
        <div className="flex flex-col items-center mx-auto gap-6">
          <button
            onClick={handleDelete}
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
        </div>
      </div>
    </div>
  );
} */



/* import React, { useState, useContext } from 'react';
import { useRouter } from "next/navigation";
import { Context } from '@/context/Context';
import { deleteDiscount } from '@/services/apiCall';

export default function DeleteDiscountButton() {
  const { userToken, discountId } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigation = useRouter();

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
      console.log("Valor que devuelve response fuera del if al eliminar el descuento: ", response);
      if (typeof response === "string") {
        console.log("Valor que devuelve response dentro del if al eliminar el descuento: ", response);
        setError(response);
      } else if (response.success) {
        setError('');
        setTimeout(() => {
          navigation.push('/myDiscounts'); // Redirige a la vista de Mis descuentos.
        }, 2000);
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
              <div className="bg-white rounded-lg p-6 w-[300px] md:w-[450px] mx-auto">
                <p className="text-lg font-semibold mb-4">
                  ¿Estás seguro que deseas eliminar este descuento?
                </p>
                <div className="flex justify-center gap-4">
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
} */



import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Context } from '@/context/Context';
import { deleteDiscount } from '@/services/apiCall';

export default function DeleteDiscountButton() {
  const { userToken, discountId, setSelectedOption } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigation = useRouter();

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


