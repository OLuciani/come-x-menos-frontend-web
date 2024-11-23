"use client"
import React, { useState, useContext, useEffect } from "react";
import Input from "@/components/InputAuth/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createExtraBusinessAdminUser } from "@/services/apiCall";
import { registerUserWithFirebase } from "@/services/authService";
import { Context } from "@/context/Context";
import Button from "@/components/button/Button";
import RegistrationConfirmationModal from "@/components/registrationConfirmationModal/RegistrationConfirmationModal";
import MessageModal from "@/components/messageModal/MessageModal";


const CreateExtraBusinessAdminUserForm = () => {
  const { businessName } = useContext(Context);
  const navigation = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [businessId, setBusinessId] = useState<string>("");

  /* Variables utilizadas para mostrar un mensaje en un modal */
  const [isOpenMessageModal, setIsOpenMessageModal] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const [messageTitle, setMessageTitle] = useState<string>("");
  const [messageRouterRedirection, setMessageRouterRedirection] = useState<string>("");
  const [selectedNavBarOption, setSelectedNavBarOption] = useState<string>("");


  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const emailFromUrl = searchParams.get("email");
    const businessIdFromUrl = searchParams.get("businessId");

    //console.log("Valor de tokenFromUrl: ", tokenFromUrl);
    //console.log("Valor de emailFromUrl: ", emailFromUrl);
    //console.log("Valor de businessIdFromUrl: ", businessIdFromUrl);

    if (!tokenFromUrl || !emailFromUrl || !businessIdFromUrl) {
      console.error("El token, el email o el id del negocio que invita a este usuario a crear cuenta con acceso al scanner en la app movil no están presentes en la URL");
      return;
    }

    setToken(tokenFromUrl);
    setEmail(emailFromUrl);
    setBusinessId(businessIdFromUrl);
  }, [searchParams]);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .required("El nombre es requerido"),
    lastName: Yup.string()
      .min(3, "El apellido debe tener al menos 3 caracteres")
      .required("El apellido es requerido"),
    phone: Yup.string().required("Teléfono es requerido"),
    email: Yup.string()
    .email("Correo electrónico no válido")
    .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es requerida"),
    repeatPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), undefined],
        "Las contraseñas deben coincidir"
      )
      .required("Confirmar contraseña es requerido"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      repeatPassword: "",
      //businessId: "",
      //token: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(undefined);
      setIsLoading(true);

      try {
        const { user, error: firebaseError } = await registerUserWithFirebase(
          email,
          values.password
        );
        if (firebaseError) {
          setError(`Firebase error: ${firebaseError}`);
          setIsLoading(false);
          return;
        }

        const userResponse = await createExtraBusinessAdminUser(values, token, businessId);
        if (typeof userResponse === "object" && userResponse !== null) {
          console.log("Usuario con acceso a Scanner en aplicación movil registrado exitosamente en Mongo Db");

          setError("");

          const title: string = "¡Cuenta creada con éxito!";
          setMessageTitle(title);
          const text: string = `Ya puedes iniciar sesión en la app como administrador de cuenta de negocio.` 
          setMessageText(text);
          const route: string = "/login";
          setMessageRouterRedirection(route);
          
          setIsOpenMessageModal(true);
          
          const navBarOption: string = "Iniciar sesión";
          setSelectedNavBarOption(navBarOption);
          };

          // Crear el objeto FormData con los datos del usuario y el id del negocio tomado 
          const formData = new FormData();
          formData.append("name", values.name); 
          formData.append("lastName", values.lastName);
          formData.append("password", values.password);

          if (email.trim().toLowerCase() === values.email.trim().toLowerCase()) {
            formData.append("email", values.email);
          } else {
            setError("El correo electrónico no coincide con el que fue enviado en la invitación.");
            console.log("El correo electrónico no coincide con el que fue enviado en la invitación.");
          }
          

        
      } catch (err: any) {
        setError(`Error: ${err.message || "Error de red o el servidor es inaccesible"}`);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
        <MessageModal isOpenMessageModal={isOpenMessageModal} onCloseMessageModal={() => setIsOpenMessageModal(false)} messageTitle={messageTitle} messageText={messageText} messageRouterRedirection={messageRouterRedirection} selectedNavBarOption={selectedNavBarOption} />

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
    </>
  );
};

export default CreateExtraBusinessAdminUserForm;