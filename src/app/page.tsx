"use client";
/* import React, { useContext, useEffect, useState } from "react";
//import Image from "next/image";
import Link from "next/link";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import {
  FaUserPlus,
  FaTags,
  FaUsers,
  FaChartLine,
  FaUserFriends,
  FaChartPie,
} from "react-icons/fa";
//import { IoCloseCircleOutline } from 'react-icons/io5';

export default function Home() {
  const {
    userToken,
    setUserToken,
    selectedOption,
    setSelectedOption,
    isLoggedIn,
    setUserRole,
    //setUserId,
    setUserName,
    setBusinessName,
    //setBusinessId,
    setBusinessType,
    setBackgroundButtonNavBar,
  } = useContext(Context);

  const [showVideo, setShowVideo] = useState(false);

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    console.log("Token de usuario almacenado:", storedUserToken);
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get("userRole") || "";
    console.log("Rol de usuario de la cookie:", cookieUserRole);
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    console.log("Nombre de usuario de la cookie:", cookieUserName);
    setUserName(cookieUserName);

    const cookieBusinessName = Cookies.get("businessName") || "";
    console.log("Nombre del negocio de la cookie:", cookieBusinessName);
    setBusinessName(cookieBusinessName);

    const cookieBusinessType = Cookies.get("businessType") || "";
    console.log("Tipo de negocio de la cookie:", cookieBusinessType);
    setBusinessType(cookieBusinessType);

    setSelectedOption("Inicio");

    if (!userToken) {
      setBackgroundButtonNavBar(false);
    }
  }, [
    setUserToken,
    setUserRole,
    setUserName,
    setBusinessName,
    setBusinessType,
    setSelectedOption,
    setBackgroundButtonNavBar,
  ]);

  return (
    <div className="w-full">
      <header className="w-full bg-orange-600 text-center py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ¡Atrae Más Clientes con Descuentos Exclusivos!
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Únete a la plataforma donde restaurantes, cafés y bares impulsan su
            negocio con ofertas irresistibles.
          </p>
          <Link href={"/register"}>
            <button className="bg-white text-orange-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-200 hover:text-orange-700">
              Comienza Ahora
            </button>
          </Link>
        </div>
      </header>

      <section className="how-it-works my-10">
        <h2 className="text-2xl font-bold text-center mb-6">Cómo Funciona</h2>
        <div className="steps flex flex-col md:flex-row justify-center gap-10">
          <div className="step flex flex-col items-center">
            <FaUserPlus size={50} className="mb-2 text-[#FD7B03]" />
            <p className="text-lg">Regístrate</p>
          </div>
          <div className="step flex flex-col items-center">
            <FaTags size={50} className="mb-2 text-[#FD7B03]" />
            <p className="text-lg">Crea Descuentos</p>
          </div>
          <div className="step flex flex-col items-center">
            <FaUsers size={50} className="mb-2 text-[#FD7B03]" />
            <p className="text-lg">Atrae Clientes</p>
          </div>
        </div>
      </section>

      <section className="benefits my-10">
        <h2 className="text-2xl font-bold text-center mb-6">
          ¿Por Qué Elegirnos?
        </h2>
        <ul className="flex flex-col md:flex-row justify-center items-center gap-4">
          <li className="flex items-center">
            <FaUserFriends size={30} className="mr-2 text-[#FD7B03]" />
            <span className="text-lg">Aumenta el Tráfico</span>
          </li>
          <li className="flex items-center">
            <FaChartLine size={30} className="mr-2 text-[#FD7B03]" />
            <span className="text-lg">Fácil de Usar</span>
          </li>
          <li className="flex items-center">
            <FaChartPie size={30} className="mr-2 text-[#FD7B03]" />
            <span className="text-lg">Analíticas en Tiempo Real</span>
          </li>
        </ul>
      </section>

      <section className="demo my-10 text-center">
        <h2 className="text-2xl font-bold text-center mb-6">Véalo en Acción</h2>

        <button
          onClick={() => setShowVideo(true)}
          className="bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-orange-700"
        >
          Ver Demostración
        </button>

        {showVideo && (
          <div className="video-container my-6 relative">
            <video
              controls
              className="mx-auto rounded-lg shadow-lg"
              width="800"
            >
              <source
                src="/videos/demo-video-app-funcionando.mp4"
                type="video/mp4"
              />
              Tu navegador no soporta la etiqueta de video.
            </video> 
          </div>
        )}
      </section>
    </div>
  );
} */

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import {
  FaUserPlus,
  FaTags,
  FaUsers,
  FaChartLine,
  FaUserFriends,
  FaChartPie,
} from "react-icons/fa";

export default function Home() {
  const {
    setUserToken,
    setUserRole,
    setUserName,
    setBusinessName,
    setBusinessType,
    setBackgroundButtonNavBar,
    setSelectedOption,
  } = useContext(Context);

  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get("userRole") || "";
    setUserRole(cookieUserRole);

    const cookieUserName = Cookies.get("userName") || "";
    setUserName(cookieUserName);

    const cookieBusinessName = Cookies.get("businessName") || "";
    setBusinessName(cookieBusinessName);

    const cookieBusinessType = Cookies.get("businessType") || "";
    setBusinessType(cookieBusinessType);

    setSelectedOption("Inicio");

    if (!storedUserToken) {
      setBackgroundButtonNavBar(false);
    }
  }, [
    setUserToken,
    setUserRole,
    setUserName,
    setBusinessName,
    setBusinessType,
    setSelectedOption,
    setBackgroundButtonNavBar,
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-orange-600 text-center py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ¡Atrae Más Clientes con Descuentos Exclusivos!
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Únete a la plataforma donde restaurantes, cafés y bares impulsan su
            negocio con ofertas irresistibles.
          </p>
          <Link href={"/register"}>
            <button className="bg-white text-orange-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-200 hover:text-orange-700"
            onClick={() => setSelectedOption("Crear cuenta")}
            >
              Comienza Ahora
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <section className="how-it-works my-10">
          <h2 className="text-2xl font-bold text-center mb-6">Cómo Funciona</h2>
          <div className="steps flex flex-col md:flex-row justify-center gap-10">
            <div className="step flex flex-col items-center">
              <FaUserPlus size={50} className="mb-2 text-[#FD7B03]" />
              <p className="text-lg">Regístrate</p>
            </div>
            <div className="step flex flex-col items-center">
              <FaTags size={50} className="mb-2 text-[#FD7B03]" />
              <p className="text-lg">Crea Descuentos</p>
            </div>
            <div className="step flex flex-col items-center">
              <FaUsers size={50} className="mb-2 text-[#FD7B03]" />
              <p className="text-lg">Atrae Clientes</p>
            </div>
          </div>
        </section>

        <section className="benefits my-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            ¿Por Qué Elegirnos?
          </h2>
          <ul className="flex flex-col md:flex-row justify-center items-center gap-4">
            <li className="flex items-center">
              <FaUserFriends size={30} className="mr-2 text-[#FD7B03]" />
              <span className="text-lg">Aumenta el Tráfico</span>
            </li>
            <li className="flex items-center">
              <FaChartLine size={30} className="mr-2 text-[#FD7B03]" />
              <span className="text-lg">Fácil de Usar</span>
            </li>
            <li className="flex items-center">
              <FaChartPie size={30} className="mr-2 text-[#FD7B03]" />
              <span className="text-lg">Analíticas en Tiempo Real</span>
            </li>
          </ul>
        </section>

        <section className="demo my-10 text-center">
          <h2 className="text-2xl font-bold text-center mb-6">
            Véalo en Acción
          </h2>

          <button
            onClick={() => setShowVideo(!showVideo)}
            className="bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-orange-700"
          >
            {showVideo ? "Cerrar Demostración" : "Ver Demostración"}
          </button>

          {showVideo && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 custom-w-450:px-4">
              {/* Fondo desenfocado */}
              <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-10"></div>

              <div className="relative bg-white w-full max-w-screen-sm sm:max-w-lg md:max-w-3xl lg:max-w-4xl px-2 sm:p-5 py-5 rounded-lg z-20">
                {/* Botón para ocultar el video una vez que se abrió */}
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-0 right-2 text-gray-800 text-2xl hover:text-3xl transition duration-200 ease-in-out cursor-pointer"
                >
                  &times; 
                </button>
                <div className="relative pt-3">
                  <video controls className="w-full h-auto">
                    <source
                      src="/videos/demo-video-app-funcionando.mp4"
                      type="video/mp4"
                    />
                    Tu navegador no soporta la etiqueta de video.
                  </video>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
