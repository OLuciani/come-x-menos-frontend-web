"use client";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "@/context/Context";
import Link from "next/link";
import Cookies from "js-cookie";

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
  
  Cookies.remove("discountId"); // Esta linea es para eliminar la cookie que se crea cuando se refresca editDiscount
  
 /*  useEffect(() => {
    setSelectedOption("Mi cuenta");
    const cookieUserRole = Cookies.get('userRole') || '';
    setUserRole(cookieUserRole);
  }, [setSelectedOption]);
 */

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
}, [setSelectedOption]);  


  

 /*  useEffect(() => {
    const thereIsUserToken = localStorage.getItem("token");
    const thereIsUserRole = localStorage.getItem("role");
    const thereIsUserId = localStorage.getItem("_id");
    const thereIsUserName = localStorage.getItem("name");

    if (thereIsUserToken) {
      setUserToken(thereIsUserToken);
    }

    if (thereIsUserRole) {
      setNewRole(thereIsUserRole);
    }

    if (thereIsUserId) {
      setUserId(thereIsUserId);
    }

    if (thereIsUserName) {
      setUserName(thereIsUserName);
    }
  }, [setUserToken, setNewRole, setUserId, setUserName]); */

 /*  useEffect(() => {
    if(isLoggedIn) {

      const storedToken = Cookies.get("token") || "";
      console.log("Valor de storedToken: ", storedToken);
  
      const storedRole = Cookies.get("role") || "";
      console.log("Valor de storedRole: ", storedRole);
  
      setToken(storedToken);
      setRole(storedRole);
      //Cookies.remove("token");
      //Cookies.remove("role");
    }
  }, [isLoggedIn]); */

  return (
    <div className="w-screen py-3 /* flex flex-col justify-center items-center */">
      <h1 className="text-2xl pb-3">Mi cuenta</h1>

      <div className="w-full flex flex-col items-center gap-4 md:flex-wrap md:flex-row md:gap-0">
        <div className="md:w-1/2 flex justify-center md:mb-12">
          <div className="w-[300px] h-[155px] pb-3 border-[2px] border-[#FD7B03] rounded-xl flex flex-col">
            <div className="w-full h-[60%]">
              <p className="text-center px-3 mt-3">
                Desde aquí puedes crear y publicar un descuento.
              </p>
            </div>

            <div className="w-full h-[40%] flex justify-center items-center">
              <Link href={"/createDiscount"}>
                <button /* className="w-[180px] bg-[#FD7B03] py-2 rounded-[30px] text-white" */
                  className="w-[230px] h-[50px] bg-[#FFCF91] text-[18px] font-semibold text-white mt-3 rounded-[30px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91]"
                >
                  <div className="flex justify-center">
                    <div className="w-[97%] bg-[#FD7B03] rounded-[30px] py-[3px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
                      Crear descuento
                    </div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:mb-12">
          <div className="w-[300px] h-[155px] pb-3 border-[2px] border-[#FD7B03] rounded-xl flex flex-col">
            <div className="w-full h-[60%]">
              <p className="text-center px-3 mt-3">
                Desde aquí puedes ver tus descuentos vigentes, y también editar o eliminar un descuento.
              </p>
            </div>

            <div className="w-full h-[40%] flex justify-center items-center">
              <Link href={"/myDiscounts"}>
                <button /* className="w-[180px] bg-[#FD7B03] py-2 rounded-[30px] text-white" */
                  className="w-[230px] h-[50px] bg-[#FFCF91] text-[18px] font-semibold text-white mt-3 rounded-[30px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91]"
                >
                  <div className="flex justify-center">
                    <div className="w-[97%] bg-[#FD7B03] rounded-[30px] py-[3px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
                      Mis descuentos
                    </div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:mb-12">
          <div className="w-[300px] h-[155px] pb-3 border-[2px] border-[#FD7B03] rounded-xl flex flex-col">
            <div className="w-full h-[60%]">
              <p className="text-center px-3 mt-3">
                Deseas cambiar o modificar datos de tu cuenta como (foto de
                portada, email, etc.) ?
              </p>
            </div>

            <div className="w-full h-[40%] flex justify-center items-center">
              <Link href={"/editAccount"}>
                <button /* className="w-[180px] bg-[#FD7B03] py-2 rounded-[30px] text-white" */
                  className="w-[230px] h-[50px] bg-[#FFCF91] text-[18px] font-semibold text-white mt-3 rounded-[30px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91]"
                >
                  <div className="flex justify-center">
                    <div className="w-[97%] bg-[#FD7B03] rounded-[30px] py-[3px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
                      Editar cuenta
                    </div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:mb-12">
          <div className="w-[300px] h-[155px] pb-3 border-[2px] border-[#FD7B03] rounded-xl flex flex-col">
            <div className="w-full h-[60%]">
              <p className="text-center px-3 mt-3">
                Desde aquí puedes ver el detalle de los movimientos de tu
                cuenta.
              </p>
            </div>

            <div className="w-full h-[40%] flex justify-center items-center">
              <Link href={"/dashboard"}>
                <button /* className="w-[180px] bg-[#FD7B03] py-2 rounded-[30px] text-white" */
                  className="w-[230px] h-[50px] bg-[#FFCF91] text-[18px] font-semibold text-white mt-3 rounded-[30px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91]"
                >
                  <div className="flex justify-center">
                    <div className="w-[97%] bg-[#FD7B03] rounded-[30px] py-[3px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
                      Dashboard
                    </div>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
