"use client";
/* import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import { discountsList, DiscountsList } from "@/services/apiCall";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


const MyDiscountsPage = () => {
  const {
    userId,
    setUserId,
    newRole,
    setNewRole,
    userToken,
    setUserToken,
    setUserName,
    businessId,
    setBusinessId,
    discountId,
    setDiscountId,
    businessName,
    setBusinessName
  } = useContext(Context);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    const thereIsUserToken = localStorage.getItem("token");
    const thereIsUserRole = localStorage.getItem("role");
    const thereIsUserId = localStorage.getItem("_id");
    const thereIsUserName = localStorage.getItem("name");
    const thereIsBusinessId = localStorage.getItem("businessId")
    const thereIsBusinessName = localStorage.getItem("businessName");

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

    if (thereIsBusinessId) {
      setBusinessId(thereIsBusinessId);
    }

    if (thereIsBusinessName) {
      setBusinessName(thereIsBusinessName);
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
  }, []);

  return (
    <div className="w-screen flex justify-center border-[2px]">
      <div className="w-[380px] border-[1px] border-black rounded-2xl py-3 my-2">
        <h3 className="text-base text-center">Descuentos de:</h3>
        <h1 className="mt-2 text-2xl font-bold text-center text-[#FD7B03] pb-2">
          {businessName}
        </h1>
        <div className="w-full h-[4px] bg-gray-300 "></div>

        {discountsArrayList.map((discount) => (
          <div key={discount._id} className="bg-white hover:bg-[#FFCF91]">
            <div className="py-5">
              <Link
                href={"/discountDetail"}
                onClick={() => setDiscountId(discount._id)}
              >
                {" "}
                <p className="text-[14px] font-bold text-center mb-[10px]">
                  {discount.title}
                </p>
                <div className="h-auto flex flex-row flex-wrap">
                  <div className="w-1/2 flex items-center">
                    <p className="w-[100%] h-auto px-4 text-[12px] text-center">
                      {discount.description}
                    </p>
                  </div>
                  <div className="w-1/2  flex justify-center items-center relative">
                    <Image
                      src={"http://localhost:5050/" + discount.imageURL}
                      alt="Imagen descuento"
                      width={300}
                      height={200}
                      className="w-[90%]"
                    />

                    <p className="text-[10px] text-black bg-yellow-300 font-bold p-[4px] rounded-[30px] absolute bottom-[8px] left-[18px]">
                      - {discount.discountAmount} %
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
              </Link>
            </div>
            <div className="w-full h-[4px] bg-gray-300 "></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDiscountsPage; */




/* import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import { discountsList, DiscountsList } from "@/services/apiCall";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

interface ErrorResponse {
  error: string;
}

const MyDiscountsPage = () => {
  const {
    setUserId,
    setNewRole,
    setUserToken,
    setUserName,
    setBusinessId,
    setDiscountId,
    businessName,
    setBusinessName
  } = useContext(Context);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>([]);
  const router = useRouter();

  useEffect(() => {
    const thereIsUserToken = localStorage.getItem("token");
    const thereIsUserRole = localStorage.getItem("role");
    const thereIsUserId = localStorage.getItem("_id");
    const thereIsUserName = localStorage.getItem("name");
    const thereIsBusinessId = localStorage.getItem("businessId");
    const thereIsBusinessName = localStorage.getItem("businessName");

    if (thereIsUserToken) {
      setUserToken(thereIsUserToken);
    } else {
      console.log("No se encontró token en localStorage");
    }

    if (thereIsUserRole) {
      setNewRole(thereIsUserRole);
    } else {
      console.log("No se encontró role en localStorage");
    }

    if (thereIsUserId) {
      setUserId(thereIsUserId);
    } else {
      console.log("No se encontró userId en localStorage");
    }

    if (thereIsUserName) {
      setUserName(thereIsUserName);
    } else {
      console.log("No se encontró userName en localStorage");
    }

    if (thereIsBusinessId) {
      setBusinessId(thereIsBusinessId);
    } else {
      console.log("No se encontró businessId en localStorage");
    }

    if (thereIsBusinessName) {
      setBusinessName(thereIsBusinessName);
    } else {
      console.log("No se encontró businessName en localStorage");
    }
  }, [setUserToken, setNewRole, setUserId, setUserName, setBusinessId, setBusinessName]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const businessId = localStorage.getItem("businessId");
        const userToken = localStorage.getItem("token");

        if (businessId && userToken) {
          const response = await discountsList(businessId, userToken);
          if (typeof response !== "string") {
            console.log("Descuentos recibidos del backend: ", response); // Verifica si llegan datos
            setDiscountsArrayList(response); // Actualiza el estado con los descuentos recibidos
          } else {
            console.error("Error al obtener descuentos: ", response);
          }
        } else {
          console.error("No se puede obtener descuentos, falta businessId o userToken");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errorMessage = axiosError.response?.data.error || "Error en la solicitud de actualización";
          console.error("Error al obtener descuentos: ", errorMessage);
        } else {
          console.error("Error desconocido al obtener descuentos: ", error);
        }
      }
    };

    fetchDiscounts();
  }, []);

  if (!discountsArrayList.length) {
    return (
      <div className="w-screen flex justify-center border-[2px]">
        <div className="w-[380px] border-[1px] border-black rounded-2xl py-3 my-2">
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
    <div className="w-screen flex justify-center border-[2px]">
      <div className="w-[380px] border-[1px] border-black rounded-2xl py-3 my-2">
        <h3 className="text-base text-center">Descuentos de:</h3>
        <h1 className="mt-2 text-2xl font-bold text-center text-[#FD7B03] pb-2">
          {businessName}
        </h1>
        <div className="w-full h-[4px] bg-gray-300 "></div>

        {discountsArrayList.map((discount) => (
          <div key={discount._id} className="bg-white hover:shadow-lg hover:shadow-orange-500/50 transition-shadow duration-300 border border-gray-200">
            <div className="py-5">
              <Link href={"/discountDetail"} onClick={() => setDiscountId(discount._id)}>
                <p className="text-[14px] font-bold text-center mb-[10px]">
                  {discount.title}
                </p>
                <div className="h-auto flex flex-row flex-wrap">
                  <div className="w-1/2 flex items-center">
                    <p className="w-[100%] h-auto px-4 text-[12px] text-center">
                      {discount.description}
                    </p>
                  </div>
                  <div className="w-1/2 flex justify-center items-center relative">
                    <Image
                      src={"http://localhost:5050/" + discount.imageURL}
                      alt="Imagen descuento"
                      width={300}
                      height={200}
                      className="w-[90%]"
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
                      <p className="text-[12px]">$ {discount.normalPrice}</p>
                      <div className="absolute top-[50%] h-[1px] bg-black w-[110%]"></div>
                    </div>
                  </div>
                  <p className="flex flex-row text-[12px]">
                    Con Descuento: $ {discount.priceWithDiscount}
                  </p>
                </div>
              </Link>
            </div>
            <div className="w-full h-[4px] bg-gray-300 "></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDiscountsPage; */


import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/context/Context";
import { discountsList, DiscountsList } from "@/services/apiCall";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { CircularProgress } from "@mui/material";


interface ErrorResponse {
  error: string;
}

const MyDiscountsPage = () => {
  const {
    setUserId,
    setNewRole,
    setUserToken,
    setUserName,
    setBusinessId,
    setDiscountId,
    businessName,
    setBusinessName
  } = useContext(Context);
  const [discountsArrayList, setDiscountsArrayList] = useState<DiscountsList[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const router = useRouter();

  useEffect(() => {
    const thereIsUserToken = localStorage.getItem("token");
    const thereIsUserRole = localStorage.getItem("role");
    const thereIsUserId = localStorage.getItem("_id");
    const thereIsUserName = localStorage.getItem("name");
    const thereIsBusinessId = localStorage.getItem("businessId");
    const thereIsBusinessName = localStorage.getItem("businessName");

    if (thereIsUserToken) {
      setUserToken(thereIsUserToken);
    } else {
      console.log("No se encontró token en localStorage");
    }

    if (thereIsUserRole) {
      setNewRole(thereIsUserRole);
    } else {
      console.log("No se encontró role en localStorage");
    }

    if (thereIsUserId) {
      setUserId(thereIsUserId);
    } else {
      console.log("No se encontró userId en localStorage");
    }

    if (thereIsUserName) {
      setUserName(thereIsUserName);
    } else {
      console.log("No se encontró userName en localStorage");
    }

    if (thereIsBusinessId) {
      setBusinessId(thereIsBusinessId);
    } else {
      console.log("No se encontró businessId en localStorage");
    }

    if (thereIsBusinessName) {
      setBusinessName(thereIsBusinessName);
    } else {
      console.log("No se encontró businessName en localStorage");
    }
  }, [setUserToken, setNewRole, setUserId, setUserName, setBusinessId, setBusinessName]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const businessId = localStorage.getItem("businessId");
        const userToken = localStorage.getItem("token");

        if (businessId && userToken) {
          const response = await discountsList(businessId, userToken);
          if (typeof response !== "string") {
            console.log("Descuentos recibidos del backend: ", response); // Verifica si llegan datos
            setDiscountsArrayList(response); // Actualiza el estado con los descuentos recibidos
          } else {
            console.error("Error al obtener descuentos: ", response);
          }
        } else {
          console.error("No se puede obtener descuentos, falta businessId o userToken");
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errorMessage = axiosError.response?.data.error || "Error en la solicitud de actualización";
          console.error("Error al obtener descuentos: ", errorMessage);
        } else {
          console.error("Error desconocido al obtener descuentos: ", error);
        }
      } finally {
        setLoading(false); // Finalmente, la carga ha terminado
      }
    };

    fetchDiscounts();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-full flex justify-center border-[2px]">
        <div className="w-[380px] border-[1px] border-black rounded-2xl py-3 my-2">
          <h3 className="text-base text-center">Descuentos de:</h3>
          <h1 className="mt-2 text-2xl font-bold text-center text-[#FD7B03] pb-2">
            {businessName}
          </h1>
          <div className="w-full h-[4px] bg-gray-300 "></div>

          <div className="flex justify-center">
            <CircularProgress color="secondary" size={24} className="mt-[25%]" /> {/* Ícono de carga giratorio */}
          </div>
          <p className="text-center mt-[10%] text-base">Cargando descuentos...</p>

        </div>
      </div>
    );
  }

  if (!discountsArrayList.length) {
    return (
      <div className="w-screen flex justify-center border-[2px]">
        <div className="w-[380px] border-[1px] border-black rounded-2xl py-3 my-2">
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
    <div className="w-screen flex justify-center border-[2px]">
      <div className="w-[380px] border-[1px] border-black rounded-2xl py-3 my-2">
        <h3 className="text-base text-center">Descuentos de:</h3>
        <h1 className="mt-2 text-2xl font-bold text-center text-[#FD7B03] pb-2">
          {businessName}
        </h1>
        <div className="w-full h-[4px] bg-gray-300 "></div>

        {discountsArrayList.map((discount) => (
          //<div key={discount._id} className="bg-white hover:shadow-lg hover:shadow-orange-500/50 transition-shadow duration-300 border border-gray-200">
          <div key={discount._id} className="bg-white hover:bg-[#FFCF91]">
            <div className="py-5">
              <Link href={"/discountDetail"} onClick={() => setDiscountId(discount._id)}>
                <p className="text-[14px] font-bold text-center mb-[10px]">
                  {discount.title}
                </p>
                <div className="h-auto flex flex-row flex-wrap">
                  <div className="w-1/2 flex items-center">
                    <p className="w-[100%] h-auto px-4 text-[12px] text-center">
                      {discount.description}
                    </p>
                  </div>
                  <div className="w-1/2 flex justify-center items-center relative">
                    <Image
                      src={"http://localhost:5050/" + discount.imageURL}
                      alt="Imagen descuento"
                      width={300}
                      height={200}
                      className="w-[90%]"
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
                      <p className="text-[12px]">$ {discount.normalPrice}</p>
                      <div className="absolute top-[50%] h-[1px] bg-black w-[110%]"></div>
                    </div>
                  </div>
                  <p className="flex flex-row text-[12px]">
                    Con Descuento: $ {discount.priceWithDiscount}
                  </p>
                </div>
              </Link>
            </div>
            <div className="w-full h-[4px] bg-gray-300 "></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDiscountsPage;

