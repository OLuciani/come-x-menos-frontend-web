"use client";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "@/context/Context";
import Link from "next/link";
import Cookies from "js-cookie";
import Button from "@/components/button/Button";
import { FaTag, FaEdit, FaUserEdit, FaChartLine } from "react-icons/fa";

const MyAccountPage = () => {
  const {
    setSelectedOption,
    isLoggedIn,
    setUserRole,
    setUserId,
    setUserName,
    setBusinessName,
    setBusinessId,
    setBusinessType
  } = useContext(Context);
  const [userToken, setUserToken] = useState<string>("");
  
  //Cookies.remove("discountId"); // Esta linea es para eliminar la cookie que se crea cuando se refresca editDiscount
  
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
  
  setSelectedOption("Mi cuenta");
}, [setSelectedOption, setBusinessId, setBusinessName, setBusinessType, setUserId, setUserName, setUserRole]);  

  /* return (
    <div className="w-screen md:flex md:justify-center md:pt-[4%]">
      <div className="w-full md:w-[800px] flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-0 py-5 md:py-0">
        <div className="md:w-1/2 flex justify-center md:mb-12">
          <div className="w-[300px] h-[165px] pb-3 border-[1px] border-[gray] rounded-xl flex flex-col">
            <div className="w-full h-[60%]">
              <p className="text-center px-3 mt-3">
                Desde aquí puedes crear y publicar un descuento.
              </p>
            </div>

            <div className="w-full h-[40%] flex justify-center items-center cursor-pointer">
              <Link href={"/createDiscount"}>
                <div className="w-[230px] h-[50px] mb-2">
                  <Button buttonText="Crear descuento"  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:mb-12">
          <div className="w-[300px] h-[165px] pb-3 border-[1px] border-[gray] rounded-xl flex flex-col">
            <div className="w-full h-[60%]">
              <p className="text-center px-3 mt-3">
                Desde aquí puedes ver tus descuentos vigentes, y también editar o eliminar un descuento.
              </p>
            </div>

            <div className="w-full h-[40%] flex justify-center items-center cursor-pointer">
              <Link href={"/myDiscounts"}>
                <div className="w-[230px] h-[50px] mb-2">
                  <Button buttonText="Mis descuentos"  /> 
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:mb-12">
          <div className="w-[300px] h-[165px] pb-3 border-[1px] border-[gray] rounded-xl flex flex-col">
            <div className="w-full h-[60%]">
              <p className="text-center px-3 mt-3">
                Deseas cambiar o modificar datos de tu cuenta como (foto de
                portada, email, etc.) ?
              </p>
            </div>

            <div className="w-full h-[40%] flex justify-center items-center cursor-pointer">
              <Link href={"/editAccount"}>            
                <div className="w-[230px] h-[50px] mb-2">
                  <Button buttonText="Editar cuenta"  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:mb-12">
          <div className="w-[300px] h-[165px] pb-3 border-[1px] border-[gray] rounded-xl flex flex-col">
            <div className="w-full h-[60%]">
              <p className="text-center px-3 mt-3">
                Desde aquí puedes ver el detalle de los movimientos de tu
                cuenta.
              </p>
            </div>

            <div className="w-full h-[40%] flex justify-center items-center cursor-pointer">
              <Link href={"/dashboard"}>
                <div className="w-[230px] h-[50px] mb-2">
                  <Button buttonText="Dashboard"  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); */

  return (
    <div className="w-screen md:flex md:justify-center md:pt-[4%]">
      <div className="w-full md:w-[800px] flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-0 py-5 md:py-0">
        <Link href={"/createDiscount"} className="md:w-1/2 flex justify-center md:mb-12">
          <div className="w-[300px] h-[165px] p-4 border-[1px] border-gray-300 rounded-xl flex flex-col justify-center items-center transition-transform transform hover:scale-105 cursor-pointer">
            <FaTag className="text-[#FD7B03] text-3xl mb-3" />
            <p className="text-center">
              Crear y publicar un descuento.
            </p>
          </div>
        </Link>
  
        <Link href={"/myDiscounts"} className="md:w-1/2 flex justify-center md:mb-12">
          <div className="w-[300px] h-[165px] p-4 border-[1px] border-gray-300 rounded-xl flex flex-col justify-center items-center transition-transform transform hover:scale-105 cursor-pointer">
            <FaEdit className="text-[#FD7B03] text-3xl mb-3" />
            <p className="text-center">
              Ver y gestionar tus descuentos.
            </p>
          </div>
        </Link>
  
        <Link href={"/editAccount"} className="md:w-1/2 flex justify-center md:mb-12">
          <div className="w-[300px] h-[165px] p-4 border-[1px] border-gray-300 rounded-xl flex flex-col justify-center items-center transition-transform transform hover:scale-105 cursor-pointer">
            <FaUserEdit className="text-[#FD7B03] text-3xl mb-3" />
            <p className="text-center">
              Editar datos de tu cuenta.
            </p>
          </div>
        </Link>
  
        <Link href={"/dashboard"} className="md:w-1/2 flex justify-center md:mb-12">
          <div className="w-[300px] h-[165px] p-4 border-[1px] border-gray-300 rounded-xl flex flex-col justify-center items-center transition-transform transform hover:scale-105 cursor-pointer">
            <FaChartLine className="text-[#FD7B03] text-3xl mb-3" />
            <p className="text-center">
              Ver detalles de movimientos.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyAccountPage;




