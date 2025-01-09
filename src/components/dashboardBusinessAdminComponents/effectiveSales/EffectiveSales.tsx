"use client"
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { isAfter, format } from "date-fns";
import { discountsList } from "@/api/discountService";
//import { discountsList, DiscountsList } from "@/services/apiCall";
import { FaClock, FaTag } from "react-icons/fa";

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

          //setDescuentosConVentas(updatedDiscounts);
          //setDiscountsWithSalesValues(updatedDiscounts);

          
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
      }
    };

    if (userToken) fetchDiscounts();
  }, [userToken, setDiscountsArrayList]);

  return (
    <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 h-screen">
      <div className="bg-[#FFCF91] rounded-t-lg">
        <h2 className="text-xl lg:text-2xl font-bold text-[#2C2C2C] text-center px-2 py-4 mb-6">
          Total de Ventas
        </h2>
      </div>

      {/* {descuentosConVentas.map((discount, id) => (
        <div
          key={discount._id}
          className="border rounded-lg p-4 shadow-md mb-4"
        >
          <div className="flex items-start">
            <FaTag className="text-orange-600 mr-3 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {id + 1}. {discount.title}
              </h3>
              {discount.expirationDate ? (
                <p className="text-sm text-gray-600 mt-2 flex items-center">
                  <FaClock className="text-gray-500 mr-2" />
                  Válido hasta:{" "}
                  {format(new Date(discount.expirationDate), "d-M-yyyy")}{" "}
                  a las {format(new Date(discount.expirationDate), "HH:mm")} hs.
                </p>
              ) : (
                <p className="text-sm text-gray-600 mt-2">
                  Sin límite de tiempo.
                </p>
              )}
              <p className="text-sm mt-2">
                <strong>Descuentos generados:</strong>{" "}
                {discount.generatedDiscounts}
              </p>
              <p className="text-sm mt-2">
                <strong>Descuentos consumidos:</strong>{" "}
                {discount.usedDiscounts}
              </p>
              <p className="text-sm mt-2">
                <strong>Vistas del descuento:</strong>{" "}
                {discount.discountViews}
              </p>
              <p className="text-sm mt-2">
                <strong>Total de venta en pesos:</strong>{" "}
                $ {discount.valorDeVentas || 0}
              </p>
            </div>
          </div>
        </div>
      ))} */}

      {totalDiscountsSales > 0 && (
        <div className="mt-6">
          <p className="text-lg font-semibold">
            Total acumulado de descuentos vendidos: $ {totalDiscountsSales}
          </p>
        </div>
      )}
    </div>
  );
};

export default EffectiveSales;
