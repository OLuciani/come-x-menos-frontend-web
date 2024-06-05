//"use client"
/* import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import { discountsList } from "@/services/apiCall";


const MyDiscountsPage = async () => {
  const { userId, setUserId, newRole, setNewRole, userToken, setUserToken, setUserName } =
  useContext(Context);
  const [discountsArrayList, setDiscountsArrayList] = useState([]);

  useEffect(() => {
    const thereIsUserToken = localStorage.getItem("token");
    const thereIsUserRole = localStorage.getItem("role");
    const thereIsUserId = localStorage.getItem("_id");
    const thereIsUserName = localStorage.getItem("name");

    if (thereIsUserToken) {
      setUserToken(thereIsUserToken);
    }

    if (thereIsUserRole ) {
      setNewRole(thereIsUserRole);
    }

    if(thereIsUserId) {
      setUserId(thereIsUserId);
    }  

    if(thereIsUserName) {
      setUserName(thereIsUserName);
    }
  }, []);

  const response = await discountsList(userId, userToken);

  return (
    <div>
        <h1 className='mt-5 text-3xl text-center pb-5'>Mis descuentos</h1>
        
        
    </div>
  )
}

export default MyDiscountsPage; */


"use client"
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import { discountsList, DiscountsList } from "@/services/apiCall";
import Image from "next/image";
import Link from "next/link";


const MyDiscountsPage = () => {
  const { userId, setUserId, newRole, setNewRole, userToken, setUserToken, setUserName, businessId } = useContext(Context);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>([]);

  useEffect(() => {
    const thereIsUserToken = localStorage.getItem("token");
    const thereIsUserRole = localStorage.getItem("role");
    const thereIsUserId = localStorage.getItem("_id");
    const thereIsUserName = localStorage.getItem("name");

    if (thereIsUserToken) {
      setUserToken(thereIsUserToken);
    }

    if (thereIsUserRole) {
      setNewRole(thereIsUserRole);
    }

    if (thereIsUserId) {
      setUserId(thereIsUserId);
    }  

    if (thereIsUserName) {
      setUserName(thereIsUserName);
    }

    // Obtener descuentos del backend
    const fetchDiscounts = async () => {
      try {
        const response = await discountsList(businessId, userToken);
        if (typeof response !== "string") {
          console.log("Descuentos recibidos del backend: ", response); // Verifica si llegan datos
          setDiscountsArrayList(response); // Actualiza el estado con los descuentos recibidos
        } else {
          console.error("Error al obtener descuentos: ", response);
        }
      } catch (error) {
        console.error("Error al obtener descuentos: ", error);
      }
    };

    fetchDiscounts();
  }, [setUserId, setNewRole, setUserToken, setUserName]);

  return (
    <div className="w-screen flex justify-center border-[2px] border-black ">
      <div className="w-[380px] h-[850px] border-[1px] border-black rounded-2xl my-1">
        <h1 className='mt-5 text-3xl text-center'>Mis descuentos</h1>
        <div className="w-full h-[4px] bg-gray-300 my-[15px]"></div>
        <ul>
          {discountsArrayList.map((discount, index) => (
            <div>
              <Link href={"/discountDetail"}>
                <p className="text-[14px] font-bold text-center mb-[10px]">{discount.title}</p>
                <div className="h-auto flex flex-row flex-wrap">
                  <div className="w-1/2 flex items-center">
                    <p className="w-[100%] h-auto px-4 text-[12px] text-center">{discount.description}</p>
                  </div>
                  <div className="w-1/2  flex justify-center items-center relative">
                    <Image 
                    src={"http://localhost:5050/" + discount.imageURL} alt="Imagen descuento" 
                    width={300} 
                    height={200}
                    className="w-[90%]"
                    />

                    <p className="text-[10px] text-black bg-yellow-300 font-bold p-[4px] rounded-[30px] absolute bottom-[8px] left-[18px]">- {discount.discountAmount} %</p>
                  </div>
                  {/* <li key={index}>{discount.title} - {discount.discountAmount}</li> */}
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
              </Link>
              <div className="w-full h-[4px] bg-gray-300 my-[15px]"></div>
            </div>
             
            ))}
        </ul>
      </div>
    </div>
  );
}

export default MyDiscountsPage;
