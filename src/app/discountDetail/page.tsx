"use client"
//Funciona perfecto
/* import React, { useContext, useEffect, useState } from 'react';
import { Context } from "@/context/Context";
import { discountDetail, DiscountDetail } from "@/services/apiCall";
import Image from 'next/image';
import EditDiscountModalForm from '../editDiscount/page';
import Link from 'next/link';
//import DeleteDiscountModal from '@/components/DeleteDiscountModal';
import Cookies from "js-cookie";

interface DiscountDetailPageProps {}

const DiscountDetailPage: React.FC<DiscountDetailPageProps> = ({}) => {
    const [discount, setDiscount] = useState<DiscountDetail | null>(null);
    const [userToken, setUserToken] = useState<string>("");
    const { discountId, setDiscountId, discountRecovered, setDiscountRecovered, isLoggedIn, setUserRole, setUserId, setUserName, setBusinessName, setBusinessId, setBusinessType, setSelectedOption } = useContext(Context);

    useEffect(() => {
        if (isLoggedIn) {
          const storedUserToken = Cookies.get("userToken") || "";
          setUserToken(storedUserToken);

          //const storedDiscountId = Cookies.set('discountId', discountId, { expires: 1, secure: true, sameSite: 'strict' }); 
        }
      }, [isLoggedIn, setUserToken, discountId]); 


      //A este useEffect lo creé para cuando se refresca la vista de este componente
      useEffect(() => {
        const storedUserToken = Cookies.get("userToken") || "";
        setUserToken(storedUserToken);
  
        const cookieUserRole = Cookies.get('userRole') || '';
        setUserRole(cookieUserRole); 
  
        const cookieUserId = Cookies.get("userId") || "";
        setUserId(cookieUserId);
  
        const cookieUserName = Cookies.get("userName") || "";
        setUserName(cookieUserName);
  
        const cookieBusinessName = Cookies.get("businessName") || "";
        setBusinessName(cookieBusinessName);
  
        const cookieBusinessId = Cookies.get("businessId") || "";
        setBusinessId(cookieBusinessId);
  
        const cookieBusinessType = Cookies.get("businessType") || "";
        setBusinessType(cookieBusinessType);

        const cookieDiscountId = Cookies.get("discountId") || "";
        setDiscountId(cookieDiscountId);

       setSelectedOption("Mi cuenta");

    }, [setUserToken,
        setUserRole,
        setUserId,
        setUserName,
        setBusinessName,
        setBusinessId,
        setBusinessType,
        setDiscountId,
        setSelectedOption,]);  


     // Obtener descuentos del backend
    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
            const response = await discountDetail(discountId, userToken);
            if (typeof response !== "string") {
                console.log("Descuento recibido del backend: ", response); // Verifica si llegan datos
                setDiscount(response); // Actualiza el estado con el descuento recibido

                const storedDiscountId = Cookies.set('discountId', discountId, { expires: 1, secure: true, sameSite: 'strict' });  //Se crea una cookie con el valor del id del descuento
                
                setDiscountRecovered(response);
            } else {
                console.error("Error al obtener el descuento: ", response);
            }
            } catch (error) {
            console.error("Error al obtener el descuento: ", error);
            }
        };
  
      fetchDiscounts();
    }, [discountId, userToken, setDiscountRecovered]);

    

    if (!discount) {
        return <p>Loading...</p>;
    }

  return (
    <div className='w-screen flex justify-center '>
        <div className='w-auto'>
            <h1 className='text-center text-xl mt-5 mb-6 font-bold'>Detalle del descuento</h1>

            <div className="w-full mx-3 xs:w-[380px] xs:mx-0 border-[1px] border-black rounded-lg py-5 ">
                <p className="text-[14px] font-bold text-center mb-[10px]">{discount.title}</p>
                <div className="h-auto flex flex-row flex-wrap">
                <div className="w-1/2 flex items-center">
                    <p className="w-[100%] h-auto px-4 text-[12px] text-center">{discount.description}</p>
                </div>
                <div className="w-1/2  flex justify-center items-center relative">
                    <Image 
                    //src={"https://discount-project-backend.onrender.com/" + discount.imageURL} alt="Imagen descuento" 
                    src={"http://localhost:5050/" + discount.imageURL} alt="Imagen descuento" 
                    width={300} 
                    height={200}
                    className="w-[90%]"
                    />

                    <p className="text-[10px] text-black bg-yellow-300 font-bold p-[4px] rounded-[30px] absolute bottom-[8px] left-[18px]">- {discount.discountAmount} %</p>
                </div>
                
                </div>

                <div className="flex felx-row gap-[20px] mt-[10px] justify-center">
                <div className="flex felx-row items-center">
                    <p className="text-[12px] flex flex-row">Antes: </p>
                    <div className="relative flex flex-row justify-center ">
                    <p className="text-[12px]">$ {discount.normalPrice}</p>
                    <div className="absolute top-[50%] h-[1px] bg-black w-[110%]"></div>
                    </div>
                </div>

                <p className="flex flex-row text-[12px]">Con Descuento: $ {discount.priceWithDiscount}</p>
                </div>
            </div>

            <div className='w-auto mx-3 xs:w-[380px] xs:mx-0 flex flex-col justify-between gap-5 mt-6 '>
                <Link href={'/editDiscount'}>
                    <button className='w-[100%] text-[16px] font-bold border-[5px] border-blue-600 text-gray-600 hover:text-white hover:bg-blue-600 p-1 rounded-lg'>Editar descuento</button>
                </Link>

                <Link href={"/deleteDiscount"}>
                    <button className='w-[100%] text-[16px] font-bold border-[5px] border-red-500 text-gray-600 hover:text-white hover:bg-red-500 p-1 rounded-lg'>Eliminar descuento</button>
                </Link>
            </div> 
        </div>
    </div>
  )
}

export default DiscountDetailPage; */



import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import { discountDetail, DiscountDetail } from "@/services/apiCall";
import Image from "next/image";
import EditDiscountModalForm from "../editDiscount/page";
import Link from "next/link";
//import DeleteDiscountModal from '@/components/DeleteDiscountModal';
import Cookies from "js-cookie";
import CountdownTimer from "@/components/countdownTimer/CountdownTimer";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import Button from "@/components/button/Button";

interface DiscountDetailPageProps {}

const DiscountDetailPage: React.FC<DiscountDetailPageProps> = ({}) => {
  const [discount, setDiscount] = useState<DiscountDetail | null>(null);
  const [userToken, setUserToken] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para manejar el modal TokenExpiredModal.tsx
  const {
    discountId,
    setDiscountId,
    discountRecovered,
    setDiscountRecovered,
    isLoggedIn,
    setUserRole,
    setUserId,
    setUserName,
    setBusinessName,
    setBusinessId,
    setBusinessType,
    setSelectedOption,
  } = useContext(Context);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);

      //const storedDiscountId = Cookies.set('discountId', discountId, { expires: 1, secure: true, sameSite: 'strict' });
    }
  }, [isLoggedIn, setUserToken, discountId]);

  //A este useEffect lo creé para cuando se refresca la vista de este componente
  useEffect(() => {
    const storedUserToken = Cookies.get("userToken") || "";
    setUserToken(storedUserToken);

    const cookieUserRole = Cookies.get("userRole") || "";
    setUserRole(cookieUserRole);

    /* const cookieUserId = Cookies.get("userId") || "";
    setUserId(cookieUserId); */

    const cookieUserName = Cookies.get("userName") || "";
    setUserName(cookieUserName);

    const cookieBusinessName = Cookies.get("businessName") || "";
    setBusinessName(cookieBusinessName);

    /* const cookieBusinessId = Cookies.get("businessId") || "";
    setBusinessId(cookieBusinessId); */

    const cookieBusinessType = Cookies.get("businessType") || "";
    setBusinessType(cookieBusinessType);

    const cookieDiscountId = Cookies.get("discountId") || "";
    setDiscountId(cookieDiscountId);

    setSelectedOption("Mi cuenta");
  }, [
    setUserToken,
    setUserRole,
    setUserId,
    setUserName,
    setBusinessName,
    //setBusinessId,
    setBusinessType,
    setDiscountId,
    setSelectedOption,
  ]);

  // Obtener descuentos del backend
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await discountDetail(discountId);
        if (response === "Token inválido o expirado") {
          setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
        }

        if (typeof response !== "string") {
          console.log("Descuento recibido del backend: ", response); // Verifica si llegan datos
          setDiscount(response); // Actualiza el estado con el descuento recibido

          const storedDiscountId = Cookies.set("discountId", discountId, {
            expires: 1,
            secure: true,
            sameSite: "strict",
          }); //Se crea una cookie con el valor del id del descuento

          setDiscountRecovered(response);
        } else {
          console.error("Error al obtener el descuento: ", response);
        }
      } catch (error) {
        console.error("Error al obtener el descuento: ", error);
      }
    };

    fetchDiscounts();
  }, [discountId, userToken, setDiscountRecovered]);

  return (
    <>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {!discount ? (
        <p className="text-center text-base mt-[20%]">Cargando datos...</p>
      ) : (
        <div className="w-screen flex justify-center ">
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-[gray] text-center text-2xl custom-w-450:text-3xl mt-5 mb-6">
              Detalles del descuento
            </h1>

            <div className="w-[90%] mx-3 xs:w-[380px] xs:mx-0 border-[1px] border-black rounded-lg py-5 ">
              <p className="text-[14px] font-bold text-center mb-[10px]">
                {discount.title}
              </p>

              {/* <div className="h-auto flex flex-row flex-wrap">
                  <div className="w-1/2 flex items-center">
                      <p className="w-[100%] h-auto px-4 text-[12px] text-center">{discount.description}</p>
                  </div>
                  <div className="w-1/2  flex justify-center items-center relative">
                      <Image 
                      src={"https://discount-project-backend.onrender.com/" + discount.imageURL} alt="Imagen descuento" 
                      //src={"http://localhost:5050/" + discount.imageURL} alt="Imagen descuento" 
                      width={300} 
                      height={200}
                      className="w-[90%]"
                      />

                      <p className="text-[10px] text-black bg-yellow-300 font-bold p-[4px] rounded-[30px] absolute bottom-[8px] left-[18px]">- {discount.discountAmount} %</p>
                  </div>
                  
                  </div> */}
              <div className="w-full h-auto flex flex-row flex-wrap justify-evenly">
                <div className="w-[45%] flex items-center ">
                  <p className="w-full h-auto text-[12px] text-left line-clamp-6 break-words">
                    {discount.description}
                  </p>
                </div>
                <div className="w-[45%] flex justify-center items-start relative">
                  <Image
                    src={
                      "https://discount-project-backend.onrender.com/" +
                      discount.imageURL
                    }
                    //src={"http://localhost:5050/" + discount.imageURL}
                    alt="Imagen descuento"
                    width={169}
                    height={112}
                    //className="w-[169px] h-[112px]"
                  />
                  <p className="text-[10px] text-black bg-yellow-300 font-bold p-[4px] rounded-[30px] absolute bottom-[8px] left-[4%]">
                    {" "}
                    {/* antes tenía left-[18px] */}- {discount.discountAmount} %
                  </p>
                </div>
              </div>

              <div className="flex felx-row gap-[20px] mt-[10px] justify-center">
                <div className="flex felx-row items-center">
                  <p className="text-[12px] flex flex-row">Antes: </p>
                  <div className="relative flex flex-row justify-center ">
                    <p className="text-[12px]">$ {discount.normalPrice}</p>
                    <div className="absolute top-[50%] h-[1px] bg-black w-[110%]"></div>
                  </div>
                </div>

                <p className="flex flex-row text-[12px]">
                  Con Descuento: $ {discount.priceWithDiscount}
                </p>
              </div>

              <div className="w-full flex justify-evenly items-center mt-5 text-[12px]">
                <div className="flex justify-center items-center gap-1 px-[6px] py-[3px] border-[1px] border-black rounded-lg">
                  {discount.validityPeriod ? (
                    <>
                      <p>Oferta termina en: </p>
                      <div className="font-bold">
                        <CountdownTimer
                          startDateTime={discount.startDateTime}
                          durationDays={discount.validityPeriod}
                        />
                      </div>
                    </>
                  ) : (
                    <p>Oferta sin límite de tiempo</p>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="w-[90%] mx-3 xs:w-[380px] xs:mx-0 flex flex-col justify-between gap-5 my-6 ">
              <Link href={"/editDiscount"}>
                <button className="w-[100%] text-[16px] font-bold border-[5px] border-blue-600 text-gray-600 hover:text-white hover:bg-blue-600 p-1 rounded-lg">
                  Editar descuento
                </button>
              </Link>

              <Link href={"/deleteDiscount"}>
                <button className="w-[100%] text-[16px] font-bold border-[5px] border-red-500 text-gray-600 hover:text-white hover:bg-red-500 p-1 rounded-lg">
                  Eliminar descuento
                </button>
              </Link>
            </div> */}

            {/* <div className="w-[90%] mx-3 xs:w-[380px] xs:mx-0 flex flex-col justify-between gap-5 my-6">
              <Link href={"/editDiscount"}>
                <button className="w-full text-[16px] font-bold border-2 border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                  Editar descuento
                </button>
              </Link>

              <Link href={"/deleteDiscount"}>
                <button className="w-full text-[16px] font-bold border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-600 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                  Eliminar descuento
                </button>
              </Link>
            </div> */}

<div className="w-[90%] mx-3 xs:w-[380px] xs:mx-0 flex flex-col justify-between gap-5 my-6">
  <Link href={"/editDiscount"}>
    {/* <button className="w-full text-[16px] font-bold border-2 border-[#FD7B03] text-[#FD7B03] hover:text-white hover:bg-[#FD7B03] py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
      Editar descuento
    </button> */}
    <Button buttonText="Editar descuento" />
  </Link>

  <Link href={"/deleteDiscount"}>
    <button
      type="submit"
      className="w-full bg-[#FF5C5C] text-[18px] font-semibold text-white mt-3 h-[50px] rounded-[10px] border-[5px] border-red-700 transition-colors duration-300 ease-in-out hover:bg-red-700 hover:text-[#FF5C5C] hover:border-[#FF5C5C] cursor-pointer"
    >
      <div className="flex justify-center">
        <div className="w-[98.5%] bg-red-700 rounded-[10px] py-[3px] hover:bg-[#FF5C5C] hover:text-red-700">
          Eliminar descuento
        </div>
      </div>
    </button>
  </Link>
</div>


          </div>
        </div>
      )}
    </>
  );
};

export default DiscountDetailPage;
