"use client";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { isAfter, format } from "date-fns";
import { discountsList } from "@/api/discountService";
//import { discountsList, DiscountsList } from "@/services/apiCall";
import { FaClock, FaTag } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";

interface ErrorResponse {
  error: string;
}

const EffectiveSales: React.FC = () => {
  const {
    setDiscountsArrayList,
    discountsArrayList,
    isLoggedIn,
    setUserRole,
    setUserName,
    setBusinessName,
    setBusinessType,
    setSelectedOption,
  } = useContext(Context);

  const [userToken, setUserToken] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  //const [descuentosConVentas, setDescuentosConVentas] = useState<DiscountsList[]>([]);
  const [totalDiscountsSales, setTotalDiscountsSales] = useState<number>(0);
  //const [discountsWithSalesValues, setDiscountsWithSalesValues] = useState<DiscountsList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Set cookies and other initial context data
  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    setUserRole(Cookies.get("userRole") || "");
    setUserName(Cookies.get("userName") || "");
    setBusinessName(Cookies.get("businessName") || "");
    setBusinessType(Cookies.get("businessType") || "");

    setSelectedOption("Mi cuenta");
  }, [
    setUserRole,
    setUserName,
    setBusinessName,
    setBusinessType,
    setSelectedOption,
  ]);

  // Fetch discounts and calculate sales
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        if (!userToken) return;

        const response = await discountsList();

        //Si el token expiró va a mostrar un modal informando al usuario
        if (response === "TOKEN_EXPIRED") {
          setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
          return; // Detiene la ejecución para evitar errores con response
        }

        if (response === "Token inválido o expirado en discountList") {
          setIsModalOpen(true);
          return;
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

          const updatedDiscounts = validDiscounts.map((discount) => {
            const priceWithDiscount = Number(discount.priceWithDiscount || 0);
            const usedDiscounts = Number(discount.usedDiscounts || 0);
            const salesValue = priceWithDiscount * usedDiscounts;
            return { ...discount, salesValue };
          });

          const totalSales = updatedDiscounts.reduce(
            (acc, discount) => acc + (discount.salesValue || 0),
            0
          );

          setTotalDiscountsSales(totalSales);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          console.error(
            "Error al obtener descuentos:",
            axiosError.response?.data.error || error.message
          );
        } else {
          console.error("Error desconocido al obtener descuentos:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (userToken) fetchDiscounts();
  }, [userToken, setDiscountsArrayList]);

  return (
    <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 h-screen">
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      <div className="bg-[#FFCF91] rounded-t-lg">
        <h2 className="text-xl lg:text-2xl font-bold text-[#2C2C2C] text-center px-2 py-4 mb-6">
          Total de Ventas
        </h2>
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center mt-[8%]">
          <CircularProgress color="secondary" size={24} className="mr-2" aria-labelledby="Cargando datos" />
          <span className="text-gray-600">Cargando datos...</span>
        </div>
      ) : totalDiscountsSales ? (
        <div className="mt-6">
          <p className="text-lg font-semibold">
            Total acumulado de descuentos vendidos: $ {totalDiscountsSales}
          </p>
        </div>
      ) : (
        <p className="mt-[10%] text-center font-semibold">
          No tienes descuentos vendidos hasta el momento.
        </p>
      )}
    </div>
  );
};

export default EffectiveSales;
