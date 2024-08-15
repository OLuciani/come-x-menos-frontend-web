"use client";
/* import React, { useContext, useState, useEffect } from "react";
import { Context } from "@/context/Context";
import Link from "next/link";
import Cookies from "js-cookie";
import Button from "@/components/button/Button";
import { FaTag, FaEdit, FaUserEdit, FaChartLine } from "react-icons/fa";
import { checkMyAccountPermissions, CheckMyAccountPermissions } from "@/services/apiCall";

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
  const [showMyAccount, setShowMyAccount] = useState<boolean>(false);
  
  //Cookies.remove("discountId"); // Esta linea es para eliminar la cookie que se crea cuando se refresca editDiscount

useEffect(() => {
  console.log("Entra en Mi cuenta");
  
  async function handlePermissions() {
    console.log("Entra en handlePermissions");
    try {
      const result = await checkMyAccountPermissions();
      if (typeof result === 'string') {
        console.log(result);
      } else {
        console.log(result.message);
        if (result.message === "Show myAccount") {
          setShowMyAccount(true);
          setSelectedOption("Mi cuenta");
        }
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  }

  handlePermissions();

  const storedUserToken = Cookies.get("userToken") || "";
  setUserToken(storedUserToken);

  const cookieUserRole = Cookies.get('userRole') || '';
  setUserRole(cookieUserRole);
  
  const cookieUserName = Cookies.get("userName") || "";
  setUserName(cookieUserName);

  const cookieBusinessName = Cookies.get("businessName") || "";
  setBusinessName(cookieBusinessName);

  const cookieBusinessType = Cookies.get("businessType") || "";
  setBusinessType(cookieBusinessType);

  // Siempre establece la opción seleccionada al final
  setSelectedOption("Mi cuenta");

}, [setSelectedOption,
  setUserRole,
  setUserName,
  setBusinessName,

  setBusinessType,]);

  return (
    <div>
      {
        showMyAccount && 
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
      }
    </div>
  );
};

export default MyAccountPage;
 */



import React, { useContext, useState, useEffect } from "react";
import { Context } from "@/context/Context";
import Link from "next/link";
import Cookies from "js-cookie";
import Button from "@/components/button/Button";
import { FaTag, FaEdit, FaUserEdit, FaChartLine } from "react-icons/fa";
import { checkMyAccountPermissions } from "@/services/apiCall";

const MyAccountPage = () => {
  const {
    userToken,
    setUserToken,
    selectedOption,
    setSelectedOption,
    isLoggedIn,
    setUserRole,
    //setUserId,
    setUserName,
    setBusinessName,
    //setBusinessId,
    setBusinessType
  } = useContext(Context);

  
  const [showMyAccount, setShowMyAccount] = useState<boolean>(false);


  useEffect(() => {
    console.log("Entra en Mi cuenta");
    
    /* async function handlePermissions() {
      console.log("Entra en handlePermissions");
      try {
        const result = await checkMyAccountPermissions();
        console.log("Resultado de checkMyAccountPermissions:", result);

        if (typeof result === 'string') {
          console.log("Resultado es string:", result);
        } else {
          console.log("Mensaje del resultado:", result.message);

          if (result.message === "Show myAccount") {
            setShowMyAccount(true);
            setSelectedOption("Mi cuenta");
            console.log("handlePermisions", selectedOption);
          } else {
            console.log("Permiso denegado:", result.message);
          }
        }
      } catch (error: any) {
        console.error("Error en handlePermissions:", error);
      }
    } */

    async function handlePermissions() {
      try {
        const result = await checkMyAccountPermissions();
        if (result?.message === "Show myAccount") {
          setShowMyAccount(true);
          Cookies.set("showMyAccount", "true");
          setSelectedOption("Mi cuenta");
        } else {
          Cookies.set("showMyAccount", "false");
        }
      } catch (error) {
        console.error("Error en handlePermissions:", error);
      }
    }
    
    handlePermissions();

    const storedUserToken = Cookies.get("userToken") || "";
    console.log("Token de usuario almacenado:", storedUserToken);
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get('userRole') || '';
    console.log("Rol de usuario de la cookie:", cookieUserRole);
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    console.log("Nombre de usuario de la cookie:", cookieUserName);
    setUserName(cookieUserName);

    const cookieBusinessName = Cookies.get("businessName") || "";
    console.log("Nombre del negocio de la cookie:", cookieBusinessName);
    setBusinessName(cookieBusinessName);

    const cookieBusinessType = Cookies.get("businessType") || "";
    console.log("Tipo de negocio de la cookie:", cookieBusinessType);
    setBusinessType(cookieBusinessType);
    
   
      setSelectedOption("Mi cuenta");
      
    
    console.log("Segundo useEffect", selectedOption);
    
  }, [
    
   
  ]);

  return (
    <div>
      {showMyAccount && (
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
      )}
    </div>
  );
};

export default MyAccountPage;



