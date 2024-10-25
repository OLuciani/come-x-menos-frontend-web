"use client"
import React, { useContext, Suspense } from "react";
import { Krona_One } from "next/font/google";
import CreateUserQrScanerForm from "./form";
import Link from "next/link";
//import { Context } from "@/context/Context";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

export default function RegisterUserQrScannerPage() {
   //const { setSelectedOption } = useContext(Context);
  return (
    <div className="w-full flex flex-col items-center mt-[2%] box-sizing:border-box">
      <div className="w-full sm:w-[500px] px-8 pb-4 rounded-t-[40px] max-md:top-0 max-md:rounded-none max-md:h-auto">
        <h1 className="text-center text-2xl custom-w-450:text-3xl font-semibold mt-4 text-[gray]">Creá una cuenta</h1>
        <div className="items-center justify-center pb-[3%]">
          <Suspense fallback={<div>Cargando formulario...</div>}>
            <CreateUserQrScanerForm />
          </Suspense>
        </div>

        {/* <p className="text-center my-5 text-sm font-medium">
        ¿Ya tienes una cuenta? {" "}
        <span className="text-sm text-blue-500 hover:text-blue-700 transition duration-200 cursor-pointer ml-2" onClick={() => setSelectedOption("Iniciar sesión")}>
            <Link href="/login">Iniciar sesión</Link>
        </span>
        </p> */}
      </div>
    </div>
  );
}