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
    <div className="w-screen mt-[3%]">
        <div>
            <h1 className="font-semibold text-2xl custom-w-450:text-3xl text-center text-[gray]">  
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

//className="text-sm text-blue-500 cursor-pointer text-center mb-2"