//Componente que muestra el detalle de un descuento con los botones Editar descuento y Eliminar Descuento.
"use client";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import { discountDetail } from "@/api/discountService";
import { DiscountDetail } from "@/types/discountTypes";
//import { discountDetail, DiscountDetail } from "@/services/apiCall";
import Image from "next/image";
//import EditDiscountModalForm from "../editDiscount/page";
import Link from "next/link";
//import DeleteDiscountModal from '@/components/DeleteDiscountModal';
import Cookies from "js-cookie";
import CountdownTimer from "@/components/countdownTimer/CountdownTimer";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import Button from "@/components/button/Button";
import { FaArrowLeft } from "react-icons/fa";
import DiscountEdit from "../discountEdit/DiscountEdit";
import DiscountDelete from "@/components/dashboardBusinessAdminComponents/myActiveDiscounts/discountDelete/DiscountDelete";
//import DeleteDiscountPage from "../deleteDiscount/page";

interface DiscountDetailPageProps {
  setShowDiscountActionPage: (showDiscountActionPage: boolean) => void;
}

const DiscountActionPage: React.FC<DiscountDetailPageProps> = ({
  setShowDiscountActionPage,
}) => {
  //Creo constante con la variable de entorno de la url del backend
  const BASE_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [discount, setDiscount] = useState<DiscountDetail | null>(null);
  const [userToken, setUserToken] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para manejar el modal TokenExpiredModal.tsx
  const [showDiscountEdit, setShowDiscountEdit] = useState<boolean>(false);
  const [showDiscountDelete, setShowDiscountDelete] = useState<boolean>(false);

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
    setSelectDiscountTitle,
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

        //Si el token expiró va a mostrar un modal informando al usuario
        if (response === "TOKEN_EXPIRED") {
          setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
          return; // Detiene la ejecución para evitar errores con response
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
      ) : 
      (!showDiscountEdit && !showDiscountDelete) ?
      (
        <div className="bg-white border-2 shadow-lg rounded-lg  custom-w-450:p-4 lg:py-4 h-full relative">
          <div className="w-full flex flex-col justify-center items-center">
            {/* <div className="w-full mt-3 ml-10 md:ml-20"> */}
              <FaArrowLeft
                onClick={() => setShowDiscountActionPage(false)}
                size={20}
                color="black"
                className="absolute top-3 left-3 custom-w-450:top-6 custom-w-450:left-6 cursor-pointer"
              />
            {/* </div> */}

            <h1 className="text-[gray] text-center text-2xl custom-w-450:text-3xl mt-8 lg:mt-2 mb-6">
              Detalles del descuento
            </h1>

            <div /* className="w-[95%] xs:w-[380px] xs:mx-0 border-[1px] border-black rounded-lg py-5" */className="w-full custom-w-450:w-[380px] py-5 rounded-2xl cursor-pointer shadow-[0_6px_12px_rgba(0,0,0,0.2)]">
              <p className="text-[18px] font-bold text-center mb-[10px]">
                {discount.title}
              </p>

              <div className="w-full h-auto flex flex-row flex-wrap justify-evenly">
                {/* <div className="w-[45%] flex items-center ">
                  <p className="w-full h-auto text-[14px] text-left line-clamp-6 break-words">
                    {discount.description}
                  </p>
                </div> */}
                <div className="w-[45%] flex justify-center items-start relative">
                  {/* <Image
                    src={
                      typeof discount.imageURL === "string" 
                        ? discount.imageURL // Si es una URL de Firebase
                        : typeof discount.imageURL === "string"
                        ?
                          `${BASE_BACKEND_URL}/` + discount.imageURL // Si es de tu backend
                        : "" // Si no es un string, manejar el caso con una cadena vacía o una imagen por defecto
                    }
                    alt="Imagen descuento"
                    width={169}
                    height={112}
                    className="rounded-lg"
                  /> */}
                  <Image
                    src={discount.imageURL}
                    alt="Imagen descuento"
                    width={169}
                    height={112}
                    className="rounded-md"
                    priority
                  /> 

                  <p className="text-[12px] text-black bg-yellow-300 font-bold p-[4px] rounded-[30px] absolute bottom-[8px] left-[4%]">
                    {" "}
                    {/* antes tenía left-[18px] */}- {discount.discountAmount} %
                  </p>
                </div>

                {/* <div className="w-[45%] flex items-center "> */}
                <div className=" w-[45%] flex flex-col gap-[30px] mt-[10px] justify-center items-center">
                <div className="flex felx-row items-center font-bold">
                  <p className="text-[14px] flex flex-row">Antes: </p>
                  <div className="relative flex flex-row justify-center ">
                    <p className="text-[14px]">$ {discount.normalPrice}</p>
                    <div className="absolute top-[50%] h-[1px] bg-black w-[110%]"></div>
                  </div>
                </div>

                <p className="flex flex-row text-[14px] font-bold">
                  Ahora: $ {discount.priceWithDiscount}
                </p>
              </div>
                {/* </div> */}
              </div>

              {/* <div className="flex felx-row gap-[10px] mt-[10px] justify-center">
                <div className="flex felx-row items-center font-bold">
                  <p className="text-[14px] flex flex-row">Antes: </p>
                  <div className="relative flex flex-row justify-center ">
                    <p className="text-[14px]">$ {discount.normalPrice}</p>
                    <div className="absolute top-[50%] h-[1px] bg-black w-[110%]"></div>
                  </div>
                </div>

                <p className="flex flex-row text-[14px] font-bold">
                  Con Descuento: $ {discount.priceWithDiscount}
                </p>
              </div> */}

              <div className="w-[100%]">
                <p className="w-full px-4 pt-4 h-auto text-[14px] text-left break-words">
                  {discount.description}
                </p>
              </div>

              <div className="w-full flex justify-evenly items-center mt-5 text-[14px]">
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

            <div className="w-[95%] mx-3 xs:w-[380px] xs:mx-0 flex flex-col justify-between gap-2 mt-3">
                <Button 
                buttonText="Editar descuento" 
                onClickButton={() => {
                    setShowDiscountEdit(true);
                    const mainElement = document.querySelector("main");
                    if (mainElement) {
                    mainElement.scrollTo(0, 0);
                    }
                }}
                />

                <button
                  type="submit"
                  onClick={() => {
                    setSelectDiscountTitle(discount.title);
                    setShowDiscountDelete(true);
                    const mainElement = document.querySelector("main");
                    if (mainElement) {
                    mainElement.scrollTo(0, 0);
                    }
                  }}
                  className="w-full bg-[#FF5C5C] text-[18px] font-semibold text-white mt-3 h-[50px] rounded-[10px] border-[5px] border-red-700 transition-colors duration-300 ease-in-out hover:bg-red-700 hover:text-[#FF5C5C] hover:border-[#FF5C5C] cursor-pointer"
                >
                  <div className="flex justify-center">
                    <div className="w-[98.5%] bg-red-700 rounded-[10px] py-[3px] hover:bg-[#FF5C5C] hover:text-red-700">
                      Eliminar descuento
                    </div>
                  </div>
                </button>
            </div>
          </div>
        </div>
      ) : showDiscountEdit ? <DiscountEdit setShowDiscountEdit={setShowDiscountEdit} setShowDiscountActionPage={setShowDiscountActionPage} />
        : showDiscountDelete && <DiscountDelete setShowDiscountDelete={setShowDiscountDelete} setShowDiscountActionPage={setShowDiscountActionPage}/>
      }
    </>
  );
};

export default DiscountActionPage;
