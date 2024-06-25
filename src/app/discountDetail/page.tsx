"use client"
import React, { useContext, useEffect, useState } from 'react';
import { Context } from "@/context/Context";
import { discountDetail, DiscountDetail } from "@/services/apiCall";
import Image from 'next/image';
import EditDiscountModalForm from '../editDiscount/page';
import Link from 'next/link';
//import DeleteDiscountModal from '@/components/DeleteDiscountModal';

interface DiscountDetailPageProps {}

const DiscountDetailPage: React.FC<DiscountDetailPageProps> = ({}) => {
    const [discount, setDiscount] = useState<DiscountDetail | null>(null);
    const { discountId, userToken, discountRecovered, setDiscountRecovered } = useContext(Context);

     // Obtener descuentos del backend
    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
            const response = await discountDetail(discountId, userToken);
            if (typeof response !== "string") {
                console.log("Descuento recibido del backend: ", response); // Verifica si llegan datos
                setDiscount(response); // Actualiza el estado con el descuento recibido
                setDiscountRecovered(response);
            } else {
                console.error("Error al obtener el descuento: ", response);
            }
            } catch (error) {
            console.error("Error al obtener el descuento: ", error);
            }
        };
  
      fetchDiscounts();
    }, [discountId, userToken]);

    if (!discount) {
        return <p>Loading...</p>;
    }

  return (
    <div className='w-screen flex justify-center '>
        <div className='w-auto'>
            <h1 className='text-center text-xl mt-5 mb-6 font-bold'>Detalle del descuento</h1>

            <div className="w-auto mx-3 xs:w-[380px] xs:mx-0 border-[1px] border-black rounded-lg py-5 ">
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

            <div className='w-auto mx-3 xs:w-[380px] xs:mx-0 flex flex-row justify-between mt-6'>
                <Link href={'/editDiscount'}>
                    <button className='text-16 text-bold text-white bg-blue-600 p-2 rounded-lg'>Editar descuento</button>
                </Link>

                <Link href={"/deleteDiscount"}>
                    <button className='text-16 text-bold text-white bg-red-500 p-2  rounded-lg'>Eliminar descuento</button>
                </Link>
            </div> 
        </div>
    </div>
  )
}

export default DiscountDetailPage;