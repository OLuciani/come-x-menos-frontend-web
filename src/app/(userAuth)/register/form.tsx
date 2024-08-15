"use client"
//Funciona perfecto pero muestra businessId y userId
/* import React, { useState, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createUser,
  createBusiness,
  updateUserWithBusinessId,
} from "@/services/apiCall";
import { registerUserWithFirebase } from "@/services/authService";
import { Context } from "@/context/Context";
import Button from "@/components/button/Button";

export default function FormRegister() {
  const { businessName } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [ownerId, setOwnerId] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const navigation = useRouter();

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
      .min(3, "El número de la dirección debe tener al menos 1 caracter")
      .required("El núero de la dirección es requerido"),
    city: Yup.string()
      .min(3, "La ciudad debe tener al menos 3 caracteres")
      .required("La ciudad es requerida"),
    country: Yup.string()
      .min(3, "El país debe tener al menos 3 caracteres")
      .required("El país es requerido"),
    phone: Yup.string().required("Teléfono es requerido"),
    imageURL: Yup.mixed().required("El archivo de imagen es requerido"),
    email: Yup.string()
      .email("Ingresa un correo electrónico válido")
      .required("El correo electrónico es requerido"),
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
      email: "",
      phone: "",
      imageURL: null,
      password: "",
      repeatPassword: "",
      ownerName: "",
      ownerId: "",
      businessType: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(undefined);
      setIsLoading(true);

      try {
        // Primero registra al usuario en Firebase
        const { user, error: firebaseError } = await registerUserWithFirebase(
          values.email,
          values.password
        );
        if (firebaseError) {
          setError(`Firebase error: ${firebaseError}`);
          setIsLoading(false);
          return;
        }

        // Si el registro en Firebase es exitoso, procede con la solicitud POST al backend
        const userResponse = await createUser(values);
        if (typeof userResponse === "object" && userResponse !== null) {
          setOwnerName(userResponse.name);
          setOwnerId(userResponse._id);
          values.ownerName = `${userResponse.name} ${userResponse.lastName}`; // Establecer ownerName en los valores del formulario
          values.ownerId = userResponse._id; // Establecer ownerId en los valores del formulario
          setError("");

          // Preparar los valores para la solicitud de creación de negocio
          const businessValues = {
            ...values,
          };

          const responseBusiness = await createBusiness(businessValues);
          if (
            typeof responseBusiness === "object" &&
            responseBusiness !== null
          ) {
            const businessId = responseBusiness._id;
            console.log(businessId);

            const businessType = responseBusiness.businessType;
            // Hacer la solicitud PATCH para actualizar el usuario con businessId
            const updateUserResponse = await updateUserWithBusinessId(
              userResponse._id,
              businessId,
              businessType
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
            navigation.push("/login");
          }, 2000);
        } else {
          setError(userResponse);
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
          placeholder="1527"
          type="text"
          name="addressNumber"
          value={formik.values.addressNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={3}
        />
        {formik.touched.address && formik.errors.addressNumber ? (
          <p className="text-red-700">{formik.errors.addressNumber}</p>
        ) : null}

        <Input
          label="Ciudad"
          placeholder="Ciudad de Córdoba"
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
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <p className="text-red-700">{formik.errors.phone}</p>
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
          label="Email"
          placeholder=""
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-700">{formik.errors.email}</p>
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

        {error && (
          <p className="text-center mb-2 text-red-700 font-semibold">{error}</p>
        )}
      </form>
    </div>
  );
} */


import React, { useState, useContext } from "react";
import Input from "@/components/InputAuth/Input";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createUser,
  createBusiness,
  updateUserWithBusinessId,
} from "@/services/apiCall";
import { registerUserWithFirebase } from "@/services/authService";
import { Context } from "@/context/Context";
import Button from "@/components/button/Button";

export default function FormRegister() {
  const { businessName } = useContext(Context);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [ownerId, setOwnerId] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const navigation = useRouter();

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
      .min(3, "El número de la dirección debe tener al menos 1 caracter")
      .required("El núero de la dirección es requerido"),
    city: Yup.string()
      .min(3, "La ciudad debe tener al menos 3 caracteres")
      .required("La ciudad es requerida"),
    country: Yup.string()
      .min(3, "El país debe tener al menos 3 caracteres")
      .required("El país es requerido"),
    phone: Yup.string().required("Teléfono es requerido"),
    imageURL: Yup.mixed().required("El archivo de imagen es requerido"),
    email: Yup.string()
      .email("Ingresa un correo electrónico válido")
      .required("El correo electrónico es requerido"),
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
      email: "",
      phone: "",
      imageURL: null,
      password: "",
      repeatPassword: "",
      ownerName: "",
      ownerId: "",
      businessType: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(undefined);
      setIsLoading(true);

      try {
        // Primero registra al usuario en Firebase
        const { user, error: firebaseError } = await registerUserWithFirebase(
          values.email,
          values.password
        );
        if (firebaseError) {
          setError(`Firebase error: ${firebaseError}`);
          setIsLoading(false);
          return;
        }

        // Si el registro en Firebase es exitoso, procede con la solicitud POST al backend
        const userResponse = await createUser(values);
        if (typeof userResponse === "object" && userResponse !== null) {
          setOwnerName(userResponse.name);
          setOwnerId(userResponse._id);
          values.ownerName = `${userResponse.name} ${userResponse.lastName}`; // Establecer ownerName en los valores del formulario
          values.ownerId = userResponse._id; // Establecer ownerId en los valores del formulario
          setError("");

          // Preparar los valores para la solicitud de creación de negocio
          const businessValues = {
            ...values,
          };

          const responseBusiness = await createBusiness(businessValues);
          if (
            typeof responseBusiness === "object" &&
            responseBusiness !== null
          ) {
            const businessId = responseBusiness._id;
            console.log(businessId);

            const businessType = responseBusiness.businessType;
            // Hacer la solicitud PATCH para actualizar el usuario con businessId
            const updateUserResponse = await updateUserWithBusinessId(
              userResponse._id,
              businessId,
              businessType
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
            navigation.push("/login");
          }, 2000);
        } else {
          setError(userResponse);
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
          placeholder="1527"
          type="text"
          name="addressNumber"
          value={formik.values.addressNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          minLength={3}
        />
        {formik.touched.address && formik.errors.addressNumber ? (
          <p className="text-red-700">{formik.errors.addressNumber}</p>
        ) : null}

        <Input
          label="Ciudad"
          placeholder="Ciudad de Córdoba"
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
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <p className="text-red-700">{formik.errors.phone}</p>
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
          label="Email"
          placeholder=""
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-700">{formik.errors.email}</p>
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

        {error && (
          <p className="text-center mb-2 text-red-700 font-semibold">{error}</p>
        )}
      </form>
    </div>
  );
} 
