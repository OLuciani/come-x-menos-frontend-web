"use client"
import { Context } from "@/context/Context"; // Importa tu contexto aquí
import React, { useContext } from "react";
import FormEditUserAndBusiness from "./form"; // Ajusta la ruta según tu estructura
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa';

export default function EditUserAndBusinessPage() {
  const { userId, businessId, setSelectedOption } = useContext(Context);

  return (
    <div className="w-screen flex flex-col items-center">
      <div className="w-screen mt-10 ml-10 md:ml-20">
        <Link
          href={"/dashboardBusinessAdmin"}
          onClick={() => setSelectedOption("Mi cuenta")}
        >
          <FaArrowLeft size={20} color="black" />
        </Link>
      </div>
      <div className="w-full sm:w-[450px] pb-2 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
        <h1 className="my-5 text-2xl custom-w-450:text-3xl text-[gray] text-center">Editar cuenta</h1>
        <div className="items-center justify-center pb-[3%]">
        <FormEditUserAndBusiness businessId={businessId} />

        </div>
      </div>
    </div>
  );
}
