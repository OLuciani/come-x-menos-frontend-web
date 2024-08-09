"use client";
import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createDiscount } from "@/services/apiCall";
import { Context } from "@/context/Context";
import TextareaAutosize from "react-textarea-autosize";
import Cookies from "js-cookie";
import Button from "@/components/button/Button";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";

export default function FormCreateDiscount() {
  const {
    userId,
    setUserId,
    userRole,
    setUserRole,
    setUserName,
    setBusinessName,
    businessName,
    businessId,
    setBusinessId,
    businessType,
    setBusinessType,
    setSelectedOption,
    isLoggedIn,
  } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para manejar el modal TokenExpiredModal.tsx
  const navigation = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setSelectedOption("Mi cuenta");
  }, [setSelectedOption]);

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

    /* const cookieDiscountId = Cookies.get("discountId") || "";
    setDiscountId(cookieDiscountId); */

   setSelectedOption("Mi cuenta");

}, [setUserToken,
    setUserRole,
    setUserId,
    setUserName,
    setBusinessName,
    setBusinessId,
    setBusinessType,
    //setDiscountId,
    setSelectedOption
    ]);   

  const validationSchema = Yup.object({
    businessName: Yup.string()
      .min(2, "El nombre del negocio debe tener al menos 3 caracteres")
      .required("El nombre del negocio es requerido"),
    title: Yup.string()
      .min(3, "El título debe tener al menos 3 caracteres")
      .required("El título es requerido"),
    description: Yup.string()
      .min(3, "La descripción debe tener al menos 3 caracteres")
      .max(130, "La descripción no puede tener más de 130 caracteres")
      .required("La descripción es requerida"),
    normalPrice: Yup.number()
      .min(1, "El precio del descuento debe tener al menos 1 caracter")
      .required("El precio del descuento es requerido."),
    discountAmount: Yup.string()
      .min(1, "El porcentaje de descuento debe tener al menos 1 caracter")
      .required("El porcentaje de descuento es requerido."),
    imageURL: Yup.mixed().required("El archivo de imagen es requerido"),
    validityPeriod: Yup.number()
      .nullable()
      .min(1, "La duración mínima del descuento es 1 día"), // Es opcional, y en caso de implementar a duración  lo mínimo es 1 día
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      normalPrice: "",
      discountAmount: "",
      imageURL: null,
      businessName: businessName,
      businessId: businessId,
      businessType: businessType,
      isActive: true,
      validityPeriod: null as number | null, // Asegurar que es número o null
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(undefined);
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", values.normalPrice.toString()); //Lo convierto a string para formData
      formData.append("discountAmount", values.discountAmount); //Lo convierto a string para formData
      if (values.imageURL) formData.append("imageURL", values.imageURL);
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", values.isActive.toString()); // Para enviarlo con formData lo debo convertir de boolean a string.
      if (values.validityPeriod !== null) {
        formData.append("validityPeriod", values.validityPeriod.toString());
      }

      try {
        const response = await createDiscount(formData, userToken);
        if(response === "Token inválido o expirado") {
          setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
        }

        if (typeof response === "object" && response !== null) {
          setError("");
          setTimeout(() => {
            navigation.push("/myDiscounts"); //Luego de crear un descuento se redirije a la vista de Mis descuentos.
          }, 2000);
        } else {
          setError(response);
        }
      } catch (err: any) {
        setError("Network error or server is unreachable");
      } finally {
        setIsLoading(false);
      }
    },
  });
  
  return (
    <>
      <TokenExpiredModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="w-sreen flex justify-center">
        <div className="w-full px-6 sm:w-[500px] sm:px-0">
          <form
            className="flex flex-col items-center mx-auto gap-6"
            onSubmit={formik.handleSubmit}
          >
            
            <input
              type="hidden"
              name="businessName"
              value={businessName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <div className="w-full">
              <Input
                label="Título del descuento"
                placeholder="Mi descuento"
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                minLength={3}
              />
              
              {(formik.touched.title || formik.submitCount > 0) && formik.errors.title ? (
                <p className="text-red-700 text-center mt-1">{formik.errors.title}</p>
              ) : null}
            </div>


            <div className="w-full">
              <div className="w-full flex justify-start text-sm font-normal mb-3">
                <label className="text-sm font-medium text-black ml-3">
                  Descripción del descuento
                </label>
              </div>
              <TextareaAutosize
                id="message"
                name="description"
                placeholder="Haz una descripción de tu oferta de descuento de no más de 85 caracteres."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
                className="w-full min-h-24 border-[1px] border-[gray] rounded-[10px] mt-[-10px] p-2 focus:outline-none focus:border-[2px]"
                required
              />

              {(formik.touched.description || formik.submitCount > 0) && formik.errors.description ? (
                <p className="text-red-700 text-center mt-1">{formik.errors.description}</p>
              ) : null}
            </div>


            <div className="w-full">
            <div className="w-full flex justify-start text-sm font-normal mb-1.5">
                <label className="text-sm font-medium text-black ml-3">
                Precio normal sin descuento
                </label>
              </div>
              <input
                //label="Precio normal sin descuento (en números y sin el signo $)"
                className="w-full border border-[gray] rounded-[10px] h-[50px] px-3 focus:outline-none focus:border-[2px] no-spin"
                placeholder=""
                type="number"
                name="normalPrice"
                value={formik.values.normalPrice} //Lo convierto en string
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                minLength={1}
              />
              
              {(formik.touched.normalPrice || formik.submitCount > 0) && formik.errors.normalPrice ? (
                <p className="text-red-700 text-center mt-1">{formik.errors.normalPrice}</p>
              ) : null}
            </div>


            <div className="w-full">
              <div className="w-full flex justify-start text-sm font-normal mb-1">
                <label className="text-sm font-medium text-black ml-3">
                  Porcentaje de descuento a aplicar (%)
                </label>
              </div>
              <select
                name="discountAmount"
                value={formik.values.discountAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-[50px] border-[1px] border-[gray] rounded-[10px] px-3 focus:outline-none focus:border-[2px]"
              >
                {[...Array(100).keys()].map((i) => {
                  const value = i + 1;
                  return (
                    <option
                      key={value}
                      value={value}
                      style={value % 5 === 0 ? { fontWeight: "bold" } : {}}
                    >
                      {value}%
                    </option>
                  );
                })}
              </select>
              
              {(formik.touched.discountAmount || formik.submitCount > 0) && formik.errors.discountAmount ? (
                <p className="text-red-700 text-center mt-1">{formik.errors.discountAmount}</p>
              ) : null}
            </div>


            <div className="w-full">
              <Input
                label="Cargar imagen"
                placeholder=""
                type="file"
                name="imageURL"
                onChange={(event) => {
                  if (event.currentTarget.files && event.currentTarget.files[0]) {
                    formik.setFieldValue("imageURL", event.currentTarget.files[0]);
                  } else {
                    formik.setFieldValue("imageURL", null); // Limpiar el valor si se cancela la selección
                  }
                }}
                onBlur={formik.handleBlur}
                value={formik.values.imageURL}
              />
            
              {(formik.touched.imageURL || formik.submitCount > 0) && formik.errors.imageURL ? (
                <p className="text-red-700 text-center mt-1">{formik.errors.imageURL}</p>
              ) : null}
            </div>


            <div className="w-full">
              <Input
                label="Periodo de Validez del descuento (Es opcional, y por días)"
                placeholder="1"
                type="number"
                name="validityPeriod"
                value={
                  formik.values.validityPeriod
                    ? formik.values.validityPeriod.toString()
                    : ""
                } // Convertir a cadena o dejar vacío
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              
              {(formik.touched.validityPeriod || formik.submitCount > 0) && formik.errors.validityPeriod ? (
                <p className="text-red-700 text-center mt-1">{formik.errors.validityPeriod}</p>
              ) : null}
            </div>

            <Button buttonText={isLoading ? "Cargando..." : "Enviar"} />  
            
            {error && (
              <p className="text-center mb-2 text-red-700 font-semibold">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
