"use client"
import { Krona_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import LoginForm from "./form";
import { Context } from "@/context/Context";

// Cargar la fuente Krona One desde Google Fonts
const krona = Krona_One({ weight: "400", subsets: ["latin"] });

// Componente que representa la página de inicio de sesión
const LoginPage = () => {
  // Consumimos setSelectedOption del Contexto global
  const { setSelectedOption } = useContext(Context);
  return (
    <div className="w-screen h-full flex justify-center items-center">
        <div>
          <h1 className="font-semibold text-2xl custom-w-450:text-3xl text-center text-[gray] mt-10 md:mt-[3%]">  
          Iniciar sesión
          </h1>

           {/* Formulario de inicio de sesión */}
          <LoginForm />

          {/* Link para redirigir al formulario de registro */}
          <p className="text-center my-5 text-sm font-medium">
          ¿No eres miembro? {" "}
          <span className="text-sm text-blue-500 hover:text-blue-700 transition duration-200 cursor-pointer ml-2" onClick={() => setSelectedOption("Crear cuenta")}>
              <Link href="/register">Crea una cuenta</Link>
          </span>
          </p>
        </div>
    </div>
  );
};

export default LoginPage;