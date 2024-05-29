/* "use client"
import React, { useContext, useEffect } from "react";
import { Context } from "@/context/Context";


const CreateDiscountPage = () => {
  const { userId, setUserId, newRole, setNewRole, userToken, setUserToken, setUserName } =
  useContext(Context);
  useEffect(() => {
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
  }, []);

  return (
    <div>
        <h1>Crear un descuento</h1>
    </div>
  )
}

export default CreateDiscountPage; */



import React from "react";
import { Krona_One } from "next/font/google";
import FormCreateDiscount from "./form";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

export default function CreateDiscountPage() {
  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-full sm:w-[500px] px-8 py-8 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
        <h1 className={`${krona.className} my-2 text-[34px] text-[#FD7B03] text-center`}>Crear un descuento</h1>
        {/* <h2 className="text-center text-2xl font-semibold mt-4 text-[#FD7B03]">Registrarse</h2> */}
        <div className="items-center justify-center pb-[3%]">
          <FormCreateDiscount />
        </div>
      </div>
    </div>
  );
}