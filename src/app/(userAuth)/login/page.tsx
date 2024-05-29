import { Krona_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import LoginForm from "./form";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });
const LoginPage = () => {
  return (
    <div className="w-screen mt-[3%]">
        <div>
            <h1
            className={`${krona.className} text-[34px] text-[#FD7B03] text-center mb-10`}
            >
            Comé x menos
            </h1>
            <p className="font-semibold text-2xl text-center text-[#FD7B03]">
            Iniciar sesión
            </p>
            <LoginForm />
            <p className="text-center my-5 text-sm font-medium">
            ¿No eres miembro?{" "}
            <span className="text-[#fc7b03]">
                <Link href="/register">Registrate gratis</Link>
            </span>
            </p>
        </div>
    </div>
  );
};

export default LoginPage;

// "dev": "next dev -p 8081",