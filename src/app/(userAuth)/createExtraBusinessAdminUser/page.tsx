"use client"
import React, { useContext, Suspense } from "react";
import { Krona_One } from "next/font/google";
import CreateExtraBusinessAdminUserForm from "./form";
import Link from "next/link";
//import { Context } from "@/context/Context";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

export default function RegisterExtraBusinessAdminUserPage() {
   //const { setSelectedOption } = useContext(Context);
  return (
    <div className="w-full flex flex-col items-center mt-[2%] box-sizing:border-box">
      <div className="w-full sm:w-[500px] px-8 pb-4 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
        <h1 className="text-center text-2xl custom-w-450:text-3xl font-semibold mt-4 text-[gray]">Creá una cuenta como usuario administrador</h1>
        <div className="items-center justify-center pb-[3%]">
          <Suspense fallback={<div>Cargando formulario...</div>}>
            <CreateExtraBusinessAdminUserForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}