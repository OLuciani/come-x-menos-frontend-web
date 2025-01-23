"use client";
import React, { useState, useContext, useEffect } from "react";
import { discountsList } from "@/api/discountService";
import { DiscountsList } from "@/types/discountTypes";
//import { discountsList, DiscountsList } from "@/services/apiCall";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { isAfter, format } from "date-fns";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { FaClock, FaTag } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

interface ErrorResponse {
  error: string;
}

const ActiveDiscountsOverview: React.FC = () => {
  const {
    userToken,
    setUserToken,
    isLoggedIn,
    setUserRole,
    setUserName,
    setBusinessName,
    setBusinessType,
    setSelectedOption,
  } = useContext(Context);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalDiscounts, setTotalDiscounts] = useState<number>(0);
  const [totalGeneratedThisDiscount, setTotalGeneratedThisDiscount] =
    useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

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
  }, [
    setSelectedOption,
    setBusinessName,
    setBusinessType,
    setUserName,
    setUserRole,
  ]);

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

          const updatedDiscounts = validDiscounts.map((discount) => {
            const priceWithDiscount = Number(discount.priceWithDiscount || 0);
            const usedDiscounts = Number(discount.usedDiscounts || 0);
            const salesValue = priceWithDiscount * usedDiscounts;
            return { ...discount, salesValue };
          });

          setDiscountsArrayList(updatedDiscounts);

          //setDiscountsArrayList(validDiscounts);
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
    } finally {
      setLoading(false);
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

      <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 h-full">
        <div className="bg-[#FFCF91] rounded-t-lg">
          <h2 className="text-xl lg:text-2xl font-bold text-[#2C2C2C] text-center px-2 py-3 mb-4">
            Descuentos activos ( {totalDiscounts} )
          </h2>
        </div>

        {loading ? (
          <div className="w-full flex justify-center items-center mt-[8%]">
            <CircularProgress color="secondary" size={24} className="mr-2" />
            <span className="text-gray-600">Cargando datos...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {discountsArrayList.map((discount, id) => (
              <div
                key={discount._id}
                className="border rounded-lg p-4 shadow-md"
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
                        {format(
                          new Date(discount.expirationDate),
                          "d-M-yyyy"
                        )}{" "}
                        a las{" "}
                        {format(new Date(discount.expirationDate), "HH:mm")} hs.
                      </p>
                    ) : (
                      <>
                        <span className="text-sm font-semibold mt-2">
                          Valido hasta:{" "}
                        </span>
                        <span className="text-sm text-gray-600 mt-2">
                          Sin límite de tiempo.
                        </span>
                      </>
                    )}

                    <div>
                      <span className="text-sm font-semibold mt-2">
                        Descuentos Generados:{" "}
                      </span>
                      <span className="text-sm text-gray-600 mt-2">
                        {discount.generatedDiscounts}
                      </span>
                    </div>

                    <div>
                      <span className="text-sm font-semibold mt-2">
                        Descuentos Consumidos:{" "}
                      </span>
                      <span className="text-sm text-gray-600 mt-2">
                        {discount.usedDiscounts}
                      </span>
                    </div>

                    <div>
                      <span className="text-sm font-semibold mt-2">
                        Vistas del descuento:{" "}
                      </span>
                      <span className="text-sm text-gray-600 mt-2">
                        {discount.discountViews}
                      </span>
                    </div>

                    <div>
                      <span className="text-sm font-semibold mt-2">
                        Total de ventas en pesos:{" "}
                      </span>
                      <span className="text-sm text-gray-600 mt-2">
                        {" "}
                        $ {discount.salesValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ActiveDiscountsOverview;
