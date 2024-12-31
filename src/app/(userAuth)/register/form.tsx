"use client"
import React, { useState, useContext, useEffect } from "react";
import Input from "@/components/InputAuth/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUser, updateUserWithBusinessId } from "@/api/userService";
import { createBusiness } from "@/api/businessService";
//import { createUser, createBusiness, Business, updateUserWithBusinessId } from "@/services/apiCall";
import { registerUserWithFirebase } from "@/services/firebaseAuthService";
import { Context } from "@/context/Context";
import Button from "@/components/button/Button";
import RegistrationConfirmationModal from "@/components/registrationConfirmationModal/RegistrationConfirmationModal";


const FormRegister = () => {
  const { businessName } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [ownerId, setOwnerId] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] =
    useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigation = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const emailFromUrl = searchParams.get("email");

    if (!tokenFromUrl || !emailFromUrl) {
      console.error("El token o el email no están presentes en la URL");
      return;
    }

    setToken(tokenFromUrl);
    setEmail(emailFromUrl);
  }, [searchParams]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .required("El nombre es requerido"),
    lastName: Yup.string()
      .min(3, "El apellido debe tener al menos 3 caracteres")
      .required("El apellido es requerido"),
    businessName: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .required("El nombre del negocio es requerido"),
    address: Yup.string()
      .min(3, "La dirección debe tener al menos 3 caracteres")
      .required("La dirección es requerida"),
    addressNumber: Yup.string()
      .min(1, "El número de la dirección debe tener al menos 1 caracter")
      .required("El número de la dirección es requerido"),
    city: Yup.string()
      .min(3, "La ciudad debe tener al menos 3 caracteres")
      .required("La ciudad es requerida"),
    country: Yup.string()
      .min(3, "El país debe tener al menos 3 caracteres")
      .required("El país es requerido"),
    phone: Yup.string().required("Teléfono es requerido"),
    imageURL: Yup.mixed().required("El archivo de imagen es requerido"),
    pdfBusinessRegistration: Yup.mixed().required(
      "El archivo de inscripción es requerido"
    ),
    logo: Yup.mixed(),
    socialMediaLinks: Yup.string().url("El enlace debe ser una URL válida"),
    openingHours: Yup.string().required(
      "Los horarios de apertura son requeridos"
    ),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es requerida"),
    repeatPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), undefined],
        "Las contraseñas deben coincidir"
      )
      .required("Confirmar contraseña es requerido"),
    businessType: Yup.string().required("El tipo de negocio es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      _id: "",
      name: "",
      lastName: "",
      businessName: "",
      address: "",
      addressNumber: "",
      city: "",
      country: "",
      email: email ? email : "",
      phone: "",
      imageURL: null,
      pdfBusinessRegistration: null,
      logo: null,
      socialMediaLinks: "",
      openingHours: "",
      password: "",
      repeatPassword: "",
      ownerName: "",
      ownerId: "",
      businessType: "",
      token: token ? token : "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(undefined);
      setIsLoading(true);

      try {
        /* const { user, error: firebaseError } = await registerUserWithFirebase(
          email,
          values.password
        );
        if (firebaseError) {
          setError(`Firebase error: ${firebaseError}`);
          setIsLoading(false);
          return;
        } */

        const userResponse = await createUser(values, token, email);
        if (typeof userResponse === "object" && userResponse !== null) {
          setOwnerName(userResponse.name);
          setOwnerId(userResponse._id);
          values.ownerName = `${userResponse.name} ${userResponse.lastName}`;
          values.ownerId = userResponse._id;
          setError("");

          const businessValues = {
            ...values,
          };

          // Crear el objeto FormData para los archivos y los datos del negocio
          const formData = new FormData();
          formData.append("ownerName", values.ownerName); // Nombre del propietario
          formData.append("businessName", values.businessName);
          formData.append("businessType", values.businessType);
          formData.append("address", values.address);
          formData.append("addressNumber", values.addressNumber);
          formData.append("city", values.city);
          formData.append("country", values.country);
          formData.append("ownerId", userResponse._id); // ID del propietario

          // Añadir archivos a formData
          if (values.imageURL) {
            formData.append("imageURL", values.imageURL);
          }
          if (values.pdfBusinessRegistration) {
            formData.append(
              "pdfBusinessRegistration",
              values.pdfBusinessRegistration
            );
          }
          if (values.logo) {
            formData.append("logo", values.logo);
          }

          //const responseBusiness = await createBusiness(businessValues);
          const responseBusiness = await createBusiness(formData);
          if (
            typeof responseBusiness === "object" &&
            responseBusiness !== null
          ) {
            console.log("Valor de responseBusiness para ver si llega pdfBusinessRegistration: ", responseBusiness);
            const businessId = responseBusiness._id;
            const businessType = responseBusiness.businessType;
            const pdfBusinessRegistration = responseBusiness.pdfBusinessRegistration;

            const updateUserResponse = await updateUserWithBusinessId(
              userResponse._id,
              businessId,
            );
            if (
              typeof updateUserResponse === "object" &&
              updateUserResponse !== null
            ) {
              console.log(
                "Usuario actualizado con businessId:",
                updateUserResponse
              );
            } else {
              console.error(
                "Error al actualizar el usuario con businessId:",
                updateUserResponse
              );
            }
          }

          setTimeout(() => {
            setIsRegistrationModalOpen(true);
          }, 2000);
        } else {
          setError(userResponse);
        }
      } catch (err: any) {
        setError(`Error: ${err.message || "Network error or server is unreachable"}`);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <RegistrationConfirmationModal
        isOpenRegistrationConfirmation={isRegistrationModalOpen}
        onCloseRegistrationConfirmation={() =>
          setIsRegistrationModalOpen(false)
        }
      />

      <form
        className="flex flex-col items-center mx-auto gap-6"
        onSubmit={formik.handleSubmit}
      >
        <Input
          label="Nombre"
          placeholder=""
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={3}
        />
        {formik.touched.name && formik.errors.name ? (
          <p className="text-red-700">{formik.errors.name}</p>
        ) : null}

        <Input
          label="Apellido"
          placeholder=""
          type="text"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={3}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <p className="text-red-700">{formik.errors.lastName}</p>
        ) : null}

        <Input
          label="Nombre del negocio"
          placeholder=""
          type="text"
          name="businessName"
          value={formik.values.businessName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={3}
        />
        {formik.touched.businessName && formik.errors.businessName ? (
          <p className="text-red-700">{formik.errors.businessName}</p>
        ) : null}

        <div className="w-full">
          <label
            htmlFor="businessType"
            className="block text-sm font-medium text-gray-700 ml-4"
          >
            Tipo de negocio
          </label>
          <select
            id="businessType"
            name="businessType"
            value={formik.values.businessType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full h-[50px] px-3 border border-[gray] bg-white rounded-[10px] shadow-sm focus:outline-none focus:ring-[gray] focus:border-[gray] sm:text-sm"
          >
            <option value="" label="Seleccionar tipo de negocio" />
            <option value="Restaurantes" label="Restaurante" />
            <option value="Bares" label="Bar" />
            <option value="Panaderías" label="Panadería" />
            <option value="Pizzerías" label="Pizzería" />
          </select>
          {formik.touched.businessType && formik.errors.businessType ? (
            <p className="text-red-700">{formik.errors.businessType}</p>
          ) : null}
        </div>

        <Input
          label="Dirección del negocio (solo el nombre de la calle)"
          placeholder="Calle Hermosa"
          type="text"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={3}
        />
        {formik.touched.address && formik.errors.address ? (
          <p className="text-red-700">{formik.errors.address}</p>
        ) : null}

        <Input
          label="Número de la dirección"
          placeholder="123"
          type="text"
          name="addressNumber"
          value={formik.values.addressNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.addressNumber && formik.errors.addressNumber ? (
          <p className="text-red-700">{formik.errors.addressNumber}</p>
        ) : null}

        <Input
          label="Ciudad"
          placeholder="Cordoba"
          type="text"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={3}
        />
        {formik.touched.city && formik.errors.city ? (
          <p className="text-red-700">{formik.errors.city}</p>
        ) : null}



        <Input
          label="País"
          placeholder="Argentina"
          type="text"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={3}
        />
        {formik.touched.country && formik.errors.country ? (
          <p className="text-red-700">{formik.errors.country}</p>
        ) : null}

        <Input
          label="Teléfono"
          placeholder=""
          type="text"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={1}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <p className="text-red-700">{formik.errors.phone}</p>
        ) : null}


        <div className="w-full">
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
        </div>

        <div className="w-full">
          <Input
            label="Archivo de inscripción"
            placeholder=""
            type="file"
            name="pdfBusinessRegistration"
            accept=".pdf" // Solo admite archivos en formato pdf
            onChange={(event) => {
              if (event.currentTarget.files && event.currentTarget.files[0]) {
                formik.setFieldValue("pdfBusinessRegistration", event.currentTarget.files[0]);
              } else {
                formik.setFieldValue("pdfBusinessRegistration", null); // Limpiar el valor si se cancela la selección
              }
            }}
            onBlur={formik.handleBlur}
            value={formik.values.pdfBusinessRegistration}
          />
          {formik.touched.pdfBusinessRegistration && formik.errors.pdfBusinessRegistration ? (
            <p className="text-red-700">{formik.errors.pdfBusinessRegistration}</p>
          ) : null}
        </div>

        

        <div className="w-full">
          <Input
            label="Cargar Logo (opcional)"
            placeholder=""
            type="file"
            name="logo"
            onChange={(event) => {
              if (event.currentTarget.files && event.currentTarget.files[0]) {
                formik.setFieldValue("logo", event.currentTarget.files[0]);
              } else {
                formik.setFieldValue("logo", null); // Limpiar el valor si se cancela la selección
              }
            }}
            onBlur={formik.handleBlur}
            value={formik.values.logo}
          />
          {formik.touched.logo && formik.errors.logo ? (
            <p className="text-red-700">{formik.errors.logo}</p>
          ) : null}
        </div>



        <Input
          label="Enlaces de redes sociales (opcional)"
          placeholder="https://facebook.com/mi-negocio"
          type="text"
          name="socialMediaLinks"
          value={formik.values.socialMediaLinks}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.socialMediaLinks && formik.errors.socialMediaLinks ? (
          <p className="text-red-700">{formik.errors.socialMediaLinks}</p>
        ) : null}


        <Input
          label="Horarios de apertura"
          placeholder="Ejemplo: Lunes-Viernes: 10:00-22:00"
          type="text"
          name="openingHours"
          value={formik.values.openingHours}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.openingHours && formik.errors.openingHours ? (
          <p className="text-red-700">{formik.errors.openingHours}</p>
        ) : null}

        <Input
          label="Contraseña"
          placeholder=""
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className="text-red-700">{formik.errors.password}</p>
        ) : null}

        <Input
          label="Repetir contraseña"
          placeholder=""
          type="password"
          name="repeatPassword"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
          <p className="text-red-700">{formik.errors.repeatPassword}</p>
        ) : null}

        <Button buttonText={isLoading ? "Cargando..." : "Crear cuenta"} />

        {error && <p className="text-red-700">{error}</p>}
      </form>
    </div>
  );
};

export default FormRegister;