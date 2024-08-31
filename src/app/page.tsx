"use client"
/* import React, { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Context } from "@/context/Context";
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
    userId,
    setUserId,
    userRole,
    setUserRole,
    userToken,
    setUserToken,
    setUserName,
    setBackgroundButtonNavBar,
  } = useContext(Context);
  useEffect(() => {
    const thereIsUserToken = localStorage.getItem("token");
    const thereIsUserRole = localStorage.getItem("role");
    const thereIsUserId = localStorage.getItem("_id");
    const thereIsUserName = localStorage.getItem("name");

    if (thereIsUserToken) {
      setUserToken(thereIsUserToken);
    }

    if (thereIsUserRole) {
      setUserRole(thereIsUserRole);
    }

    if (thereIsUserId) {
      setUserId(thereIsUserId);
    }

    if (thereIsUserName) {
      setUserName(thereIsUserName);
    }

    if (!userToken) {
      setBackgroundButtonNavBar(false);
    }
  }, [
    setBackgroundButtonNavBar,
    setUserId,
    setUserName,
    setUserRole,
    setUserToken,
    userToken,
  ]);

  console.log(userId);
  return (
    <main className="">
      <div className="home-container">
        <header className="hero-section bg-orange-600 text-center py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ¡Atrae Más Clientes con Descuentos Exclusivos!
            </h1>
            <p className="text-lg md:text-xl text-white mb-8">
              Únete a la plataforma donde restaurantes, cafés y bares impulsan
              su negocio con ofertas irresistibles.
            </p>
            <button className="bg-white text-orange-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100">
              Comienza Ahora
            </button>
          </div>
        </header>

        <section className="how-it-works">
          <h2 className="text-2xl font-bold text-center mb-6">Cómo Funciona</h2>
          <div className="steps flex justify-center gap-10">
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

        <section className="benefits">
          <h2 className="text-2xl font-bold text-center mb-6">
            ¿Por Qué Elegirnos?
          </h2>
          <ul className="flex flex-col items-center gap-4">
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

        <section className="success-stories">
          <h2 className="text-2xl font-bold text-center mb-6">
            Historias de Éxito
          </h2>
          <div className="stories grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="story p-4 border rounded-lg shadow-lg text-center">
              <img
                src="/images/business-logo1.png"
                alt="Nombre del Negocio"
                className="mx-auto mb-4 w-24 h-24"
              />
              <p className="italic">
                "¡Comé x menos nos ayudó a aumentar nuestra base de clientes en
                un 30%!"
              </p>
              <p className="font-bold mt-2">
                - Juan Pérez, Propietario de La Parrilla
              </p>
            </div>
            <div className="story p-4 border rounded-lg shadow-lg text-center">
              <img
                src="/images/business-logo2.png"
                alt="Nombre del Negocio"
                className="mx-auto mb-4 w-24 h-24"
              />
              <p className="italic">
                "Desde que comenzamos a usar Comé x menos, nuestros ingresos han
                crecido exponencialmente."
              </p>
              <p className="font-bold mt-2">
                - María Gómez, Dueña de Panadería La Delicia
              </p>
            </div>
            <div className="story p-4 border rounded-lg shadow-lg text-center">
              <img
                src="/images/business-logo3.png"
                alt="Nombre del Negocio"
                className="mx-auto mb-4 w-24 h-24"
              />
              <p className="italic">
                "Comé x menos nos permitió llegar a una audiencia completamente
                nueva. ¡Es increíble!"
              </p>
              <p className="font-bold mt-2">
                - Carlos López, Gerente de Café Aroma
              </p>
            </div>
            <div className="story p-4 border rounded-lg shadow-lg text-center">
              <img
                src="/images/business-logo4.png"
                alt="Nombre del Negocio"
                className="mx-auto mb-4 w-24 h-24"
              />
              <p className="italic">
                "El soporte y las herramientas que ofrece Comé x menos son
                excepcionales. ¡Muy recomendados!"
              </p>
              <p className="font-bold mt-2">
                - Ana Martínez, Propietaria de Restaurante El Sazón
              </p>
            </div>
          </div>
        </section>

        <section className="demo">
          <h2>Véalo en Acción</h2>
          <button>Ver Demostración</button>
        </section>
      </div>
    </main>
  );
} */



import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Context } from "@/context/Context";
import Cookies from "js-cookie";
import { FaUserPlus, FaTags, FaUsers, FaChartLine, FaUserFriends, FaChartPie } from "react-icons/fa";
//import { IoCloseCircleOutline } from 'react-icons/io5';

export default function Home() {
  /* const { userId, setUserId, userRole, setUserRole, userToken, setUserToken, setUserName, setBackgroundButtonNavBar } =
  useContext(Context); */

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
    setBackgroundButtonNavBar
  } = useContext(Context);

  const [showVideo, setShowVideo] = useState(false);

  const handleShowVideo = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };
  
  /* useEffect(() => {
    const thereIsUserToken = localStorage.getItem("token");
    const thereIsUserRole = localStorage.getItem("role");
    const thereIsUserId = localStorage.getItem("_id");
    const thereIsUserName = localStorage.getItem("name");

    if (thereIsUserToken) {
      setUserToken(thereIsUserToken);
    }

    if (thereIsUserRole) {
      setUserRole(thereIsUserRole);
    }

    if (thereIsUserId) {
      setUserId(thereIsUserId);
    }  

    if (thereIsUserName) {
      setUserName(thereIsUserName);
    }
    
    if (!userToken) {
      setBackgroundButtonNavBar(false);
    }
  }, [setBackgroundButtonNavBar, setUserId, setUserName, setUserRole, setUserToken, userToken]); */

  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    console.log("Token de usuario almacenado:", storedUserToken);
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get('userRole') || '';
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
      
  }, [setUserToken, setUserRole, setUserName, setBusinessName, setBusinessType, setSelectedOption, setBackgroundButtonNavBar]);
  
  return (
    
      <div className="w-full">
        <header className="w-full bg-orange-600 text-center py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ¡Atrae Más Clientes con Descuentos Exclusivos!
            </h1>
            <p className="text-lg md:text-xl text-white mb-8">
              Únete a la plataforma donde restaurantes, cafés y bares impulsan su negocio con ofertas irresistibles.
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
          <h2 className="text-2xl font-bold text-center mb-6">¿Por Qué Elegirnos?</h2>
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

        {/* <section className="success-stories my-10">
  <h2 className="text-2xl font-bold text-center mb-6">Historias de Éxito</h2>
  <div className="stories grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-4">
    <div className="story p-4 border rounded-lg shadow-lg text-center mx-auto max-w-sm">
      <Image src="/images/business-logo1.png" alt="Nombre del Negocio" className="mx-auto mb-4 w-24 h-24" width={96} height={96} />
      <p className="italic">"¡Comé x menos nos ayudó a aumentar nuestra base de clientes en un 30%!"</p>
      <p className="font-bold mt-2">- Juan Pérez, Propietario de La Parrilla</p>
    </div>
    <div className="story p-4 border rounded-lg shadow-lg text-center mx-auto max-w-sm">
      <Image src="/images/business-logo2.png" alt="Nombre del Negocio" className="mx-auto mb-4 w-24 h-24" width={96} height={96} />
      <p className="italic">"Desde que comenzamos a usar Comé x menos, nuestros ingresos han crecido exponencialmente."</p>
      <p className="font-bold mt-2">- María Gómez, Dueña de Panadería La Delicia</p>
    </div>
    <div className="story p-4 border rounded-lg shadow-lg text-center mx-auto max-w-sm">
      <Image src="/images/business-logo3.png" alt="Nombre del Negocio" className="mx-auto mb-4 w-24 h-24" width={96} height={96} />
      <p className="italic">"Comé x menos nos permitió llegar a una audiencia completamente nueva. ¡Es increíble!"</p>
      <p className="font-bold mt-2">- Carlos López, Gerente de Café Aroma</p>
    </div>
    <div className="story p-4 border rounded-lg shadow-lg text-center mx-auto max-w-sm">
      <Image src="/images/business-logo4.png" alt="Nombre del Negocio" className="mx-auto mb-4 w-24 h-24" width={96} height={96} />
      <p className="italic">"El soporte y las herramientas que ofrece Comé x menos son excepcionales. ¡Muy recomendados!"</p>
      <p className="font-bold mt-2">- Ana Martínez, Propietaria de Restaurante El Sazón</p>
    </div>
    
    <div className="story p-4 border rounded-lg shadow-lg text-center mx-auto max-w-sm">
      <Image src="/images/business-logo5.png" alt="Nombre del Negocio" className="mx-auto mb-4 w-24 h-24" width={96} height={96} />
      <p className="italic">"La herramienta ha sido muy útil para mejorar nuestra visibilidad local."</p>
      <p className="font-bold mt-2">- Laura López, Dueña de Café del Centro</p>
    </div>
    <div className="story p-4 border rounded-lg shadow-lg text-center mx-auto max-w-sm">
      <Image src="/images/business-logo6.png" alt="Nombre del Negocio" className="mx-auto mb-4 w-24 h-24" width={96} height={96} />
      <p className="italic">"Hemos visto un aumento significativo en la clientela desde que comenzamos a usar esta plataforma."</p>
      <p className="font-bold mt-2">- Sergio Martínez, Propietario de Bar La Esquina</p>
    </div>
  </div>
</section> */}



        {/* <section className="demo my-10 text-center">
          <h2 className="text-2xl font-bold text-center mb-6">Véalo en Acción</h2>
          <button className="bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-orange-700">
            Ver Demostración
          </button>
        </section> */}
        
        <section className="demo my-10 text-center">
      <h2 className="text-2xl font-bold text-center mb-6">Véalo en Acción</h2>
      
      <button 
        onClick={() => setShowVideo(true)} 
        className="bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-orange-700">
        Ver Demostración
      </button>

      {showVideo && (
        <div className="video-container my-6 relative">
          <video controls className="mx-auto rounded-lg shadow-lg" width="800">
            <source src="/videos/demo-video-app-funcionando.mp4" type="video/mp4" />
            Tu navegador no soporta la etiqueta de video.
          </video>

          {/* <button 
            onClick={() => setShowVideo(false)} 
            className="absolute top-2 right-[21%] text-black text-3xl hover:text-gray-300">
            <IoCloseCircleOutline size={30} color="black" />

          </button> */}
        </div>
      )}
    </section>
    </div>
  );
}

