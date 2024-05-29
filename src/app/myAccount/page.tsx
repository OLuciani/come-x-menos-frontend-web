"use client"
import React, { useContext, useEffect } from "react";
import { Context } from "@/context/Context";
import Link from "next/link";

const MyAccountPage = () => {
  const { userId, setUserId, newRole, setNewRole, userToken, setUserToken, setUserName } =
  useContext(Context);
 /*  useEffect(() => {
    const thereIsUserToken = localStorage.getItem("token");
    const thereIsUserRole = localStorage.getItem("role");
    const thereIsUserId = localStorage.getItem("_id");
    const thereIsUserName = localStorage.getItem("name");

    if (thereIsUserToken) {
      setUserToken(thereIsUserToken);
    }

    if (thereIsUserRole ) {
      setNewRole(thereIsUserRole);
    }

    if(thereIsUserId) {
      setUserId(thereIsUserId);
    }  

    if(thereIsUserName) {
      setUserName(thereIsUserName);
    }
  }, [setUserToken, setNewRole, setUserId, setUserName]); */
  
  return (
    <div className='w-screen py-3 /* flex flex-col justify-center items-center */'>
        <h1 className='text-2xl pb-3'>Mi cuenta</h1>

        <div className="w-full flex flex-col items-center gap-4 md:flex-wrap md:flex-row md:gap-0">
        <Link href={"/createDiscount"} className="md:w-1/2 flex justify-center md:mb-12">
            <div className="w-[300px] h-[150px] border-[2px] border-[#FD7B03] rounded-xl flex flex-col">
              <div className="w-full h-[60%]">
                <p className="text-center px-3 mt-3">Desde aquí puedes crear y publicar un descuento.</p>
              </div>

              <div className="w-full h-[40%] flex justify-center items-center">
                <button className="w-[180px] bg-[#FD7B03] py-2 rounded-[30px] text-white">Crear descuento</button>
              </div>
            </div>
          </Link>

          <Link href={"/myDiscounts"} className="md:w-1/2 flex justify-center md:mb-12">
            <div className="w-[300px] h-[150px] border-[2px] border-[#FD7B03] rounded-xl flex flex-col">
              <div className="w-full h-[60%]">
                <p className="text-center px-3 mt-3">Quieres ver, editar, o eliminar un descuento ?</p>
              </div>

              <div className="w-full h-[40%] flex justify-center items-center">
                <button className="w-[180px] bg-[#FD7B03] py-2 rounded-[30px] text-white">Mis descuentos</button>
              </div>
            </div>
          </Link>

          <Link href={"/editAccount"} className="md:w-1/2 flex justify-center md:mb-12">
            <div className="w-[300px] h-[150px] border-[2px] border-[#FD7B03] rounded-xl flex flex-col">
              <div className="w-full h-[60%]">
                <p className="text-left px-3 mt-3">Deseas cambiar o modificar datos de tu cuenta como (foto de portada, email, etc.) ?</p>
              </div>

              <div className="w-full h-[40%] flex justify-center items-center">
                <button className="w-[180px] bg-[#FD7B03] py-2 rounded-[30px] text-white">Editar cuenta</button>
              </div>
            </div>
          </Link>

          <Link href={"/dashboard"} className="md:w-1/2 flex justify-center md:mb-12">
            <div className="w-[300px] h-[150px] border-[2px] border-[#FD7B03] rounded-xl flex flex-col">
              <div className="w-full h-[60%]">
                <p className="text-center px-3 mt-3">Quieres ver, editar, o eliminar un descuento ?</p>
              </div>

              <div className="w-full h-[40%] flex justify-center items-center">
                <button className="w-[180px] bg-[#FD7B03] py-2 rounded-[30px] text-white">Dashboard</button>
              </div>
            </div>
          </Link>
        </div>
        
    </div>
  )
}

export default MyAccountPage;