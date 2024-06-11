"use client";
//Este estaba usando
/* import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editDiscountModal, Discount } from "@/services/apiCall";
import { Context } from "@/context/Context";
import TextareaAutosize from "react-textarea-autosize";

interface EditDiscountProps {
  discount: Discount;
}

const FormEditDiscount: React.FC<EditDiscountProps> = ({
  discount,
}) => {
  const {
    userId,
    setUserId,
    newRole,
    setNewRole,
    userToken,
    setUserToken,
    setUserName,
    setBusinessName,
    businessName,
    businessId,
    setBusinessId,
    businessType,
    setBusinessType,
    discountId,
    discountRecovered,
  } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const navigation = useRouter();

  useEffect(() => {
    const thereIsUserToken = localStorage.getItem("token");
    const thereIsUserRole = localStorage.getItem("role");
    const thereIsUserId = localStorage.getItem("_id");
    const thereIsUserName = localStorage.getItem("name");
    const thereIsBusinessName = localStorage.getItem("businessName");
    const thereIsBusinessId = localStorage.getItem("businesId");
    const thereIsBusinessType = localStorage.getItem("businesType");

    if (thereIsUserToken) setUserToken(thereIsUserToken);
    if (thereIsUserRole) setNewRole(thereIsUserRole);
    if (thereIsUserId) setUserId(thereIsUserId);
    if (thereIsUserName) setUserName(thereIsUserName);
    if (thereIsBusinessName) setBusinessName(thereIsBusinessName);
    if (thereIsBusinessId) setBusinessId(thereIsBusinessId);
    if (thereIsBusinessType) setBusinessId(thereIsBusinessType);

    if (discountRecovered && typeof discountRecovered.imageURL === "string") {
      setExistingImageUrl(discountRecovered.imageURL);
    }
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
    imageURL: Yup.mixed().nullable(), // Permitir valor nulo
  });

  const formik = useFormik({
    initialValues: {
      title: discountRecovered?.title || "",
      description: discountRecovered?.description || "",
      normalPrice: discountRecovered?.normalPrice || "",
      discountAmount: discountRecovered?.discountAmount || "",
      imageURL: null,
      businessName: discountRecovered?.businessName || businessName,
      businessId: discountRecovered?.businessId || businessId,
      businessType: discountRecovered?.businessType || businessType,
      isActive: discountRecovered?.isActive || true,
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
      if (values.imageURL) {
        formData.append("imageURL", values.imageURL);
      } else if (existingImageUrl) {
        formData.append("existingImageUrl", existingImageUrl);
      }
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", values.isActive.toString()); // Para enviarlo con formData lo debo convertir de boolean a string.

      try {
        const response = await editDiscountModal(
          formData,
          userToken,
          discountId
        );
        if (typeof response === "object" && response !== null) {
          setError("");
          setTimeout(() => {
            navigation.push("/login");
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
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
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
            } else {
              formik.setFieldValue("imageURL", null); // Limpiar el valor si se cancela la selección
            }
          }}
          onBlur={formik.handleBlur}
          value={formik.values.imageURL}
        />

        {existingImageUrl && !formik.values.imageURL && (
          <img
            src={`http://localhost:5050${existingImageUrl}`}
            alt="Current Discount Image"
            className="w-full"
          />
        )}

        {formik.touched.imageURL && formik.errors.imageURL ? (
          <p className="text-red-700">{formik.errors.imageURL}</p>
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
          <p className="text-center mb-2 text-red-700 font-semibold">{error}</p>
        )}
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
import { editDiscountModal, Discount } from "@/services/apiCall";
import { Context } from "@/context/Context";
import TextareaAutosize from "react-textarea-autosize";

interface EditDiscountModalProps {
  discount: Discount;
  onClose: () => void;
}

const EditDiscountModalForm: React.FC<EditDiscountModalProps> = ({
  discount,
  onClose,
}) => {
  const {
    userId,
    setUserId,
    newRole,
    setNewRole,
    userToken,
    setUserToken,
    setUserName,
    setBusinessName,
    businessName,
    businessId,
    setBusinessId,
    businessType,
    setBusinessType,
    discountId,
    discountRecovered,
  } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const navigation = useRouter();

  useEffect(() => {
    const thereIsUserToken = localStorage.getItem("token");
    const thereIsUserRole = localStorage.getItem("role");
    const thereIsUserId = localStorage.getItem("_id");
    const thereIsUserName = localStorage.getItem("name");
    const thereIsBusinessName = localStorage.getItem("businessName");
    const thereIsBusinessId = localStorage.getItem("businesId");
    const thereIsBusinessType = localStorage.getItem("businesType");

    if (thereIsUserToken) setUserToken(thereIsUserToken);
    if (thereIsUserRole) setNewRole(thereIsUserRole);
    if (thereIsUserId) setUserId(thereIsUserId);
    if (thereIsUserName) setUserName(thereIsUserName);
    if (thereIsBusinessName) setBusinessName(thereIsBusinessName);
    if (thereIsBusinessId) setBusinessId(thereIsBusinessId);
    if (thereIsBusinessType) setBusinessId(thereIsBusinessType);

    if (discountRecovered && typeof discountRecovered.imageURL === "string") {
      setExistingImageUrl(discountRecovered.imageURL);
    }
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
      .max(85, "La descripción no puede tener más de 80 caracteres")
      .required("La descripción es requerida"),
    normalPrice: Yup.string()
      .min(1, "El precio del descuento debe tener al menos 1 caracter")
      .required("El precio del descuento es requerido."),
    discountAmount: Yup.string()
      .min(1, "El porcentaje de descuento debe tener al menos 1 caracter")
      .required("El porcentaje de descuento es requerido."),
    imageURL: Yup.mixed().nullable(), // Permitir valor nulo
  });

  const formik = useFormik({
    initialValues: {
      title: discountRecovered?.title || "",
      description: discountRecovered?.description || "",
      normalPrice: discountRecovered?.normalPrice || "",
      discountAmount: discountRecovered?.discountAmount || "",
      imageURL: null,
      businessName: discountRecovered?.businessName || businessName,
      businessId: discountRecovered?.businessId || businessId,
      businessType: discountRecovered?.businessType || businessType,
      isActive: discountRecovered?.isActive || true,
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
      if (values.imageURL) {
        formData.append("imageURL", values.imageURL);
      } else if (existingImageUrl) {
        formData.append("existingImageUrl", existingImageUrl);
      }
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", values.isActive.toString()); // Para enviarlo con formData lo debo convertir de boolean a string.

      try {
        const response = await editDiscountModal(
          formData,
          userToken,
          discountId
        );
        if (typeof response === "object" && response !== null) {
          setError("");
          setTimeout(() => {
            navigation.push("/login");
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
    <div>
      <form
        className="flex flex-col items-center mx-auto gap-4"
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
          className="w-full min-h-24 border-[2px] border-[#FD7B03] rounded-3xl mt-[-10px] p-2"
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
            } else {
              formik.setFieldValue("imageURL", null); // Limpiar el valor si se cancela la selección
            }
          }}
          onBlur={formik.handleBlur}
          value={formik.values.imageURL}
        />
        {existingImageUrl && !formik.values.imageURL && (
          <img
            src={existingImageUrl}
            alt="Current Discount Image"
            className="w-full"
          />
        )}
        {formik.touched.imageURL && formik.errors.imageURL ? (
          <p className="text-red-700">{formik.errors.imageURL}</p>
        ) : null}

        <button
          type="submit"
          className="w-full bg-[#FFCF91] text-[18px] text-white font-semibold mt-3 h-[60px] rounded-[30px]
 border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91]"
          disabled={isLoading}
        >
          <div className="flex justify-center">
            <div className="w-[98%] bg-[#FD7B03] rounded-[30px] py-[7px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
              {isLoading ? "Cargando..." : "Enviar"}
            </div>
          </div>
        </button>

        {error && (
          <p className="text-red-700 text-center mt-4">{`Error: ${error}`}</p>
        )}
      </form>
    </div>
  );
};

export default EditDiscountModalForm;
 */



import React, { useState, useEffect, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editDiscountModal, Discount } from "@/services/apiCall";
import { Context } from "@/context/Context";
import TextareaAutosize from "react-textarea-autosize";

interface EditDiscountProps {
  discount: Discount;
}

const FormEditDiscount: React.FC<EditDiscountProps> = ({
  discount,
}) => {
  const { userToken, discountId } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  //const [isLoading, setIsLoading] = useState(false);
  //const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const navigation = useRouter();

  /* useEffect(() => {
    if (discount && typeof discount.imageURL === "string") {
      setExistingImageUrl(discount.imageURL as string);
    }
  }, [discount]);
 */
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
    imageURL: Yup.mixed().nullable(), // Permitir valor nulo
  });

  const formik = useFormik({
    initialValues: {
      title: discount.title || "",
      description: discount.description || "",
      normalPrice: discount.normalPrice || "",
      discountAmount: discount.discountAmount || "",
      imageURL: null,
      businessName: discount.businessName || "",
      businessId: discount.businessId || "",
      businessType: discount.businessType || "",
      isActive: discount.isActive || true,
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(undefined);
      //setIsLoading(true);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("normalPrice", values.normalPrice); //Lo convierto a string para formData
      formData.append("discountAmount", values.discountAmount); //Lo convierto a string para formData
      /* if (values.imageURL) {
        formData.append("imageURL", values.imageURL);
      } else if (existingImageUrl) {
        formData.append("existingImageUrl", existingImageUrl);
      } */
      formData.append("businessName", values.businessName);
      formData.append("businessId", values.businessId);
      formData.append("isActive", values.isActive.toString()); // Para enviarlo con formData lo debo convertir de boolean a string.

      console.log("FormData to be sent:", Object.fromEntries(formData.entries()));

      try {
        const response = await editDiscountModal(
          formData,
          userToken,
          discountId
        );
        console.log("Response from API:", response);
        if (typeof response === "object" && response !== null) {
          setError("");
          setTimeout(() => {
            navigation.push("/myDisounts");
          }, 2000);
        } else {
          setError(response);
        }
      } catch (err: any) {
        console.error("Error during API call:", err);
        setError("Network error or server is unreachable");
      } /* finally {
        setIsLoading(false);
      } */
    },
  });

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

        {/* <Input
          label="Imagen del descuento"
          placeholder=""
          type="file"
          name="imageURL"
          onChange={(event) =>
            formik.setFieldValue("imageURL", event.currentTarget.files?.[0] || null)
          }
          onBlur={formik.handleBlur}
        />
        {formik.touched.imageURL && formik.errors.imageURL ? (
          <p className="text-red-700">{formik.errors.imageURL}</p>
        ) : null} */}

        <button
          type="submit"
          className="w-full py-2 bg-[#FD7B03] text-white rounded-xl hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
          //disabled={isLoading}
        >
          {/* {isLoading ? "Guardando..." : "Guardar cambios"} */}
          Enviar datos
        </button>

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormEditDiscount;
