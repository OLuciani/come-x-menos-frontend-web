"use client"
import React, { useState, useContext, useEffect } from "react";
import { discountsList, DiscountsList, usersDiscountsList, UsersDiscountsList } from "@/services/apiCall";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import axios, { all, AxiosError } from "axios";
import { isAfter, format } from "date-fns";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { FaChartLine, FaUsers, FaTags } from "react-icons/fa";

interface ErrorResponse {
  error: string;
}

const Overview: React.FC = () => {
  const { userToken, setUserToken, isLoggedIn, setUserRole, setUserName, setBusinessName, setBusinessType, setSelectedOption } = useContext(Context);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const [totalDiscounts, setTotalDiscounts] = useState<number>(0);
  const [totalConsumedDiscounts, setTotalConsumedDiscounts] = useState<number>(0);
  const [usersDiscountList, setUsersDiscountList] = useState<UsersDiscountsList[]>([]);

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

  const fetchUsersDiscounts = async () => {
    try {
      if (userToken) {
        console.log("Valor de userToken en fetchDiscounts: ", userToken);
        const response = await usersDiscountsList();

        if (response === "Token inválido o expirado en discountList") {
          setIsModalOpen(true); 
        }
        if (typeof response !== "string") {
          setUsersDiscountList(response);
          //console.log("Valor de allUserDiscounts: ", usersDiscountList);

          const allConsumedDiscounts = response.filter(
            (discount) =>
              discount.isUsed == true
          );

          console.log("Valor de allConsumedDiscounts.length: ", allConsumedDiscounts.length);
          setTotalConsumedDiscounts(allConsumedDiscounts.length);
          
        }
      }
    }
      catch {

      }
  }

  useEffect(() => {
    if (userToken) {
      fetchDiscounts();
      fetchUsersDiscounts();
      console.log("Valor de allUserDiscounts: ", usersDiscountList);

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
    <div className="bg-white shadow-lg rounded-lg p-4 lg:py-4 h-full">
      <div className="bg-[#FFCF91] rounded-t-lg">
        <h2 className="text-xl lg:text-2xl font-semibold text-[#2C2C2C] text-center lg:text-l pl-6 py-2 mb-6">Resumen</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Ventas Totales */}
        <div className="flex items-center bg-blue-100 p-4 rounded-lg shadow-md">
          <FaTags className="text-blue-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total de descuentos generados por usuarios.</h3>
            <p className="text-gray-700">{usersDiscountList.length}</p>
          </div>
        </div>
        
        {/* Usuarios Activos */}
        <div className="flex items-center bg-green-100 p-4 rounded-lg shadow-md">
          <FaTags className="text-green-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total de escuentos consumidos por usuarios.</h3>
            <p className="text-gray-700">{totalConsumedDiscounts}</p>
          </div>
        </div>
        
        {/* Descuentos Activos */}
        <div className="flex items-center bg-yellow-100 p-4 rounded-lg shadow-md">
          <FaTags className="text-yellow-500 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total de descuentos publicados por mi empresa activos.</h3>
            <p className="text-gray-700">{totalDiscounts}</p>
          </div>
        </div>
      </div>

      {/* Sección adicional */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Resumen de Actividad</h3>
        <p className="text-gray-700">
          Este es el resumen de la actividad reciente en tu cuenta. Aquí puedes ver las métricas clave y las estadísticas de rendimiento.
        </p>
        {/* Aquí podrías agregar gráficos o tablas adicionales según sea necesario */}
      </div>
    </div>
  );
};

export default Overview;