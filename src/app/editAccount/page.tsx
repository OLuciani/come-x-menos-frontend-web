/* import React from 'react';

const EditAccount = () => {
  return (
    <div>
        <h1 className='mt-5 text-3xl text-center font-bold pb-5'>Editar cuenta</h1>
    </div>
  )
}

export default EditAccount; */


/* import React from "react";
import { Krona_One } from "next/font/google";
import FormEditUserAndBusiness from "./form";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

export default function EditUserAndBusinessPage() {
  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-full sm:w-[450px] pb-2 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
        <h1 className={`${krona.className} my-2 text-[34px] text-[#FD7B03] text-center`}>Editar cuenta</h1>
        <div className="items-center justify-center pb-[3%]">
          <FormEditUserAndBusiness />
        </div>
      </div>
    </div>
  );
} */



"use client"
import { Context } from "@/context/Context"; // Importa tu contexto aquí
import React, { useContext } from "react";
import FormEditUserAndBusiness from "./form"; // Ajusta la ruta según tu estructura

export default function EditUserAndBusinessPage() {
  const { userId, businessId } = useContext(Context); // Obtén userId y businessId desde el contexto

  if (!userId || !businessId) {
    // Maneja el caso donde userId o businessId no están disponibles en el contexto
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-full sm:w-[450px] pb-2 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
        <h1 className="my-2 text-[34px] text-[#FD7B03] text-center">Editar cuenta</h1>
        <div className="items-center justify-center pb-[3%]">
        <FormEditUserAndBusiness businessId={businessId} />

        </div>
      </div>
    </div>
  );
}
