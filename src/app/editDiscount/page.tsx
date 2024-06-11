"use client";
/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editDiscountModal, Discount } from "@/services/apiCall";
import { Context } from "@/context/Context";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

const FormEditDiscount: React.FC = () => {
  const { userToken, discountId, discountRecovered } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [discount, setDiscount] = useState<Discount | null>(null);

  const navigation = useRouter();

  useEffect(() => {
    if (discountRecovered !== null) {
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
      .min(1, "El precio del descuento debe tener al menos 1 caracter")
      .required("El precio del descuento es requerido"),
    discountAmount: Yup.string()
      .min(1, "El porcentaje de descuento debe tener al menos 1 caracter")
      .required("El porcentaje de descuento es requerido"),
    imageURL: Yup.mixed().nullable(), // Permitir valor nulo
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      normalPrice: "",
      discountAmount: "",
      //imageURL: null,
      businessName: "",
      businessId: "",
      businessType: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(undefined);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", values.normalPrice);
      formData.append("discountAmount", values.discountAmount);
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", values.isActive.toString());

      try {
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error in editDiscountModal:", error);
        if (axios.isAxiosError(error)) {
          return error.response?.data || "Error desconocido";
        } else if (error instanceof Error) {
          return error.message;
        } else {
          return "Error desconocido";
        }
      }
    },
  });

  useEffect(() => {
    // Synchronize formik values with discount state
    if (discount !== null) {
      formik.setValues({
        title: discount.title,
        description: discount.description,
        normalPrice: discount.normalPrice,
        discountAmount: discount.discountAmount,
        businessName: discount.businessName,
        businessId: discount.businessId,
        businessType: discount.businessType,
        isActive: discount.isActive,
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
          required
        />

        <Input
          label="Precio normal sin descuento"
          placeholder=""
          type="text"
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
          <label className="text-sm font-medium text-black ml-3">
            Porcentaje de descuento (%)
          </label>
        </div>
        <Input
          label="Porcentaje de descuento"
          placeholder=""
          type="text"
          name="discountAmount"
          value={formik.values.discountAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.discountAmount && formik.errors.discountAmount ? (
          <p className="text-red-700">{formik.errors.discountAmount}</p>
        ) : null}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount;
 */

/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Discount } from "@/services/apiCall";
import { Context } from "@/context/Context";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

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
      .min(1, "El precio del descuento debe tener al menos 1 caracter")
      .required("El precio del descuento es requerido"),
    discountAmount: Yup.string()
      .min(1, "El porcentaje de descuento debe tener al menos 1 caracter")
      .required("El porcentaje de descuento es requerido"),
    imageURL: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      normalPrice: "",
      discountAmount: "",
      imageURL: null,
      businessName: "",
      businessId: "",
      businessType: "",
      isActive: true,
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
      formData.append("isActive", values.isActive.toString());

      try {
        console.log("Sending request to backend with data:", formData);
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Response from backend:", response.data);
        return response.data;
        navigation.push("/login");
      } catch (error) {
        console.error("Error in editDiscountModal:", error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data || "Error desconocido");
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error desconocido");
        }
      }
    },
  });

  useEffect(() => {
    if (discount !== null) {
      console.log("Synchronizing formik values with discount state", discount);
      formik.setValues({
        title: discount.title,
        description: discount.description,
        normalPrice: discount.normalPrice,
        discountAmount: discount.discountAmount,
        businessName: discount.businessName,
        businessId: discount.businessId,
        businessType: discount.businessType,
        isActive: discount.isActive,
        imageURL: null,
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
          required
        />

        <Input
          label="Precio normal sin descuento"
          placeholder=""
          type="text"
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
          <label className="text-sm font-medium text-black ml-3">
            Porcentaje de descuento (%)
          </label>
        </div>
        <Input
          label="Porcentaje de descuento"
          placeholder=""
          type="text"
          name="discountAmount"
          value={formik.values.discountAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.discountAmount && formik.errors.discountAmount ? (
          <p className="text-red-700">{formik.errors.discountAmount}</p>
        ) : null}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount; */

/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Discount } from "@/services/apiCall";
import { Context } from "@/context/Context";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

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
      .min(1, "El precio del descuento debe tener al menos 1 caracter")
      .required("El precio del descuento es requerido"),
    discountAmount: Yup.string()
      .min(1, "El porcentaje de descuento debe tener al menos 1 caracter")
      .required("El porcentaje de descuento es requerido"),
    imageURL: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      normalPrice: "",
      discountAmount: "",
      imageURL: null,
      businessName: "",
      businessId: "",
      businessType: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values before submission:", values);
      setError(undefined);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", values.normalPrice.toString());
      formData.append("discountAmount", values.discountAmount.toString());
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", values.isActive.toString());

      // Debugging FormData contents
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      try {
        console.log("Sending request to backend with data:", formData);
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Response from backend:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error in editDiscountModal:", error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data || "Error desconocido");
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error desconocido");
        }
      }
    },
  });

  useEffect(() => {
    if (discount !== null) {
      console.log("Synchronizing formik values with discount state", discount);
      formik.setValues({
        title: discount.title,
        description: discount.description,
        normalPrice: discount.normalPrice,
        discountAmount: discount.discountAmount.toString(),
        businessName: discount.businessName,
        businessId: discount.businessId,
        businessType: discount.businessType,
        isActive: discount.isActive,
        imageURL: null,
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
          required
        />

        <Input
          label="Precio normal sin descuento"
          placeholder=""
          type="text"
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
          <label className="text-sm font-medium text-black ml-3">
            Porcentaje de descuento (%)
          </label>
        </div>
        <Input
          label="Porcentaje de descuento"
          placeholder=""
          type="text"
          name="discountAmount"
          value={formik.values.discountAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.discountAmount && formik.errors.discountAmount ? (
          <p className="text-red-700">{formik.errors.discountAmount}</p>
        ) : null}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount; */

/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Discount } from "@/services/apiCall";
import { Context } from "@/context/Context";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";

const FormEditDiscount: React.FC = () => {
  const { userToken, discountId, discountRecovered } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [discount, setDiscount] = useState<Discount | null>(null);
  const router = useRouter();

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
      .min(1, "El precio del descuento debe tener al menos 1 caracter")
      .required("El precio del descuento es requerido"),
    discountAmount: Yup.string()
      .min(1, "El porcentaje de descuento debe tener al menos 1 caracter")
      .required("El porcentaje de descuento es requerido"),
    imageURL: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      normalPrice: "",
      discountAmount: "",
      imageURL: null,
      businessName: "",
      businessId: "",
      businessType: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values before submission:", values);
      setError(undefined);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", values.normalPrice.toString());
      formData.append("discountAmount", values.discountAmount.toString());
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", values.isActive.toString());

      // Debugging FormData contents
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      try {
        console.log("Sending request to backend with data:", formData);
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Response from backend:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error in editDiscountModal:", error);
        if (axios.isAxiosError(error)) {
          setError(error.response?.data || "Error desconocido");
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Error desconocido");
        }
      }
    },
  });

  useEffect(() => {
    if (discount !== null) {
      console.log("Synchronizing formik values with discount state", discount);
      formik.setValues({
        title: discount.title,
        description: discount.description,
        normalPrice: discount.normalPrice,
        discountAmount: discount.discountAmount.toString(),
        businessName: discount.businessName,
        businessId: discount.businessId,
        businessType: discount.businessType,
        isActive: discount.isActive,
        imageURL: null,
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
          required
        />

        <Input
          label="Precio normal sin descuento"
          placeholder=""
          type="text"
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
          <label className="text-sm font-medium text-black ml-3">
            Porcentaje de descuento (%)
          </label>
        </div>
        <Input
          label="Porcentaje de descuento"
          placeholder=""
          type="text"
          name="discountAmount"
          value={formik.values.discountAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.discountAmount && formik.errors.discountAmount ? (
          <p className="text-red-700">{formik.errors.discountAmount}</p>
        ) : null}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount;
 */

/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { Discount } from "@/services/apiCall";

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
  const router = useRouter();

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
      .min(1, "El precio del descuento debe tener al menos 1 caracter")
      .required("El precio del descuento es requerido"),
    discountAmount: Yup.string()
      .min(1, "El porcentaje de descuento debe tener al menos 1 caracter")
      .required("El porcentaje de descuento es requerido"),
    imageURL: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      normalPrice: "",
      discountAmount: "",
      imageURL: null,
      businessName: "",
      businessId: "",
      businessType: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values before submission:", values);
      setError(undefined);

      const formData = new FormData();
      console.log("Valor de normalPrice en formData: ", values.normalPrice);
      console.log("Valor de discountAmount en formData: ", values.discountAmount);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", values.normalPrice);
      formData.append("discountAmount", values.discountAmount);
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", values.isActive.toString());

      // Debugging FormData contents
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      try {
        console.log("Sending request to backend with data:", formData);
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Response from backend:", response.data);

        // Manejar la respuesta exitosa aquí, si es necesario

        return response.data;
      } catch (error) {
        console.error("Error in editDiscount:", error);

        if (axios.isAxiosError(error)) {
          handleAxiosError(error);
        } else {
          setError("Ocurrió un error al realizar la solicitud.");
        }
      }
    },
  });

  const handleAxiosError = (error: AxiosError<any>) => {
    if (error.response) {
      // Error de respuesta desde el servidor
      console.error("Error en la solicitud de actualización:", error.response.data);
      setError(error.response.data.error || "Error en la solicitud de actualización");
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
      setError("No se recibió respuesta del servidor. Intente de nuevo más tarde.");
    } else {
      // Otro tipo de error
      console.error("Error al realizar la solicitud:", error.message);
      setError("Ocurrió un error al realizar la solicitud.");
    }
  };

  useEffect(() => {
    if (discount !== null) {
      console.log("Synchronizing formik values with discount state", discount);

      console.log("Valor de normalPrice en formik.setValues: ", discount.normalPrice.toString());
      console.log("Valor de discountAmount en formik.formData: ", discount.discountAmount.toString());
      formik.setValues({
        title: discount.title,
        description: discount.description,
        normalPrice: discount.normalPrice.toString(),
        discountAmount: discount.discountAmount.toString(),
        businessName: discount.businessName,
        businessId: discount.businessId,
        businessType: discount.businessType,
        isActive: discount.isActive,
        imageURL: null,
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
          required
        />

        <Input
          label="Precio normal sin descuento"
          placeholder=""
          type="text"
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
          <label className="text-sm font-medium text-black ml-3">
            Porcentaje de descuento (%)
          </label>
        </div>
        <Input
          label="Porcentaje de descuento"
          placeholder=""
          type="text"
          name="discountAmount"
          value={formik.values.discountAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.discountAmount && formik.errors.discountAmount ? (
          <p className="text-red-700">{formik.errors.discountAmount}</p>
        ) : null}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount;
 */

/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { Discount } from "@/services/apiCall";
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
  const router = useRouter();

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
    normalPrice: Yup.string() // Cambiado a Yup.string()
      .min(1, "El precio del descuento debe ser al menos 1")
      .required("El precio del descuento es requerido"),
    discountAmount: Yup.string() // Cambiado a Yup.string()
      .min(1, "El porcentaje de descuento debe ser al menos 1")
      .required("El porcentaje de descuento es requerido"),
    imageURL: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      normalPrice: "0", // Inicializado como cadena
      discountAmount: "0", // Inicializado como cadena
      imageURL: null,
      businessName: "",
      businessId: "",
      businessType: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values before submission:", values);
      setError(undefined);

      const formData = new FormData();
      console.log("Valor de normalPrice en formData: ", values.normalPrice);
      console.log("Valor de discountAmount en formData: ", values.discountAmount);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", values.normalPrice); // No es necesario convertir a string
      formData.append("discountAmount", values.discountAmount); // No es necesario convertir a string
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", values.isActive.toString());

      // Debugging FormData contents
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      try {
        console.log("Sending request to backend with data:", formData);
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Response from backend:", response.data);

        // Manejar la respuesta exitosa aquí, si es necesario

        return response.data;
      } catch (error) {
        console.error("Error in editDiscount:", error);

        if (axios.isAxiosError(error)) {
          handleAxiosError(error);
        } else {
          setError("Ocurrió un error al realizar la solicitud.");
        }
      }
    },
  });

  const handleAxiosError = (error: AxiosError<any>) => {
    if (error.response) {
      // Error de respuesta desde el servidor
      console.error("Error en la solicitud de actualización:", error.response.data);
      setError(error.response.data.error || "Error en la solicitud de actualización");
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
      setError("No se recibió respuesta del servidor. Intente de nuevo más tarde.");
    } else {
      // Otro tipo de error
      console.error("Error al realizar la solicitud:", error.message);
      setError("Ocurrió un error al realizar la solicitud.");
    }
  };

  useEffect(() => {
    if (discount !== null) {
      console.log("Synchronizing formik values with discount state", discount);

      console.log("Valor de normalPrice en formik.setValues: ", discount.normalPrice);
      console.log("Valor de discountAmount en formik.formData: ", discount.discountAmount);
      formik.setValues({
        title: discount.title,
        description: discount.description,
        normalPrice: discount.normalPrice,
        discountAmount: discount.discountAmount,
        businessName: discount.businessName,
        businessId: discount.businessId,
        businessType: discount.businessType,
        isActive: discount.isActive,
        imageURL: null,
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
          required
        />

        <Input
          label="Precio normal sin descuento"
          placeholder=""
          type="number"
          name="normalPrice"
          value={formik.values.normalPrice} // Mantenido como cadena
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.normalPrice && formik.errors.normalPrice ? (
          <p className="text-red-700">{formik.errors.normalPrice}</p>
        ) : null}

        <div className="w-full flex justify-start text-sm font-normal text-[#FD7B03]">
          <label className="text-sm font-medium text-black ml-3">
            Porcentaje de descuento (%)
          </label>
        </div>
        <Input
          label="Porcentaje de descuento"
          placeholder=""
          type="number"
          name="discountAmount"
          value={formik.values.discountAmount} // Mantenido como cadena
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.discountAmount && formik.errors.discountAmount ? (
          <p className="text-red-700">{formik.errors.discountAmount}</p>
        ) : null}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount;
 */

/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { Discount } from "@/services/apiCall";
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
  const router = useRouter();

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
    normalPrice: Yup.number() // Cambiado a Yup.number()
      .min(1, "El precio del descuento debe ser al menos 1")
      .required("El precio del descuento es requerido"),
    discountAmount: Yup.number() // Cambiado a Yup.number()
      .min(1, "El porcentaje de descuento debe ser al menos 1")
      .required("El porcentaje de descuento es requerido"),
    imageURL: Yup.mixed().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      normalPrice: '', // Inicializado como número
      discountAmount: '', // Inicializado como número
      imageURL: null,
      businessName: "",
      businessId: "",
      businessType: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values before submission:", values);
      setError(undefined);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", String(values.normalPrice)); // Convertir a cadena explícitamente
      formData.append("discountAmount", String(values.discountAmount)); // Convertir a cadena explícitamente
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", String(values.isActive));

      // Debugging FormData contents
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      try {
        console.log("Sending request to backend with data:", formData);
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Response from backend:", response.data);

        // Manejar la respuesta exitosa aquí, si es necesario

        return response.data;
      } catch (error) {
        console.error("Error in editDiscount:", error);

        if (axios.isAxiosError(error)) {
          handleAxiosError(error);
        } else {
          setError("Ocurrió un error al realizar la solicitud.");
        }
      }
    },
  });

  const handleAxiosError = (error: AxiosError<any>) => {
    if (error.response) {
      // Error de respuesta desde el servidor
      console.error("Error en la solicitud de actualización:", error.response.data);
      setError(error.response.data.error || "Error en la solicitud de actualización");
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
      setError("No se recibió respuesta del servidor. Intente de nuevo más tarde.");
    } else {
      // Otro tipo de error
      console.error("Error al realizar la solicitud:", error.message);
      setError("Ocurrió un error al realizar la solicitud.");
    }
  };

  useEffect(() => {
    if (discount !== null) {
      console.log("Synchronizing formik values with discount state", discount);

      formik.setValues({
        title: discount.title,
        description: discount.description,
        normalPrice: discount.normalPrice,
        discountAmount: discount.discountAmount,
        businessName: discount.businessName,
        businessId: discount.businessId,
        businessType: discount.businessType,
        isActive: discount.isActive,
        imageURL: null,
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
          required
        />

        <Input
          label="Precio normal sin descuento"
          placeholder=""
          type="number"
          name="normalPrice"
          value={formik.values.normalPrice.toString()} // Convertir a cadena explícitamente
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.normalPrice && formik.errors.normalPrice ? (
          <p className="text-red-700">{formik.errors.normalPrice}</p>
        ) : null}

        <div className="w-full flex justify-start text-sm font-normal text-[#FD7B03]">
          <label className="text-sm font-medium text-black ml-3">
            Porcentaje de descuento (%)
          </label>
        </div>
        <Input
          label="Porcentaje de descuento"
          placeholder=""
          type="number"
          name="discountAmount"
          value={formik.values.discountAmount.toString()} // Convertir a cadena explícitamente
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.discountAmount && formik.errors.discountAmount ? (
          <p className="text-red-700">{formik.errors.discountAmount}</p>
        ) : null}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount; */

/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { Discount } from "@/services/apiCall";
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
  const router = useRouter();

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
      title: "",
      description: "",
      normalPrice: '',
      discountAmount: '',
      imageURL: null,
      businessName: "",
      businessId: "",
      businessType: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values before submission:", values);
      setError(undefined);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", String(values.normalPrice));
      formData.append("discountAmount", String(values.discountAmount));
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", String(values.isActive));

      // Debugging FormData contents
      for (const pair of formData.entries()) {
        console.log("valores de pair: ", pair[0], pair[1],);
      }

      try {
        console.log("Sending request to backend with data:", formData);
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Response from backend:", response.data);

        // Manejar la respuesta exitosa aquí, si es necesario

        return response.data;
      } catch (error) {
        console.error("Error in editDiscount:", error);

        if (axios.isAxiosError(error)) {
          handleAxiosError(error);
        } else {
          setError("Ocurrió un error al realizar la solicitud.");
        }
      }
    },
  });

  const handleAxiosError = (error: AxiosError<any>) => {
    if (error.response) {
      // Error de respuesta desde el servidor
      console.error("Error en la solicitud de actualización:", error.response.data);
      setError(error.response.data.error || "Error en la solicitud de actualización");
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
      setError("No se recibió respuesta del servidor. Intente de nuevo más tarde.");
    } else {
      // Otro tipo de error
      console.error("Error al realizar la solicitud:", error.message);
      setError("Ocurrió un error al realizar la solicitud.");
    }
  };

  useEffect(() => {
    if (discount !== null) {
      console.log("Synchronizing formik values with discount state", discount);

      formik.setValues({
        title: discount.title,
        description: discount.description,
        normalPrice: discount.normalPrice, // Asegurarse de que estos valores sean números
        discountAmount: discount.discountAmount, // Asegurarse de que estos valores sean números
        businessName: discount.businessName,
        businessId: discount.businessId,
        businessType: discount.businessType,
        isActive: discount.isActive,
        imageURL: null,
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
          required
        />

        <Input
          label="Precio normal sin descuento"
          placeholder=""
          type="number"
          name="normalPrice"
          value={formik.values.normalPrice.toString()} // Convertir a cadena explícitamente
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.normalPrice && formik.errors.normalPrice ? (
          <p className="text-red-700">{formik.errors.normalPrice}</p>
        ) : null}

        <div className="w-full flex justify-start text-sm font-normal text-[#FD7B03]">
          <label className="text-sm font-medium text-black ml-3">
            Porcentaje de descuento (%)
          </label>
        </div>
        <Input
          label="Porcentaje de descuento"
          placeholder=""
          type="number"
          name="discountAmount"
          value={formik.values.discountAmount.toString()} // Convertir a cadena explícitamente
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.discountAmount && formik.errors.discountAmount ? (
          <p className="text-red-700">{formik.errors.discountAmount}</p>
        ) : null}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount; */

//Este codigo anda bien pero no funciona el campo file
/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { Discount } from "@/services/apiCall";
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
  const router = useRouter();

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
      title: "",
      description: "",
      normalPrice: "",
      discountAmount: "",
      imageURL: null,
      businessName: "",
      businessId: "",
      businessType: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values before submission:", values);
      setError(undefined);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", String(values.normalPrice));
      formData.append("discountAmount", String(values.discountAmount));
      formData.append("imageURL", String(values.imageURL));
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", String(values.isActive));

      // Debugging FormData contents
      for (const pair of formData.entries()) {
        console.log("valores de pair: ", pair[0], pair[1]);
      }

      try {
        console.log("Sending request to backend with data:", formData);
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Response from backend:", response.data);

        // Manejar la respuesta exitosa aquí, si es necesario
        router.push("/some-success-page"); // Redirige a una página de éxito después de la actualización

        return response.data;
      } catch (error) {
        console.error("Error in editDiscount:", error);

        if (axios.isAxiosError(error)) {
          handleAxiosError(error);
        } else {
          setError("Ocurrió un error al realizar la solicitud.");
        }
      }
    },
  });

  const handleAxiosError = (error: AxiosError<any>) => {
    if (error.response) {
      // Error de respuesta desde el servidor
      console.error(
        "Error en la solicitud de actualización:",
        error.response.data
      );
      setError(
        error.response.data.error || "Error en la solicitud de actualización"
      );
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
      setError(
        "No se recibió respuesta del servidor. Intente de nuevo más tarde."
      );
    } else {
      // Otro tipo de error
      console.error("Error al realizar la solicitud:", error.message);
      setError("Ocurrió un error al realizar la solicitud.");
    }
  };

  useEffect(() => {
    if (discount !== null) {
      console.log("Synchronizing formik values with discount state", discount);

      formik.setValues({
        title: discount.title,
        description: discount.description,
        normalPrice: discount.normalPrice, // Asegurarse de que estos valores sean números
        discountAmount: discount.discountAmount, // Asegurarse de que estos valores sean números
        businessName: discount.businessName,
        businessId: discount.businessId,
        businessType: discount.businessType,
        isActive: discount.isActive,
        imageURL: null,
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
          required
        />

        <Input
          label="Precio normal sin descuento"
          placeholder=""
          type="number"
          name="normalPrice"
          value={formik.values.normalPrice.toString()} // Convertir a cadena explícitamente
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.normalPrice && formik.errors.normalPrice ? (
          <p className="text-red-700">{formik.errors.normalPrice}</p>
        ) : null}

        <div className="w-full flex justify-start text-sm font-normal text-[#FD7B03]">
          <label className="text-sm font-medium text-black ml-3">
            Porcentaje de descuento (%)
          </label>
        </div>
        <Input
          label="Porcentaje de descuento"
          placeholder=""
          type="number"
          name="discountAmount"
          value={formik.values.discountAmount.toString()} // Convertir a cadena explícitamente
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
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
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount; */

//Este codigo anda muy bien hasta inclusive enviando nueva imagen. El problema es que en caso de no enviar no persiste la imagen vieja
/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { Discount } from "@/services/apiCall";
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
  const router = useRouter();

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
    normalPrice: Yup.number()
      .min(1, "El precio del descuento debe ser al menos 1")
      .required("El precio del descuento es requerido"),
    discountAmount: Yup.number()
      .min(1, "El porcentaje de descuento debe ser al menos 1")
      .required("El porcentaje de descuento es requerido"),
    imageURL: Yup.mixed().nullable(), // Permitir null
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      normalPrice: "",
      discountAmount: "",
      imageURL: null as File | null, // Inicialmente null
      businessName: "",
      businessId: "",
      businessType: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values before submission:", values);
      setError(undefined);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", String(values.normalPrice));
      formData.append("discountAmount", String(values.discountAmount));
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", String(values.isActive));

      // Solo agregar imageURL si es un archivo (File)
      if (values.imageURL instanceof File) {
        formData.append("imageURL", values.imageURL);
      }

      try {
        console.log("Sending request to backend with data:", formData);
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Response from backend:", response.data);

        // Manejar la respuesta exitosa aquí, si es necesario
        router.push("/some-success-page"); // Redirige a una página de éxito después de la actualización

        return response.data;
      } catch (error) {
        console.error("Error in editDiscount:", error);

        if (axios.isAxiosError(error)) {
          handleAxiosError(error);
        } else {
          setError("Ocurrió un error al realizar la solicitud.");
        }
      }
    },
  });

  const handleAxiosError = (error: AxiosError<any>) => {
    if (error.response) {
      // Error de respuesta desde el servidor
      console.error(
        "Error en la solicitud de actualización:",
        error.response.data
      );
      setError(
        error.response.data.error || "Error en la solicitud de actualización"
      );
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
      setError(
        "No se recibió respuesta del servidor. Intente de nuevo más tarde."
      );
    } else {
      // Otro tipo de error
      console.error("Error al realizar la solicitud:", error.message);
      setError("Ocurrió un error al realizar la solicitud.");
    }
  };

  useEffect(() => {
    if (discount !== null) {
      console.log("Synchronizing formik values with discount state", discount);

      formik.setValues({
        title: discount.title,
        description: discount.description,
        normalPrice: discount.normalPrice.toString(), // Asegurarse de que estos valores sean cadenas
        discountAmount: discount.discountAmount.toString(), // Asegurarse de que estos valores sean cadenas
        businessName: discount.businessName,
        businessId: discount.businessId,
        businessType: discount.businessType,
        isActive: discount.isActive,
        imageURL: null, // Puede ser una URL o null inicialmente
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
          required
        />

        <Input
          label="Precio normal sin descuento"
          placeholder=""
          type="number"
          name="normalPrice"
          value={formik.values.normalPrice} // Mantener como número
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.normalPrice && formik.errors.normalPrice ? (
          <p className="text-red-700">{formik.errors.normalPrice}</p>
        ) : null}

        <div className="w-full flex justify-start text-sm font-normal text-[#FD7B03]">
          <label className="text-sm font-medium text-black ml-3">
            Porcentaje de descuento (%)
          </label>
        </div>
        <Input
          label="Porcentaje de descuento"
          placeholder=""
          type="number"
          name="discountAmount"
          value={formik.values.discountAmount} // Mantener como número
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
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
            }
          }}
          onBlur={formik.handleBlur}
          // No establecer un valor aquí, ya que eso no es compatible con los archivos
        />
        {formik.touched.imageURL && formik.errors.imageURL ? (
          <p className="text-red-700">{formik.errors.imageURL}</p>
        ) : null}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount; */

/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { Discount } from "@/services/apiCall";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextareaAutosize from "react-textarea-autosize";
import axios, { AxiosError } from "axios";
import { Context } from "@/context/Context";
import { Discount } from "@/services/apiCall";

const FormEditDiscount: React.FC = () => {
  const { userToken, discountId, discountRecovered } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [discount, setDiscount] = useState<Discount | null>(null);
  const router = useRouter();

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
      title: "",
      description: "",
      normalPrice: "",
      discountAmount: "",
      imageURL: null,
      businessName: "",
      businessId: "",
      businessType: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values before submission:", values);
      setError(undefined);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", String(values.normalPrice));
      formData.append("discountAmount", String(values.discountAmount));

      if (values.imageURL && typeof values.imageURL !== "string") {
        formData.append("imageURL", values.imageURL);
      } else if (discount && discount.imageURL) {
        formData.append("imageURL", discount.imageURL);
      }

      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", String(values.isActive));

      // Debugging FormData contents
      for (const pair of formData.entries()) {
        console.log("valores de pair: ", pair[0], pair[1]);
      }

      try {
        console.log("Sending request to backend with data:", formData);
        const response = await updateDiscount(discountId, formData, userToken);
        console.log("Response from backend:", response);

        // Manejar la respuesta exitosa aquí, si es necesario
        router.push("/some-success-page"); // Redirige a una página de éxito después de la actualización

        return response;
      } catch (error) {
        console.error("Error in editDiscount:", error);

        if (axios.isAxiosError(error)) {
          handleAxiosError(error);
        } else {
          setError("Ocurrió un error al realizar la solicitud.");
        }
      }
    },
  });

  const handleAxiosError = (error: AxiosError<any>) => {
    if (error.response) {
      // Error de respuesta desde el servidor
      console.error("Error en la solicitud de actualización:", error.response.data);
      setError(error.response.data.error || "Error en la solicitud de actualización");
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
      setError("No se recibió respuesta del servidor. Intente de nuevo más tarde.");
    } else {
      // Otro tipo de error
      console.error("Error al realizar la solicitud:", error.message);
      setError("Ocurrió un error al realizar la solicitud.");
    }
  };

  useEffect(() => {
    if (discount !== null) {
      console.log("Synchronizing formik values with discount state", discount);

      formik.setValues({
        title: discount.title,
        description: discount.description,
        normalPrice: discount.normalPrice,
        discountAmount: discount.discountAmount,
        businessName: discount.businessName,
        businessId: discount.businessId,
        businessType: discount.businessType,
        isActive: discount.isActive,
        imageURL: discount.imageURL || null,
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
          required
        />

        <Input
          label="Precio normal sin descuento"
          placeholder=""
          type="number"
          name="normalPrice"
          value={formik.values.normalPrice.toString()} // Convertir a cadena explícitamente
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.normalPrice && formik.errors.normalPrice ? (
          <p className="text-red-700">{formik.errors.normalPrice}</p>
        ) : null}

        <div className="w-full flex justify-start text-sm font-normal text-[#FD7B03]">
          <label className="text-sm font-medium text-black ml-3">
            Porcentaje de descuento (%)
          </label>
        </div>
        <Input
          label="Porcentaje de descuento"
          placeholder=""
          type="number"
          name="discountAmount"
          value={formik.values.discountAmount.toString()} // Convertir a cadena explícitamente
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
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
        />
        {formik.touched.imageURL && formik.errors.imageURL ? (
          <p className="text-red-700">{formik.errors.imageURL}</p>
        ) : null}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount; */

/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { Discount } from "@/services/apiCall";
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
  const router = useRouter();

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
    normalPrice: Yup.number()
      .min(1, "El precio del descuento debe ser al menos 1")
      .required("El precio del descuento es requerido"),
    discountAmount: Yup.number()
      .min(1, "El porcentaje de descuento debe ser al menos 1")
      .required("El porcentaje de descuento es requerido"),
    imageURL: Yup.mixed().nullable(), // Permitir null
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      normalPrice: "",
      discountAmount: "",
      imageURL: null as File | null, // Inicialmente null
      businessName: "",
      businessId: "",
      businessType: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values before submission:", values);
      setError(undefined);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", String(values.normalPrice));
      formData.append("discountAmount", String(values.discountAmount));
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", String(values.isActive));

      // Solo agregar imageURL si es un archivo (File)
      if (values.imageURL instanceof File) {
        formData.append("imageURL", values.imageURL);
      }

      try {
        console.log("Sending request to backend with data:", formData);
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Response from backend:", response.data);

        // Manejar la respuesta exitosa aquí, si es necesario
        router.push("/some-success-page"); // Redirige a una página de éxito después de la actualización

        return response.data;
      } catch (error) {
        console.error("Error in editDiscount:", error);

        if (axios.isAxiosError(error)) {
          handleAxiosError(error);
        } else {
          setError("Ocurrió un error al realizar la solicitud.");
        }
      }
    },
  });

  const handleAxiosError = (error: AxiosError<any>) => {
    if (error.response) {
      // Error de respuesta desde el servidor
      console.error(
        "Error en la solicitud de actualización:",
        error.response.data
      );
      setError(
        error.response.data.error || "Error en la solicitud de actualización"
      );
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
      setError(
        "No se recibió respuesta del servidor. Intente de nuevo más tarde."
      );
    } else {
      // Otro tipo de error
      console.error("Error al realizar la solicitud:", error.message);
      setError("Ocurrió un error al realizar la solicitud.");
    }
  };

  useEffect(() => {
    if (discount !== null) {
      console.log("Synchronizing formik values with discount state", discount);

      formik.setValues({
        title: discount.title,
        description: discount.description,
        normalPrice: discount.normalPrice.toString(), // Asegurarse de que estos valores sean cadenas
        discountAmount: discount.discountAmount.toString(), // Asegurarse de que estos valores sean cadenas
        businessName: discount.businessName,
        businessId: discount.businessId,
        businessType: discount.businessType,
        isActive: discount.isActive,
        imageURL: null, // Puede ser una URL o null inicialmente
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
          required
        />

        <Input
          label="Precio normal sin descuento"
          placeholder=""
          type="number"
          name="normalPrice"
          value={formik.values.normalPrice} // Mantener como número
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.normalPrice && formik.errors.normalPrice ? (
          <p className="text-red-700">{formik.errors.normalPrice}</p>
        ) : null}

        <div className="w-full flex justify-start text-sm font-normal text-[#FD7B03]">
          <label className="text-sm font-medium text-black ml-3">
            Porcentaje de descuento (%)
          </label>
        </div>
        <Input
          label="Porcentaje de descuento"
          placeholder=""
          type="number"
          name="discountAmount"
          value={formik.values.discountAmount} // Mantener como número
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
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
            }
          }}
          onBlur={formik.handleBlur}
          // No establecer un valor aquí, ya que eso no es compatible con los archivos
        />
        {formik.touched.imageURL && formik.errors.imageURL ? (
          <p className="text-red-700">{formik.errors.imageURL}</p>
        ) : null}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount;
 */



//Este andaba perfecto hasta que intente solucionar el refrescado de
/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { Discount } from "@/services/apiCall";
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
  const router = useRouter();

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
    normalPrice: Yup.number()
      .min(1, "El precio del descuento debe ser al menos 1")
      .required("El precio del descuento es requerido"),
    discountAmount: Yup.number()
      .min(1, "El porcentaje de descuento debe ser al menos 1")
      .required("El porcentaje de descuento es requerido"),
    imageURL: Yup.mixed().nullable(), // Permitir null
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      normalPrice: "",
      discountAmount: "",
      imageURL: null as File | Blob | null, // Inicialmente null
      businessName: "",
      businessId: "",
      businessType: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values before submission:", values);
      setError(undefined);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", String(values.normalPrice));
      formData.append("discountAmount", String(values.discountAmount));
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", String(values.isActive));

      // Solo agregar imageURL si es un archivo (File) o un Blob
      if (values.imageURL instanceof File || values.imageURL instanceof Blob) {
        formData.append("imageURL", values.imageURL);
      } else if (discount && discount.imageURL) {
        formData.append("imageURL", discount.imageURL as Blob); // Usar la URL existente
      }

      try {
        console.log("Sending request to backend with data:", formData);
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Response from backend:", response.data);

        // Manejar la respuesta exitosa aquí, si es necesario
        router.push("/myDiscounts"); //Luego de editar un descuento se redirije a la vista de Mis descuentos.

        return response.data;
      } catch (error) {
        console.error("Error in editDiscount:", error);

        if (axios.isAxiosError(error)) {
          handleAxiosError(error);
        } else {
          setError("Ocurrió un error al realizar la solicitud.");
        }
      }
    },
  });

  const handleAxiosError = (error: AxiosError<any>) => {
    if (error.response) {
      // Error de respuesta desde el servidor
      console.error(
        "Error en la solicitud de actualización:",
        error.response.data
      );
      setError(
        error.response.data.error || "Error en la solicitud de actualización"
      );
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
      setError(
        "No se recibió respuesta del servidor. Intente de nuevo más tarde."
      );
    } else {
      // Otro tipo de error
      console.error("Error al realizar la solicitud:", error.message);
      setError("Ocurrió un error al realizar la solicitud.");
    }
  };

  useEffect(() => {
    if (discount !== null) {
      console.log("Synchronizing formik values with discount state", discount);

      formik.setValues({
        title: discount.title,
        description: discount.description,
        normalPrice: discount.normalPrice.toString(), // Asegurarse de que estos valores sean cadenas
        discountAmount: discount.discountAmount.toString(), // Asegurarse de que estos valores sean cadenas
        businessName: discount.businessName,
        businessId: discount.businessId,
        businessType: discount.businessType,
        isActive: discount.isActive,
        imageURL: null, // Puede ser una URL o null inicialmente
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
          required
        />

        <Input
          label="Precio normal sin descuento"
          placeholder=""
          type="number"
          name="normalPrice"
          value={formik.values.normalPrice} // Mantener como número
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
            }
          }}
          value={formik.values.imageURL}

          onBlur={formik.handleBlur}
          // No establecer un valor aquí, ya que eso no es compatible con los archivos
        />
        {formik.touched.imageURL && formik.errors.imageURL ? (
          <p className="text-red-700">{formik.errors.imageURL}</p>
        ) : null}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount; */




/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { Discount } from "@/services/apiCall";
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
  const router = useRouter();

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
    imageURL: Yup.mixed().nullable(), // Permitir null
  });

  const formik = useFormik({
    initialValues: {
      title: discount?.title || "",
      description: discount?.description || "",
      normalPrice: discount?.normalPrice || "", // Ya es cadena
      discountAmount: discount?.discountAmount || "", // Ya es cadena
      imageURL: null as File | Blob | null, // Inicialmente null
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

      // Solo agregar imageURL si es un archivo (File) o un Blob
      if (values.imageURL instanceof File || values.imageURL instanceof Blob) {
        formData.append("imageURL", values.imageURL);
      } else if (discount && discount.imageURL) {
        formData.append("imageURL", discount.imageURL as Blob); // Usar la URL existente
      }

      try {
        console.log("Sending request to backend with data:", formData);
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Response from backend:", response.data);

        // Manejar la respuesta exitosa aquí, si es necesario
        router.push("/myDiscounts"); // Luego de editar un descuento se redirige a la vista de Mis descuentos.

        return response.data;
      } catch (error) {
        console.error("Error in editDiscount:", error);

        if (axios.isAxiosError(error)) {
          handleAxiosError(error);
        } else {
          setError("Ocurrió un error al realizar la solicitud.");
        }
      }
    },
  });

  const handleAxiosError = (error: AxiosError<any>) => {
    if (error.response) {
      // Error de respuesta desde el servidor
      console.error(
        "Error en la solicitud de actualización:",
        error.response.data
      );
      setError(
        error.response.data.error || "Error en la solicitud de actualización"
      );
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
      setError(
        "No se recibió respuesta del servidor. Intente de nuevo más tarde."
      );
    } else {
      // Otro tipo de error
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
        imageURL: null, // Puede ser una URL o null inicialmente
      });
    }
  }, [discount]);

  return (
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          <label className="text-sm font-medium text-black ml-3">
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
            }
          }}
          value={formik.values.imageURL}

          onBlur={formik.handleBlur}
          // No establecer un valor aquí, ya que eso no es compatible con los archivos
        />
        {formik.touched.imageURL && formik.errors.imageURL ? (
          <p className="text-red-700">{formik.errors.imageURL}</p>
        ) : null}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
        >
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount; */



import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { Discount } from "@/services/apiCall";
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
  const router = useRouter();

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
        console.log("Sending request to backend with data:", formData);
        const response = await axios.patch(
          `http://localhost:5050/api/discount_update/${discountId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("Response from backend:", response.data);

        router.push("/myDiscounts");

        return response.data;
      } catch (error) {
        console.error("Error in editDiscount:", error);

        if (axios.isAxiosError(error)) {
          handleAxiosError(error);
        } else {
          setError("Ocurrió un error al realizar la solicitud.");
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
      <div className="w-full px-4 sm:w-[500px] sm:px-0">
        <h1 className="text-center text-3xl my-5">Editar descuento</h1>
        <form
          className="flex flex-col items-center mx-auto gap-4"
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
            <label className="text-sm font-medium text-black ml-3">
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
                  {value}%
                </option>
              );
            })}
          </select>
          {formik.touched.discountAmount && formik.errors.discountAmount ? (
            <p className="text-red-700">{formik.errors.discountAmount}</p>
          ) : null}

          {/* <Input
            label="Cargar fotografía"
            placeholder=""
            type="file"
            name="imageURL"
            onChange={(event) => {
              if (event.currentTarget.files && event.currentTarget.files[0]) {
                formik.setFieldValue("imageURL", event.currentTarget.files[0]);
              }
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.imageURL && formik.errors.imageURL ? (
            <p className="text-red-700">{formik.errors.imageURL}</p>
          ) : null} */}

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
            className="w-full py-2 bg-[#FD7B03] my-5 text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
          >
            Enviar datos
          </button>

          {error && <p className="text-red-700">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default FormEditDiscount;
