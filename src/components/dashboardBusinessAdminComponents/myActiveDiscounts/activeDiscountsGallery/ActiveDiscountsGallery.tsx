"use client";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import { businessDetail } from "@/api/businessService";
import { discountsList } from "@/api/discountService";
import { Business } from "@/types/businessTypes";
//import { businessDetail, discountsList, DiscountsList, Business } from "@/services/apiCall";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import CountdownTimer from "@/components/countdownTimer/CountdownTimer";
import { isAfter } from "date-fns";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { FaArrowLeft } from "react-icons/fa";
import DiscountActionPage from "../discountActionPage/DiscountActionPage";

interface ErrorResponse {
  error: string;
}

const ActiveDiscountsGallery = () => {
  const {
    //businessId,
    businessName,
    setDiscountId,
    setSelectedOption,
    isLoggedIn,
    setUserRole,
    //setBusinessId,
    //setUserId,
    setUserName,
    setBusinessName,
    businessType,
    setBusinessType,
    setDiscountsArrayList,
    discountsArrayList,
  } = useContext(Context);
  /* const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>(
    []
  ); */
  const [loading, setLoading] = useState<boolean>(true);
  const [urlImageBusinessDetail, setUrlImageBusinessDetail] =
    useState<string>("");
  const [businessDetails, setBusinessDetails] = useState<Business | null>(null);
  const router = useRouter();
  const [userToken, setUserToken] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para manejar el modal TokenExpiredModal.tsx
  const [showDiscountActionPage, setShowDiscountActionPage] =
    useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
    }
  }, [isLoggedIn]);

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

    setSelectedOption("Mi cuenta");
  }, [
    setSelectedOption,
    setBusinessName,
    setBusinessType,
    setUserName,
    setUserRole,
  ]);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (userToken) {
        try {
          //const businessResponse = await businessDetail(businessId, userToken);
          const businessResponse = await businessDetail();

          //Si el token expiró va a mostrar un modal informando al usuario
          if (businessResponse === "TOKEN_EXPIRED") {
            setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
            return; // Detiene la ejecución para evitar errores con response
          }

          if (typeof businessResponse !== "string") {
            setBusinessDetails(businessResponse);
            const imageURL =
              typeof businessResponse.imageURL === "string"
                ? businessResponse.imageURL
                : "";
            setUrlImageBusinessDetail(imageURL);
          } else {
            console.error(
              "Error al obtener detalles del negocio: ",
              businessResponse
            );
          }
        } catch (error) {
          console.error("Error al obtener detalles del negocio: ", error);
        }
      }
    };

    const fetchDiscounts = async () => {
      try {
        if (userToken) {
          //console.log("Valor de userToken en fetchDiscounts: ", userToken);
          const response = await discountsList();

          //Si el token expiró va a mostrar un modal informando al usuario
          if (response === "TOKEN_EXPIRED") {
            setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
            return; // Detiene la ejecución para evitar errores con response
          }

          if (typeof response !== "string") {
            // Filtramos los descuentos expirados antes de establecer el estado
            const now = new Date();
            const validDiscounts = response.filter(
              (discount) =>
                !discount.validityPeriod ||
                !isAfter(
                  now,
                  new Date(discount.startDateTime).setDate(
                    new Date(discount.startDateTime).getDate() +
                      discount.validityPeriod
                  )
                )
            );
            setDiscountsArrayList(validDiscounts);
          } else {
            console.error("Error al obtener descuentos: ", response);
          }
        } else {
          console.error(
            "No se puede obtener descuentos, falta businessId o userToken"
          );
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errorMessage =
            axiosError.response?.data.error ||
            "Error en la solicitud de actualización";
          console.error("Error al obtener descuentos: ", errorMessage);
        } else {
          console.error("Error desconocido al obtener descuentos: ", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (userToken) {
      fetchBusiness();
      fetchDiscounts();
    }

    setSelectedOption("Mi cuenta");
  }, [userToken, setSelectedOption]);

  // Intervalo para actualizar descuentos
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDiscountsArrayList((prevDiscounts) =>
        prevDiscounts.filter(
          (discount) =>
            !discount.validityPeriod ||
            !isAfter(
              now,
              new Date(discount.startDateTime).setDate(
                new Date(discount.startDateTime).getDate() +
                  discount.validityPeriod
              )
            )
        )
      );
    }, 60000); // Comprobar cada minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {!showDiscountActionPage ? (
        <div className="bg-white border-2 shadow-lg rounded-lg p-2 custom-w-450:p-4 lg:py-4 h-full">
          <h5 className="text-center text-xl text-[black] font-semibold md:text-2xl pb-2">
            {businessName}
          </h5>

          {urlImageBusinessDetail && (
            <div className="flex justify-center">
              <Image
                src={urlImageBusinessDetail}
                alt="Imagen del negcio"
                width={169}
                height={112}
                className="w-[169px] h-[112px] rounded-md mb-4"
                priority
              />
            </div>
          )}

          {discountsArrayList.length > 0 ? (
            <>
              <h2 className="text-center text-lg text-[black] font-semibold md:text-xl pb-4">
                Descuentos activos (selecciona uno)
              </h2>

              {loading ? (
                <div className="w-full flex justify-center items-center mt-[8%]">
                  <CircularProgress
                    color="secondary"
                    size={24}
                    className="mr-2"
                  />
                  <span className="text-gray-600">Cargando datos...</span>
                </div>
              ) : (
                <div className="w-full flex flex-col justify-center md:flex-row md:flex-wrap gap-10 md:justify-evenly items-center">
                  {discountsArrayList.map(
                    (discount) =>
                      !discount.isDeleted && (
                        <div
                          key={discount._id}
                          className="w-full custom-w-450:w-[380px] custom-w-450:px-0 bg-white"
                        >
                          <div
                            onClick={() => {
                              setDiscountId(discount._id);
                              Cookies.set("discountId", discount._id, {
                                expires: 1,
                                secure: true,
                                sameSite: "strict",
                              });
                              setShowDiscountActionPage(true);
                              const mainElement =
                                document.querySelector("main");
                              if (mainElement) {
                                mainElement.scrollTo(0, 0);
                              }
                            }}
                            className="w-full custom-w-450:w-[380px] py-5 rounded-2xl cursor-pointer shadow-[0_6px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_12px_#FFCF91]"
                          >
                            <p className="text-[18px] font-bold text-center mb-[10px]">
                              {discount.title}
                            </p>

                            {/* <div className="w-full h-auto flex flex-row flex-wrap justify-evenly">
                              <div className="w-[45%] flex items-center ">
                                <p className="w-full h-auto text-[14px] text-left line-clamp-6 break-words">
                                  {discount.description}
                                </p>
                              </div>

                              <div className="w-[47%] flex justify-center items-start relative">
                                <Image
                                  src={discount.imageURL}
                                  alt="Imagen descuento"
                                  width={169}
                                  height={112}
                                  className="w-[169px] h-[112px] rounded-md"
                                  priority
                                />
                                <p className="text-[12px] text-black bg-yellow-300 font-bold p-[4px] rounded-[30px] absolute top-20 left-[4%]">
                                  - {discount.discountAmount} %
                                </p>
                              </div>
                            </div> */}

                            <div className="w-full h-auto flex flex-row flex-wrap justify-evenly">
                              {/* <div className="w-[45%] flex items-center ">
                                <p className="w-full h-auto text-[14px] text-left line-clamp-6 break-words">
                                  {discount.description}
                                </p>
                              </div> */}
                              <div className="w-[45%] flex justify-center items-start relative">
                                {/* <Image
                                  src={
                                    typeof discount.imageURL === "string" &&
                                    (discount.imageURL as string).includes(
                                      "firebasestorage.googleapis.com"
                                    )
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
                                  {/* antes tenía left-[18px] */}-{" "}
                                  {discount.discountAmount} %
                                </p>
                              </div>

                              {/* <div className="w-[45%] flex items-center "> */}
                              <div className=" w-[45%] flex flex-col gap-[30px] mt-[10px] justify-center items-center">
                                <div className="flex felx-row items-center font-bold">
                                  <p className="text-[14px] flex flex-row">
                                    Antes:{" "}
                                  </p>
                                  <div className="relative flex flex-row justify-center ">
                                    <p className="text-[14px]">
                                      $ {discount.normalPrice}
                                    </p>
                                    <div className="absolute top-[50%] h-[1px] bg-black w-[110%]"></div>
                                  </div>
                                </div>

                                <p className="flex flex-row text-[14px] font-bold">
                                  Ahora: $ {discount.priceWithDiscount}
                                </p>
                              </div>
                              {/* </div> */}
                            </div>

                            {/* <div 
                                className="w-full px-4 pt-4 text-[14px] text-left break-words relative cursor-pointer h-[72px] overflow-hidden"
                                onClick={() => console.log("Abrir detalle del descuento")}
                              >
                                <p className="line-clamp-2">
                                  {discount.description}
                                </p>
                                {discount.description.length > 86 &&
                                
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white to-transparent h-[48px] flex items-end justify-end pr-2">
                                  <span className="text-blue-500 text-sm font-semibold">Ver más...</span>
                                </div>
                                }
                              </div> */}

                            <div
                              className="w-full px-4 pt-4 text-[14px] text-left break-words relative cursor-pointer h-[72px] overflow-hidden"
                              onClick={() =>
                                console.log("Abrir detalle del descuento")
                              }
                            >
                              <p className="line-clamp-2">
                                {discount.description}
                              </p>

                              <div
                                className={`absolute bottom-0 left-0 w-full bg-gradient-to-t from-white to-transparent h-[48px] flex items-end justify-end pr-2 ${
                                  discount.description.length > 86
                                    ? "flex"
                                    : "hidden"
                                }`}
                              >
                                <span className="text-blue-500 text-sm font-semibold">
                                  Ver más...
                                </span>
                              </div>
                            </div>

                            {/* <div className="flex flex-row gap-[10px] mt-[10px] justify-center">
                              <div className="flex flex-row items-center font-bold">
                                <p className="text-[14px] flex flex-row">
                                  Antes:{" "}
                                </p>
                                <div className="relative flex flex-row justify-center">
                                  <p className="text-[14px]">
                                    $ {discount.normalPrice}
                                  </p>
                                  <div className="absolute top-[50%] h-[1px] bg-black w-[110%]"></div>
                                </div>
                              </div>
                              <p className="flex flex-row text-[14px] font-bold">
                                Con Descuento: $ {discount.priceWithDiscount}
                              </p>
                            </div> */}

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
                        </div>
                      )
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="text-center font-semibold mt-10">
              No hay descuentos activos para mostrar
            </p>
          )}
        </div>
      ) : (
        <DiscountActionPage
          setShowDiscountActionPage={setShowDiscountActionPage}
        />
      )}
    </>
  );
};

export default ActiveDiscountsGallery;
