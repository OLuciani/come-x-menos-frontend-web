"use client";
/* import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import {
  businessDetail,
  discountsList,
  DiscountsList,
  Business,
} from "@/services/apiCall";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import CountdownTimer from "@/components/countdownTimer/CountdownTimer";
import { isAfter } from 'date-fns';

interface ErrorResponse {
  error: string;
}

const MyDiscountsPage = () => {
  const {
    businessId,
    businessName,
    setDiscountId,
    setSelectedOption,
    isLoggedIn,
    setUserRole,
    setBusinessId,
    setUserId,
    setUserName,
    setBusinessName,
    businessType,
    setBusinessType,
  } = useContext(Context);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [urlImageBusinessDetail, setUrlImageBusinessDetail] =
    useState<string>("");
  const [businessDetails, setBusinessDetails] = useState<Business | null>(null);
  const router = useRouter();
  const [userToken, setUserToken] = useState<string>("");

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

    setSelectedOption("Mi cuenta");
  }, [setSelectedOption, setBusinessId, setBusinessName, setBusinessType, setUserId, setUserName, setUserRole]);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (businessId && userToken) {
        try {
          const businessResponse = await businessDetail(businessId, userToken);
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
        if (businessId && userToken) {
          const response = await discountsList(businessId, userToken);
          if (typeof response !== "string") {
            // Filtramos los descuentos expirados antes de establecer el estado
            const now = new Date();
            const validDiscounts = response.filter(discount => 
              !discount.validityPeriod || !isAfter(now, new Date(discount.startDateTime).setDate(new Date(discount.startDateTime).getDate() + discount.validityPeriod))
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
  }, [userToken, businessId, setSelectedOption]);

  // Intervalo para actualizar descuentos
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDiscountsArrayList(prevDiscounts =>
        prevDiscounts.filter(discount => 
          !discount.validityPeriod || !isAfter(now, new Date(discount.startDateTime).setDate(new Date(discount.startDateTime).getDate() + discount.validityPeriod))
        )
      );
    }, 60000); // Comprobar cada minuto

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-full flex justify-center border-[2px]">
        <div className="w-full custom-w-450:w-[380px] border-[1px] border-black rounded-2xl py-3 my-2">
          <h3 className="text-base text-center">Descuentos de:</h3>
          <h1 className="mt-2 text-2xl font-bold text-center text-white pb-2">
            {businessName}
          </h1>
          <div className="w-full h-[4px] bg-gray-300 "></div>
          <div className="flex justify-center">
            <CircularProgress
              color="secondary"
              size={24}
              className="mt-[25%]"
            />
          </div>
          <p className="text-center mt-[10%] text-base">
            Cargando descuentos...
          </p>
        </div>
      </div>
    );
  }

  if (!discountsArrayList.length) {
    return (
      <div className="w-screen flex justify-center border-[2px]">
        <div className="w-full custom-w-450 h-screen border-[1px] border-black rounded-2xl py-3 my-2">
          <h3 className="text-base text-center">Descuentos de:</h3>
          <h1 className="mt-2 text-2xl font-bold text-center text-[#FD7B03] pb-2">
            {businessName}
          </h1>
          <div className="w-full h-[4px] bg-gray-300 "></div>
          <p className="text-center">No hay descuentos disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen flex justify-center items-center">
      <div className="w-full custom-w-450:w-[380px] rounded-2xl pb-3 custom-w-450:pt-3 relative">
        <Image
          src={"https://discount-project-backend.onrender.com/" + urlImageBusinessDetail}
          //src={"http://localhost:5050/" + urlImageBusinessDetail}
          alt="Imagen descuento"
          width={300}
          height={200}
          className="w-full custom-w-450:w-[380px] "
        />
        <div className="mb-16">
          <div className="w-full custom-w-450:w-[380px] bg-[#FD7B03] rounded-t-2xl absolute mt-[-12px] flex-row flex-wrap justify-center items-center gap-5">
            <p className="text-base text-center text-white">Descuentos de:</p>
            <p className="my-1 text-2xl font-bold text-center text-white">
              {businessName}
            </p>
            <p className="text-center text-white">* {businessType} *</p>
          </div>
        </div>
        {discountsArrayList.map(
          (discount) =>
            !discount.isDeleted && (
              <div key={discount._id} className="bg-white">
                <div className="py-5 border-gray-300 hover:border-[#FFCF91] border-[2px] hover:border-[4px] cursor-pointer">
                  <Link
                    href={"/discountDetail"}
                    onClick={() => [
                      setDiscountId(discount._id),
                      Cookies.set("discountId", discount._id, {
                        expires: 1,
                        secure: true,
                        sameSite: "strict",
                      }),
                    ]}
                  >
                    <p className="text-[14px] font-bold text-center mb-[10px]">
                      {discount.title}
                    </p>
                    <div className="h-auto flex flex-row flex-wrap">
                      <div className="w-1/2 flex items-center">
                        <p className="w-[90%] h-auto px-4 text-[12px] text-center">
                          {discount.description}
                        </p>
                      </div>
                      <div className="w-1/2 flex justify-center items-start relative">
                        <Image
                          src={"https://discount-project-backend.onrender.com/" + discount.imageURL}
                          //src={"http://localhost:5050/" + discount.imageURL}
                          alt="Imagen descuento"
                          width={169}
                          height={112}
                          className="w-[169px] h-[112px]"
                        />
                        <p className="text-[10px] text-black bg-yellow-300 font-bold p-[4px] rounded-[30px] absolute bottom-[8px] left-[18px]">
                          - {discount.discountAmount} %
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-[20px] mt-[10px] justify-center">
                      <div className="flex flex-row items-center">
                        <p className="text-[12px] flex flex-row">Antes: </p>
                        <div className="relative flex flex-row justify-center">
                          <p className="text-[12px]">
                            $ {discount.normalPrice}
                          </p>
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
                  </Link>
                </div>
                <div className="w-full h-[4px] bg-gray-300 "></div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default MyDiscountsPage; */


//Funciona perfecto mostrado como desde un celular
/* import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import {
  businessDetail,
  discountsList,
  DiscountsList,
  Business,
} from "@/services/apiCall";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import CountdownTimer from "@/components/countdownTimer/CountdownTimer";
import { isAfter } from 'date-fns';

interface ErrorResponse {
  error: string;
}

const MyDiscountsPage = () => {
  const {
    businessId,
    businessName,
    setDiscountId,
    setSelectedOption,
    isLoggedIn,
    setUserRole,
    setBusinessId,
    setUserId,
    setUserName,
    setBusinessName,
    businessType,
    setBusinessType,
  } = useContext(Context);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [urlImageBusinessDetail, setUrlImageBusinessDetail] =
    useState<string>("");
  const [businessDetails, setBusinessDetails] = useState<Business | null>(null);
  const router = useRouter();
  const [userToken, setUserToken] = useState<string>("");

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

    setSelectedOption("Mi cuenta");
  }, [setSelectedOption, setBusinessId, setBusinessName, setBusinessType, setUserId, setUserName, setUserRole]);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (businessId && userToken) {
        try {
          const businessResponse = await businessDetail(businessId, userToken);
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
        if (businessId && userToken) {
          const response = await discountsList(businessId, userToken);
          if (typeof response !== "string") {
            // Filtramos los descuentos expirados antes de establecer el estado
            const now = new Date();
            const validDiscounts = response.filter(discount => 
              !discount.validityPeriod || !isAfter(now, new Date(discount.startDateTime).setDate(new Date(discount.startDateTime).getDate() + discount.validityPeriod))
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
  }, [userToken, businessId, setSelectedOption]);

  // Intervalo para actualizar descuentos
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDiscountsArrayList(prevDiscounts =>
        prevDiscounts.filter(discount => 
          !discount.validityPeriod || !isAfter(now, new Date(discount.startDateTime).setDate(new Date(discount.startDateTime).getDate() + discount.validityPeriod))
        )
      );
    }, 60000); // Comprobar cada minuto

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-full flex justify-center border-[2px]">
        <div className="w-full custom-w-450:w-[380px] border-[1px] border-black rounded-2xl py-3 my-2">
          <h3 className="text-base text-center">Descuentos de:</h3>
          <h1 className="mt-2 text-2xl font-bold text-center text-white pb-2">
            {businessName}
          </h1>
          <div className="w-full h-[4px] bg-gray-300 "></div>
          <div className="flex justify-center">
            <CircularProgress
              color="secondary"
              size={24}
              className="mt-[25%]"
            />
          </div>
          <p className="text-center mt-[10%] text-base">
            Cargando descuentos...
          </p>
        </div>
      </div>
    );
  }

  if (!discountsArrayList.length) {
    return (
      <div className="w-screen flex justify-center border-[2px]">
        <div className="w-full custom-w-450 h-screen border-[1px] border-black rounded-2xl py-3 my-2">
          <h3 className="text-base text-center">Descuentos de:</h3>
          <h1 className="mt-2 text-2xl font-bold text-center text-[#FD7B03] pb-2">
            {businessName}
          </h1>
          <div className="w-full h-[4px] bg-gray-300 "></div>
          <p className="text-center">No hay descuentos disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen flex justify-center items-center">
      <div className="w-full custom-w-450:w-[380px] custom-w-450:border-b-[2px] custom-w-450:border-b-gray-300 rounded-2xl pb-3 custom-w-450:my-5 relative">
        <Image
          src={"https://discount-project-backend.onrender.com/" + urlImageBusinessDetail}
          //src={"http://localhost:5050/" + urlImageBusinessDetail}
          alt="Imagen descuento"
          width={300}
          height={200}
          className="w-full custom-w-450:w-[380px] custom-w-450:rounded-t-2xl"
        />
        <div className="mb-16">
          <div className="w-full custom-w-450:w-[380px] bg-[#FD7B03] rounded-t-2xl absolute mt-[-12px] flex-row flex-wrap justify-center items-center gap-5">
            <p className="text-base text-center text-white">Descuentos de:</p>
            <p className="my-1 text-2xl font-bold text-center text-white">
              {businessName}
            </p>
            <p className="text-center text-white">* {businessType} *</p>
          </div>
        </div>
        {discountsArrayList.map(
          (discount) =>
            !discount.isDeleted && ( 
              <div key={discount._id} className="bg-white">
                <div className="py-5 border-gray-300 hover:border-[#FFCF91] border-[2px] hover:border-[4px] cursor-pointer">
                  <Link
                    href={"/discountDetail"}
                    onClick={() => [
                      setDiscountId(discount._id),
                      Cookies.set("discountId", discount._id, {
                        expires: 1,
                        secure: true,
                        sameSite: "strict",
                      }),
                    ]}
                  >
                    <p className="text-[14px] font-bold text-center mb-[10px]">
                      {discount.title}
                    </p>


                    <div className="w-full h-auto flex flex-row flex-wrap justify-evenly">
                      <div className="w-[45%] flex items-center ">
                        <p className="w-full h-auto text-[12px] text-left line-clamp-6 break-words">
                          {discount.description}
                        </p>
                      </div>
                      <div className="w-[45%] flex justify-center items-start relative">
                        <Image
                          src={"https://discount-project-backend.onrender.com/" + discount.imageURL}
                          //src={"http://localhost:5050/" + discount.imageURL}
                          alt="Imagen descuento"
                          width={169}
                          height={112}
                          className="w-[169px] h-[112px] rounded-md"
                        />
                        <p className="text-[10px] text-black bg-yellow-300 font-bold p-[4px] rounded-[30px] absolute bottom-[8px] left-[4%]"> 
                          - {discount.discountAmount} %
                        </p>
                      </div>
                    </div>


                    <div className="flex flex-row gap-[20px] mt-[10px] justify-center">
                      <div className="flex flex-row items-center">
                        <p className="text-[12px] flex flex-row">Antes: </p>
                        <div className="relative flex flex-row justify-center">
                          <p className="text-[12px]">
                            $ {discount.normalPrice}
                          </p>
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
                  </Link>
                </div>
                <div className="w-full h-[4px] bg-gray-300 "></div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default MyDiscountsPage; */



//Versión para ver los descuentos como cards funcionando
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import {
  businessDetail,
  discountsList,
  DiscountsList,
  Business,
} from "@/services/apiCall";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import CountdownTimer from "@/components/countdownTimer/CountdownTimer";
import { isAfter } from 'date-fns';
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";

interface ErrorResponse {
  error: string;
}

const MyDiscountsPage = () => {
  const {
    businessId,
    businessName,
    setDiscountId,
    setSelectedOption,
    isLoggedIn,
    setUserRole,
    setBusinessId,
    setUserId,
    setUserName,
    setBusinessName,
    businessType,
    setBusinessType,
  } = useContext(Context);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [urlImageBusinessDetail, setUrlImageBusinessDetail] =
    useState<string>("");
  const [businessDetails, setBusinessDetails] = useState<Business | null>(null);
  const router = useRouter();
  const [userToken, setUserToken] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para manejar el modal TokenExpiredModal.tsx


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

    setSelectedOption("Mi cuenta");
  }, [setSelectedOption, setBusinessId, setBusinessName, setBusinessType, setUserId, setUserName, setUserRole]);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (businessId && userToken) {
        try {
          const businessResponse = await businessDetail(businessId, userToken);
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
        if (businessId && userToken) {
          const response = await discountsList(businessId, userToken);

          if(response === "Token inválido o expirado") {
            setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
          }
          if (typeof response !== "string") {
            // Filtramos los descuentos expirados antes de establecer el estado
            const now = new Date();
            const validDiscounts = response.filter(discount => 
              !discount.validityPeriod || !isAfter(now, new Date(discount.startDateTime).setDate(new Date(discount.startDateTime).getDate() + discount.validityPeriod))
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
  }, [userToken, businessId, setSelectedOption]);

  // Intervalo para actualizar descuentos
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDiscountsArrayList(prevDiscounts =>
        prevDiscounts.filter(discount => 
          !discount.validityPeriod || !isAfter(now, new Date(discount.startDateTime).setDate(new Date(discount.startDateTime).getDate() + discount.validityPeriod))
        )
      );
    }, 60000); // Comprobar cada minuto

    return () => clearInterval(interval);
  }, []);

 /*  if (loading) {
    return (
      <div className="w-screen h-full flex justify-center border-[2px]">
        <div className="w-full custom-w-450:w-[380px] border-[1px] border-black rounded-2xl py-3 my-2">
          <h3 className="text-base text-center">Descuentos de:</h3>
          <h1 className="mt-2 text-2xl font-bold text-center text-white pb-2">
            {businessName}
          </h1>
          <div className="w-full h-[4px] bg-gray-300 "></div>
          <div className="flex justify-center">
            <CircularProgress
              color="secondary"
              size={24}
              className="mt-[25%]"
            />
          </div>
          <p className="text-center mt-[10%] text-base">
            Cargando descuentos...
          </p>
        </div>
      </div>
    );
  } */

  /* if (!discountsArrayList.length) {
    return (
      <div className="w-screen flex justify-center border-[2px]">
        <div className="w-full custom-w-450 h-screen border-[1px] border-black rounded-2xl py-3 my-2">
          <h3 className="text-base text-center">Descuentos de:</h3>
          <h1 className="mt-2 text-2xl font-bold text-center text-[#FD7B03] pb-2">
            {businessName}
          </h1>
          <div className="w-full h-[4px] bg-gray-300 "></div>
          <p className="text-center">No hay descuentos disponibles</p>
        </div>
      </div>
    );
  } */

  return (
    <>
      <TokenExpiredModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="screen py-5 box-border">
        <h2 className="text-center text-xl text-[gray] font-semibold md:text-2xl pb-2">Descuentos activos</h2>
        <h5 className="text-center text-xl text-[gray] font-semibold md:text-2xl pb-5">{businessName}</h5>
        <div className="w-full flex flex-col justify-center md:flex-row md:flex-wrap gap-10 md:justify-evenly items-center">
            {discountsArrayList.map(
              (discount) =>
                !discount.isDeleted && ( 
                  <div key={discount._id} className="w-full custom-w-450:w-[380px] px-2 custom-w-450:px-0 bg-white">
                    {/* <div className="w-full custom-w-450:w-[380px] border-[2px] border-gray-300 hover:border-[#FD7B03]    rounded-2xl cursor-pointer"> */}
                    <div className="w-full custom-w-450:w-[380px] py-5 border-[2px] border-gray-300 hover:border-hidden hover:outline hover:outline-[3px] hover:outline-[#FFCF91] hover:shadow-[0_0_0_6px_rgba(253,123,3,0.5)] rounded-2xl cursor-pointer">

                      <Link
                        href={"/discountDetail"}
                        onClick={() => [
                          setDiscountId(discount._id),
                          Cookies.set("discountId", discount._id, {
                            expires: 1,
                            secure: true,
                            sameSite: "strict",
                          }),
                        ]}
                      >
                        <p className="text-[14px] font-bold text-center mb-[10px]">
                          {discount.title}
                        </p>


                        <div className="w-full h-auto flex flex-row flex-wrap justify-evenly">
                          <div className="w-[45%] flex items-center ">
                            <p className="w-full h-auto text-[12px] text-left line-clamp-6 break-words">
                              {discount.description}
                            </p>
                          </div>
                          <div className="w-[45%] flex justify-center items-start relative">
                            <Image
                              src={"https://discount-project-backend.onrender.com/" + discount.imageURL}
                              //src={"http://localhost:5050/" + discount.imageURL}
                              alt="Imagen descuento"
                              width={169}
                              height={112}
                              className="w-[169px] h-[112px] rounded-md"
                            />
                            <p className="text-[10px] text-black bg-yellow-300 font-bold p-[4px] rounded-[30px] absolute bottom-[8px] left-[4%]"> 
                              - {discount.discountAmount} %
                            </p>
                          </div>
                        </div>


                        <div className="flex flex-row gap-[20px] mt-[10px] justify-center">
                          <div className="flex flex-row items-center">
                            <p className="text-[12px] flex flex-row">Antes: </p>
                            <div className="relative flex flex-row justify-center">
                              <p className="text-[12px]">
                                $ {discount.normalPrice}
                              </p>
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
                      </Link>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </>
  );
};

export default MyDiscountsPage;