"use client";
import React, { useState, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { invitationEmailToQrScannerUser } from "@/services/apiCall";
//import { Context } from "@/context/Context";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import MessageModal from "@/components/messageModal/MessageModal";

const InvitationQrScannerUser = () => {
  //const { businessName } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpenMessageModal, setIsOpenMessageModal] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const [messageTitle, setMessageTitle] = useState<string>("");

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
        const response = await invitationEmailToQrScannerUser(values);

        if(response === "Token inválido o expirado") {
          setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
        }  
        
        if(response.success === true) {
          //alert("Correo de invitación enviado con éxito.");
          const title: string = "Envío exitoso";
          setMessageTitle(title);
          const text: string = `El correo de invitación ha sido enviado exitosamente al nuevo usuario ${values.email} con acceso al escáner de la app móvil.` 
          setMessageText(text);
          

          setIsOpenMessageModal(true);

          
          /* setTimeout(() => {
              navigation.push("/dashboardBusinessAdmin"); //Luego de editar el descuento se redirije a la vista de Mis descuentos.
            }, 10000); */
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

      <MessageModal isOpenMessageModal={isOpenMessageModal} onCloseMessageModal={() => setIsOpenMessageModal(false)} messageTitle={messageTitle} messageText={messageText} />

      <div className="w-full min-h-screen bg-white rounded-lg shadow-lg flex flex-col items-center">
        <div className="p-4 lg:p-0 lg:pt-[10%]">
          <h1 className="text-xl lg:text-2xl text-center text-[black] font-semibold">
            Crear usuario c/acceso a Scanner
          </h1>

          <form
            className="flex flex-col items-center mx-auto gap-6"
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

export default InvitationQrScannerUser;

