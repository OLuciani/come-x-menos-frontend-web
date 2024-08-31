/* import React from "react";

const DashboardDiscounts: React.FC = () => {
  // Aquí podrías obtener los descuentos de una API o de un contexto
  const discounts = [
    { id: 1, title: "Descuento en Cafés", details: "10% de descuento en todos los cafés.", image: "/images/cafe.jpg" },
    { id: 2, title: "Descuento en Pasteles", details: "15% de descuento en pasteles.", image: "/images/pastel.jpg" },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Descuentos Vigentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {discounts.map((discount) => (
          <div key={discount.id} className="flex items-center border rounded-lg p-4">
            <img src={discount.image} alt={discount.title} className="w-16 h-16 object-cover rounded mr-4" />
            <div>
              <h3 className="text-xl font-semibold">{discount.title}</h3>
              <p>{discount.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardDiscounts; */



//Funciona perfecto
/* import React, { useState, useContext, useEffect } from "react";
import { discountsList, DiscountsList } from "@/services/apiCall";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { isAfter, format } from "date-fns";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";

interface ErrorResponse {
  error: string;
}

const DashboardDiscounts: React.FC = () => {
  const { userToken, setUserToken, isLoggedIn, setUserRole, setUserName, setBusinessName, setBusinessType, setSelectedOption } = useContext(Context);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para manejar el modal TokenExpiredModal.tsx

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get("userRole") || "";
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    setUserName(cookieUserName);

    const cookieBusinessName = Cookies.get("businessName") || "";
    setBusinessName(cookieBusinessName);

    const cookieBusinessType = Cookies.get("businessType") || "";
    setBusinessType(cookieBusinessType);

    setSelectedOption("Mi cuenta");
  }, [setSelectedOption, setBusinessName, setBusinessType, setUserName, setUserRole]);

  const fetchDiscounts = async () => {
    try {
      if (userToken) {
        console.log("Valor de userToken en fetchDiscounts: ", userToken);
        const response = await discountsList();

        if (response === "Token inválido o expirado en discountList") {
          setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
        }
        if (typeof response !== "string") {
          // Filtramos los descuentos expirados antes de establecer el estado
          const now = new Date();
          const validDiscounts = response.filter(
            (discount) =>
              !discount.validityPeriod ||
              !isAfter(
                now,
                new Date(discount.startDateTime).setDate(
                  new Date(discount.startDateTime).getDate() +
                    discount.validityPeriod
                )
              )
          );
          setDiscountsArrayList(validDiscounts);
        } else {
          console.error("Error al obtener descuentos: ", response);
        }
      } else {
        console.error(
          "No se puede obtener descuentos, falta businessId o userToken"
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage =
          axiosError.response?.data.error ||
          "Error en la solicitud de actualización";
        console.error("Error al obtener descuentos: ", errorMessage);
      } else {
        console.error("Error desconocido al obtener descuentos: ", error);
      }
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchDiscounts();
    }
  }, [userToken]);

  return (
    <>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6 h-full">
        <div className="bg-orange-600">
          <h2 className="text-xl lg:text-2xl font-semibold text-[#FFCF91] text-center lg:text-left pl-6 py-2 mb-6">
            Descuentos vigentes
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {discountsArrayList.map((discount, id) => (
            <div key={discount._id} className="">
              <div className="flex flex-col lg:block">
                <span className="text-[16px] lg:pr-5">
                  <span className="font-semibold">{id + 1})</span> Título: {discount.title}.
                </span>

                {discount.expirationDate 
                 ? <span className="text-[16px] pl-5 lg:pl-0">
                    Válido hasta:{" "}
                    {
                      format(new Date(discount.expirationDate), "d-M-yyyy")}{" "}
                    a las {format(new Date(discount.expirationDate), "HH:mm")} hs.
                  </span>
                 : <span className="text-[16px] pl-5 lg:pl-0">Valido hasta: Sin límite de tiempo.</span>
                }

    
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardDiscounts; */


"use client"
import React, { useState, useContext, useEffect } from "react";
import { discountsList, DiscountsList } from "@/services/apiCall";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { isAfter, format } from "date-fns";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { FaClock, FaTag } from "react-icons/fa";

interface ErrorResponse {
  error: string;
}

const DashboardDiscounts: React.FC = () => {
  const { userToken, setUserToken, isLoggedIn, setUserRole, setUserName, setBusinessName, setBusinessType, setSelectedOption } = useContext(Context);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const [totalDiscounts, setTotalDiscounts] = useState<number>(0);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get("userRole") || "";
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    setUserName(cookieUserName);

    const cookieBusinessName = Cookies.get("businessName") || "";
    setBusinessName(cookieBusinessName);

    const cookieBusinessType = Cookies.get("businessType") || "";
    setBusinessType(cookieBusinessType);

    setSelectedOption("Mi cuenta");
  }, [setSelectedOption, setBusinessName, setBusinessType, setUserName, setUserRole]);

  const fetchDiscounts = async () => {
    try {
      if (userToken) {
        console.log("Valor de userToken en fetchDiscounts: ", userToken);
        const response = await discountsList();

        if (response === "Token inválido o expirado en discountList") {
          setIsModalOpen(true); 
        }
        if (typeof response !== "string") {
          const now = new Date();
          const validDiscounts = response.filter(
            (discount) =>
              !discount.validityPeriod ||
              !isAfter(
                now,
                new Date(discount.startDateTime).setDate(
                  new Date(discount.startDateTime).getDate() +
                    discount.validityPeriod
                )
              )
          );
          setDiscountsArrayList(validDiscounts);
        } else {
          console.error("Error al obtener descuentos: ", response);
        }
      } else {
        console.error(
          "No se puede obtener descuentos, falta businessId o userToken"
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage =
          axiosError.response?.data.error ||
          "Error en la solicitud de actualización";
        console.error("Error al obtener descuentos: ", errorMessage);
      } else {
        console.error("Error desconocido al obtener descuentos: ", error);
      }
    } 
  };

  useEffect(() => {
    if (userToken) {
      fetchDiscounts();
    }
  }, [userToken]);

  useEffect(() => {
    if (discountsArrayList.length > 0) {
      setTotalDiscounts(discountsArrayList.length);
    } else {
      setTotalDiscounts(0); // En caso de que no haya descuentos, asegurarse de que totalDiscounts sea 0.
    }
  }, [discountsArrayList, setTotalDiscounts]);
  

  return (
    <>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="bg-white shadow-lg rounded-lg p-4 lg:p-6 h-full">
        <div className="bg-orange-600 rounded-t-lg">
          <h2 className="text-xl lg:text-2xl font-semibold text-[#FFCF91] text-center lg:text-left pl-6 py-3 mb-4">
            Descuentos vigentes ( {totalDiscounts} )
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {discountsArrayList.map((discount, id) => (
            <div key={discount._id} className="bg-gray-50 border rounded-lg p-4 shadow-md">
              <div className="flex items-start">
                <FaTag className="text-orange-600 mr-3 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {id + 1}. {discount.title}
                  </h3>
                  {discount.expirationDate ? (
                    <p className="text-sm text-gray-600 mt-2 flex items-center">
                      <FaClock className="text-gray-500 mr-2" />
                      Válido hasta: {format(new Date(discount.expirationDate), "d-M-yyyy")}{" "}
                      a las {format(new Date(discount.expirationDate), "HH:mm")} hs.
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600 mt-2">
                      Valido hasta: Sin límite de tiempo.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardDiscounts;
