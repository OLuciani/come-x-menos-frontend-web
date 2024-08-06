"use client"
import { Krona_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import LoginForm from "./form";
import { Context } from "@/context/Context";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });
const LoginPage = () => {
  const { setSelectedOption } = useContext(Context);
  return (
    <div className="w-screen h-full flex justify-center items-center">
        <div>
          <h1 className="font-semibold text-2xl custom-w-450:text-3xl text-center text-[gray] mt-10 md:mt-[3%]">  
          Iniciar sesión
          </h1>
          <LoginForm />
          <p className="text-center my-5 text-sm font-medium">
          ¿No eres miembro? {" "}
          <span className="text-sm text-blue-500 cursor-pointer ml-2" onClick={() => setSelectedOption("Crear cuenta")}>
              <Link href="/register">Crea una cuenta</Link>
          </span>
          </p>
        </div>
    </div>
  );
};

export default LoginPage;



/* import { Krona_One } from "next/font/google";
import Link from "next/link";
import React, { useContext } from "react";
import LoginForm from "./form";
import { Context } from "@/context/Context";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });

const LoginPage = () => {
  const { setSelectedOption } = useContext(Context);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-4 sm:py-6">
      <h1 className="font-semibold text-2xl text-center text-gray-600 mt-4 sm:mt-8">
        Iniciar sesión
      </h1>
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md mt-4 sm:mt-6">
        <LoginForm />
        <p className="text-center my-5 text-sm text-gray-700">
          ¿No tienes una cuenta?{" "}
          <Link href="/register">
            <span
              onClick={() => setSelectedOption("Registrarse")}
              className="text-blue-700 mx-1 cursor-pointer"
            >
              Regístrate
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage; */
