"use client";
import React, { useState, useContext, useEffect } from "react";
import { discountsList } from "@/api/discountService";
import { UsersDiscountsList } from "@/types/apiCallTypes";
import { DiscountsList } from "@/types/discountTypes";
//import { discountsList, DiscountsList, usersDiscountsList, UsersDiscountsList } from "@/services/apiCall";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import axios, { all, AxiosError } from "axios";
import { isAfter, format } from "date-fns";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { FaChartLine, FaUsers, FaTags } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

interface ErrorResponse {
  error: string;
}

const Overview: React.FC = () => {
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
  const [totalPublishedDiscounts, setTotalPublishedDiscounts] =
    useState<number>(0);
  const [totalConsumedDiscounts, setTotalConsumedDiscounts] =
    useState<number>(0);
  const [totalGeneratedDiscounts, setTotalGeneratedDiscounts] =
    useState<number>(0);
  const [usersDiscountList, setUsersDiscountList] = useState<
    UsersDiscountsList[]
  >([]);
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
          setDiscountsArrayList(validDiscounts);
          setTotalPublishedDiscounts(validDiscounts.length);
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
      //fetchUsersDiscounts();
      console.log("Valor de allUserDiscounts: ", usersDiscountList);
    }
  }, [userToken]);

  useEffect(() => {
    if (discountsArrayList.length > 0) {
      //setTotalDiscounts(discountsArrayList.length);
      const allGeneratedDiscounts: number = discountsArrayList.reduce(
        (acc, discount) => acc + discount.generatedDiscounts,
        0 // Valor inicial del acumulador
      );
      setTotalGeneratedDiscounts(allGeneratedDiscounts);

      const allConsumeddDiscounts: number = discountsArrayList.reduce(
        (acc, discount) => acc + discount.usedDiscounts,
        0 // Valor inicial del acumulador
      );
      setTotalConsumedDiscounts(allConsumeddDiscounts);
    } /* else {
      setTotalDiscounts(0); // En caso de que no haya descuentos, asegurarse de que totalDiscounts sea 0.
    } */
  }, [
    discountsArrayList,
    setTotalGeneratedDiscounts,
    setTotalConsumedDiscounts,
  ]);

  return (
    <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 h-full">
      <div className="bg-[#FFCF91] rounded-t-lg">
        <h2 className="text-xl lg:text-2xl font-bold text-[#2C2C2C] text-center px-2 py-2 mb-6">
          Resumen
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Descuentos Activos */}
        <div className="flex-col items-center bg-yellow-100 p-4 rounded-lg shadow-md relative">
          <div className="flex justify-center mb-3">
            <FaTags className="text-yellow-500 text-3xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">
              Total de descuentos activos publicados por mi empresa.
            </h3>
            <div className="w-full h-10 flex justify-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center absolute bottom-4">
                {loading ? (
                  <div className="w-full flex justify-center items-center">
                    <CircularProgress
                      color="secondary"
                      size={24}
                      className="mr-2"
                    />
                    {/* <span className="text-gray-600">Cargando datos...</span> */}
                  </div>
                ) : (
                  <p className="text-lg font-bold">{totalPublishedDiscounts}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ventas Totales */}
        <div className="flex-col items-center bg-blue-100 p-4 rounded-lg shadow-md relative">
          <div className="flex justify-center mb-3">
            <FaTags className="text-blue-500 text-3xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">
              Total de descuentos generados por usuarios.
            </h3>
            <div className="w-full h-10 flex justify-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center absolute bottom-4">
                {loading ? (
                  <div className="w-full flex justify-center items-center">
                    <CircularProgress
                      color="secondary"
                      size={24}
                      className="mr-2"
                    />
                    {/* <span className="text-gray-600">Cargando datos...</span> */}
                  </div>
                ) : (
                  <p className="text-lg font-bold">{totalGeneratedDiscounts}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Usuarios Activos */}
        <div className="flex-col items-center bg-green-100 p-4 rounded-lg shadow-md relative">
          <div className="flex justify-center mb-3">
            <FaTags className="text-green-500 text-3xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">
              Total de descuentos consumidos por usuarios.
            </h3>
            <div className="w-full h-10 flex justify-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center absolute bottom-4">
                {loading ? (
                  <div className="w-full flex justify-center items-center">
                    <CircularProgress
                      color="secondary"
                      size={24}
                      className="mr-2"
                    />
                    {/* <span className="text-gray-600">Cargando datos...</span> */}
                  </div>
                ) : (
                  <p className="text-lg font-bold">{totalConsumedDiscounts}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección adicional */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">Resumen de Actividad:</h3>
        <p className="text-gray-700">
          Este es el resumen de la actividad reciente en tu cuenta. Aquí puedes
          ver las métricas claves y las estadísticas de rendimiento.
        </p>
      </div>
    </div>
  );
};

export default Overview;
