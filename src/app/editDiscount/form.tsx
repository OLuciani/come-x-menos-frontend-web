"use client";
import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { editDiscount, Discount } from "@/services/apiCall";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextareaAutosize from "react-textarea-autosize";
import axios, { AxiosError } from "axios";
import { Context } from "@/context/Context";

const FormEditDiscount: React.FC = () => {
  const { userToken, discountId, discountRecovered } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [discount, setDiscount] = useState<Discount | null>(null);
  const navigation = useRouter();

  useEffect(() => {
    if (discountRecovered !== null) {
      console.log("Setting discount from discountRecovered", discountRecovered);
      setDiscount(discountRecovered);
    }
  }, [discountRecovered]);

  const validationSchema = Yup.object({
    businessName: Yup.string()
      .min(3, "El nombre del negocio debe tener al menos 3 caracteres")
      .required("El nombre del negocio es requerido"),
    title: Yup.string()
      .min(3, "El título debe tener al menos 3 caracteres")
      .required("El título es requerido"),
    description: Yup.string()
      .min(3, "La descripción debe tener al menos 3 caracteres")
      .max(80, "La descripción no puede tener más de 80 caracteres")
      .required("La descripción es requerida"),
    normalPrice: Yup.string()
      .min(1, "El precio del descuento debe ser al menos 1")
      .required("El precio del descuento es requerido"),
    discountAmount: Yup.string()
      .min(1, "El porcentaje de descuento debe ser al menos 1")
      .required("El porcentaje de descuento es requerido"),
    imageURL: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: discount?.title || "",
      description: discount?.description || "",
      normalPrice: discount?.normalPrice || "",
      discountAmount: discount?.discountAmount || "",
      imageURL: null as File | Blob | null,
      businessName: discount?.businessName || "",
      businessId: discount?.businessId || "",
      businessType: discount?.businessType || "",
      isActive: discount?.isActive ?? true,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values before submission:", values);
      setError(undefined);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", values.normalPrice);
      formData.append("discountAmount", values.discountAmount);
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", String(values.isActive));

      if (values.imageURL instanceof File || values.imageURL instanceof Blob) {
        formData.append("imageURL", values.imageURL);
      } else if (discount && discount.imageURL) {
        formData.append("imageURL", discount.imageURL as Blob);
      }

      try {
        const response = await editDiscount(formData, userToken, discountId);
        if (typeof response === "object" && response !== null) {
          setError("");
          setTimeout(() => {
            navigation.push("/myDiscounts"); //Luego de editar el descuento se redirije a la vista de Mis descuentos.
          }, 2000);
        } else {
          setError(response);
        }
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          handleAxiosError(err);
        } else {
          console.error("Error inesperado:", err);
          setError("Ocurrió un error inesperado.");
        }
      } 
    },
  });

  const handleAxiosError = (error: AxiosError<any>) => {
    if (error.response) {
      console.error(
        "Error en la solicitud de actualización:",
        error.response.data
      );
      setError(
        error.response.data.error || "Error en la solicitud de actualización"
      );
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
      setError(
        "No se recibió respuesta del servidor. Intente de nuevo más tarde."
      );
    } else {
      console.error("Error al realizar la solicitud:", error.message);
      setError("Ocurrió un error al realizar la solicitud.");
    }
  };

  useEffect(() => {
    if (discount !== null) {
      console.log("Synchronizing formik values with discount state", discount);

      formik.setValues({
        title: discount.title || "",
        description: discount.description || "",
        normalPrice: discount.normalPrice || "",
        discountAmount: discount.discountAmount || "",
        businessName: discount.businessName || "",
        businessId: discount.businessId || "",
        businessType: discount.businessType || "",
        isActive: discount.isActive ?? true,
        imageURL: null,
      });
    }
  }, [discount]);

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
            value={formik.values.businessName}
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
            <label className="text-sm ml-[15px] mb-[-10px] font-medium text-black">
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
            className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
            required
          />

          <Input
            label="Precio normal sin descuento"
            placeholder=""
            type="number"
            name="normalPrice"
            value={formik.values.normalPrice}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            minLength={1}
          />
          {formik.touched.normalPrice && formik.errors.normalPrice ? (
            <p className="text-red-700">{formik.errors.normalPrice}</p>
          ) : null}

          <div className="w-full flex justify-start text-sm font-normal text-[#FD7B03]">
            <label className="text-sm font-medium text-black ml-3 mb-[-20px]">
              Porcentaje de descuento a aplicar (%)
            </label>
          </div>
          <select
            name="discountAmount"
            value={formik.values.discountAmount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full h-[60px] border-[2px] border-[#FD7B03] rounded-[30px] px-3"
          >
            {[...Array(100).keys()].map((i) => {
              const value = i + 1;
              return (
                <option
                  key={value}
                  value={value}
                  style={value % 5 === 0 ? { fontWeight: "bold" } : {}}
                >
                  {value} %
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

          <button
            type="submit"
            className="w-full bg-[#FFCF91] text-[18px] font-semibold text-white mt-3 h-[60px] rounded-[30px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91] cursor-pointer"
          >
            <div className="flex justify-center">
          <div className="w-[98%] bg-[#FD7B03] rounded-[30px] py-[7px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
            
            Enviar datos
          </div>
        </div>
          </button>

          {error && <p className="text-red-700">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default FormEditDiscount;
