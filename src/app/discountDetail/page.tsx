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



import React, { useContext, useEffect, useState } from 'react';
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
        <div className='w-full flex flex-col justify-center items-center'>
            <h1 className='text-[gray] text-center text-2xl custom-w-450:text-3xl mt-5 mb-6'>Detalles del descuento</h1>

            <div className="w-[90%] mx-3 xs:w-[380px] xs:mx-0 border-[1px] border-black rounded-lg py-5 ">
                <p className="text-[14px] font-bold text-center mb-[10px]">{discount.title}</p>
                <div className="h-auto flex flex-row flex-wrap">
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

            <div className='w-[90%] mx-3 xs:w-[380px] xs:mx-0 flex flex-col justify-between gap-5 mt-6 '>
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

export default DiscountDetailPage;