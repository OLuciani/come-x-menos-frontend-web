"use client";
import React, { useState, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { invitationBusinessEmployeeUser } from "@/api/userService";
//import { invitationBusinessEmployeeUser, BusinessEmployee } from "@/services/apiCall";
import { Context } from "@/context/Context";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import MessageModal from "@/components/messageModal/MessageModal";
import Link from "next/link";
import { FaArrowLeft } from 'react-icons/fa';

interface InvitationBusinessEmployeeProps {
  setSection: (section: string) => void;
  setReduceHeight: (reduceHeight: boolean) => void;
}

const InvitationBusinessEmployeeUser: React.FC<InvitationBusinessEmployeeProps>  = ({ setSection, setReduceHeight }) => {
  const { setSelectedOption, businessName } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpenMessageModal, setIsOpenMessageModal] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const [messageTitle, setMessageTitle] = useState<string>("");
  const [messageRouterRedirection, setMessageRouterRedirection] = useState<string>("");
  const [selectedNavBarOption, setSelectedNavBarOption] = useState<string>("");


  const navigation = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(undefined);
      setIsLoading(true);
      try {
        // Enviar los datos del formulario al backend
        const response = await invitationBusinessEmployeeUser(values);

        if(response === "Token inválido o expirado") {
          setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
        }  
        
        if(response.success === true) {
          //alert("Correo de invitación enviado con éxito.");
          const title: string = "Envío exitoso";
          setMessageTitle(title);
          const text: string = `El correo de invitación ha sido enviado exitosamente a ${values.email} para crear cuenta asociada al negocio ${businessName} en la app como empleado.` 
          setMessageText(text);
          const route: string = "/dashboardBusinessAdmin";
          setMessageRouterRedirection(route);

          setIsOpenMessageModal(true);

          const navBarOption: string = "Mi cuenta";
          setSelectedNavBarOption(navBarOption);

          setTimeout(() => {   
            setSection("resumen");
            setReduceHeight(true);
            const mainElement = document.querySelector("main");
            if (mainElement) {
                mainElement.scrollTo(0, 0);
            }
          }, 10000);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <TokenExpiredModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <MessageModal isOpenMessageModal={isOpenMessageModal} onCloseMessageModal={() => setIsOpenMessageModal(false)} messageTitle={messageTitle} messageText={messageText} messageRouterRedirection={messageRouterRedirection} selectedNavBarOption={selectedNavBarOption} />

      <div className="w-full min-h-screen bg-white rounded-lg shadow-lg flex flex-col items-center">
        {/* <div className="w-screen mt-10 ml-10 md:ml-20">
          <Link
            href={"/dashboardBusinessAdmin"}
            onClick={() => setSelectedOption("Mi cuenta")}
          >
            <FaArrowLeft size={20} color="black" />
          </Link>
        </div> */}

        <div className="w-full mt-10 lg:mt-20 custom-w-450:w-[400px] md:w-[450px] py-4 px-2 lg:px-0">
          <h1 className="pt-4 pb-10 text-xl lg:text-2xl text-center text-[black] font-semibold">
            Crear usuario con rol de empleado
          </h1>

          <form
            className="flex flex-col items-center gap-6"
            onSubmit={formik.handleSubmit}
          >
            <Input
              label="Email"
              placeholder=""
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              minLength={3}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-700">{formik.errors.email}</p>
            ) : null}

            <Button
              buttonText={isLoading ? "Enviando..." : "Enviar Invitación"}
              disabled={isLoading}
            />

            {error && <p className="text-red-700">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default InvitationBusinessEmployeeUser;