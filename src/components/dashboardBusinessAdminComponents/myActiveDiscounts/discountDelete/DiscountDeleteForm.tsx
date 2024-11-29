"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/context/Context";
import { deleteDiscount, discountsList } from "@/services/apiCall";
import Cookies from "js-cookie";
import Button from "@/components/button/Button";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import { isAfter } from "date-fns";
import axios, { AxiosError } from "axios";
import MessageModal from "@/components/messageModal/MessageModal";

interface DiscountDeleteFormProps {
  setShowDiscountActionPage: (showDiscountActionPage: boolean) => void;
}

interface ErrorResponse {
  error: string;
}

const DiscountDeleteForm: React.FC<DiscountDeleteFormProps> = ({
  setShowDiscountActionPage,
}) => {
  const {
    discountId,
    setSelectedOption,
    isLoggedIn,
    discountRecovered,
    setDiscountId,
    setUserRole,
    setUserId,
    setUserName,
    setBusinessName,
    setBusinessId,
    setBusinessType,
    setDiscountsArrayList,
  } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userToken, setUserToken] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para manejar el modal TokenExpiredModal.tsx
  const navigation = useRouter();

  const [isOpenMessageModal, setIsOpenMessageModal] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const [messageTitle, setMessageTitle] = useState<string>("");
  const [messageRouterRedirection, setMessageRouterRedirection] =
    useState<string>("");
  const [selectedNavBarOption, setSelectedNavBarOption] = useState<string>("");

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (discountRecovered !== null) {
      console.log("Setting discount from discountRecovered", discountRecovered);
      //setDiscount(discountRecovered);

      const cookieDiscountId = Cookies.get("discountId") || "";
      setDiscountId(cookieDiscountId);
    }
  }, [discountRecovered, setDiscountId]);

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
    setBusinessId,
    setBusinessType,
    setDiscountId,
    setSelectedOption,
  ]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    setError(undefined);
    setIsLoading(true);
    try {
      const response = await deleteDiscount(discountId);
      if (response === "Token inválido o expirado") {
        setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
      }

      if (typeof response === "string") {
        console.log(
          "Valor que devuelve response dentro del if al eliminar el descuento: ",
          response
        );
        setError(response);
      } else if (response.success) {
        console.log(
          "Valor de responese.success en el else: ",
          response.success
        );
        setError("");
        //navigation.push('/myDiscounts'); // Redirige a la vista de Mis descuentos.

        const fetchDiscounts = async () => {
          try {
            if (userToken) {
              //console.log("Valor de userToken en fetchDiscounts: ", userToken);
              const response = await discountsList();

              if (response === "Token inválido o expirado en discountList") {
                setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
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
          }
        };

        fetchDiscounts();

        const title: string = "El descuento se ha eliminado exitosamente";
        setMessageTitle(title);

        const text: string = `Serás redirigido al listado de descuentos para verificar la eliminación del descuento.`;
        setMessageText(text);

        const route: string = "/dashboardBusinessAdmin";
        setMessageRouterRedirection(route);

        setIsOpenMessageModal(true);

        const navBarOption: string = "Mi cuenta";
        setSelectedNavBarOption(navBarOption);

        setTimeout(() => {
          setShowDiscountActionPage(false);
          const mainElement = document.querySelector("main");
          if (mainElement) {
            mainElement.scrollTo(0, 0);
          }
          setSelectedOption("Mi cuenta");
        }, 10000);
      } else {
        setError(response.message || "Error al eliminar el descuento");
      }
    } catch (err: any) {
      setError("Network error or server is unreachable");
    } finally {
      setIsLoading(false);
      closeModal(); // Cerramos el modal después de eliminar el descuento
    }
  };

  const confirmDelete = () => {
    handleDelete();
  };

  return (
    <>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className=" flex justify-center">
        <MessageModal
          isOpenMessageModal={isOpenMessageModal}
          onCloseMessageModal={() => setIsOpenMessageModal(false)}
          messageTitle={messageTitle}
          messageText={messageText}
          messageRouterRedirection={messageRouterRedirection}
          selectedNavBarOption={selectedNavBarOption}
        />

        <div className="w-full px-6 sm:w-[500px] sm:px-0 mt-[3%]">
          <div className="flex flex-col items-center mx-auto gap-6">
            <Button
              buttonText={isLoading ? "Cargando..." : "Eliminar Descuento"}
              onClickButton={openModal}
            />

            {error && (
              <p className="text-center mb-2 text-red-700 font-semibold">
                {error}
              </p>
            )}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                <div className="bg-white rounded-lg w-[85%] h-[300px] sm:w-[50%] sm:h-[50%] mx-auto text-center flex flex-col justify-evenly">
                  <p className="text-xl font-semibold">
                    ¿Estás seguro que deseas eliminar este descuento?
                  </p>
                  <div className="flex justify-center gap-4 px-2">
                    <button
                      onClick={confirmDelete}
                      className="w-[120px] bg-[#FFCF91] text-[18px] text-white font-semibold h-[40px] rounded-[20px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91]"
                      disabled={isLoading}
                    >
                      {isLoading ? "Cargando..." : "Eliminar"}
                    </button>
                    <button
                      onClick={closeModal}
                      className="w-[120px] bg-gray-300 text-[18px] text-gray-700 font-semibold h-[40px] rounded-[20px] border-[5px] border-gray-400 transition-colors duration-300 ease-in-out hover:bg-gray-400 hover:text-gray-900 hover:border-gray-900"
                      disabled={isLoading}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountDeleteForm;
