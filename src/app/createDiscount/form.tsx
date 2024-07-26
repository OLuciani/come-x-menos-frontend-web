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
  const navigation = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      const storedUserToken = Cookies.get("userToken") || "";
      setUserToken(storedUserToken);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setSelectedOption("Mi cuenta");
  }, []);

  const validationSchema = Yup.object({
    businessName: Yup.string()
      .min(2, "El nombre del negocio debe tener al menos 3 caracteres")
      .required("El nombre del negocio es requerido"),
    title: Yup.string()
      .min(3, "El título debe tener al menos 3 caracteres")
      .required("El título es requerido"),
    description: Yup.string()
      .min(3, "La descripción debe tener al menos 3 caracteres")
      .max(85, "la descripción no puede tener más de 80 caracteres")
      .required("La descripción es requerida"),
    normalPrice: Yup.string()
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
      formData.append("normalPrice", values.normalPrice); //Lo convierto a string para formData
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
          {formik.touched.title && formik.errors.title ? (
            <p className="text-red-700">{formik.errors.title}</p>
          ) : null}

          <div className="w-full flex justify-start text-sm font-normal text-[#FD7B03]">
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
            className="w-full min-h-24 border-[1px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
            required
          />

          <Input
            label="Precio normal sin descuento"
            placeholder=""
            type="text"
            name="normalPrice"
            value={formik.values.normalPrice} //Lo convierto en string
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            minLength={1}
          />
          {formik.touched.normalPrice && formik.errors.normalPrice ? (
            <p className="text-red-700">{formik.errors.normalPrice}</p>
          ) : null}

          <div className="w-full flex justify-start text-sm font-normal text-[#FD7B03]">
            <label className="text-sm font-medium text-black ml-3">
              Porcentaje de descuento a aplicar (%)
            </label>
          </div>
          <select
            name="discountAmount"
            value={formik.values.discountAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full h-[60px] border-[1px] border-[#FD7B03] rounded-[30px] px-3"
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
          {formik.touched.discountAmount && formik.errors.discountAmount ? (
            <p className="text-red-700">{formik.errors.discountAmount}</p>
          ) : null}

          <Input
            label="Cargar fotografía"
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
          {formik.touched.imageURL && formik.errors.imageURL ? (
            <p className="text-red-700">{formik.errors.imageURL}</p>
          ) : null}

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
          {formik.touched.validityPeriod && formik.errors.validityPeriod ? (
            <p className="text-red-700">{formik.errors.validityPeriod}</p>
          ) : null}

          <button
            type="submit"
            className="w-full bg-[#FFCF91] text-[18px] text-white font-semibold mt-3 h-[60px] rounded-[30px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91]"
            disabled={isLoading}
          >
            <div className="flex justify-center">
              <div className="w-[98%] bg-[#FD7B03] rounded-[30px] py-[7px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
                {isLoading ? "Cargando..." : "Enviar"}
              </div>
            </div>
          </button>
          {error && (
            <p className="text-center mb-2 text-red-700 font-semibold">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
