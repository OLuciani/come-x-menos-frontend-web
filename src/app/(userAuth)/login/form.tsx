"use client"
import React, { useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "@/context/Context";
import Input from "@/components/InputAuth/Input";
import { login, userProfile } from "@/services/apiCall";
import { loginUserWithFirebase } from "@/services/authService";
import PasswordResetModal from "@/components/passwordResetModal/PasswordResetModal";
import Cookies from "js-cookie";
import Button from "@/components/button/Button";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";
import UnauthorizedAccesssModal from "@/components/unauthorizedAccessModal/UnauthorizedAccessModal";

interface LoginResponse {
  message?: string;
  success?: boolean;
  userId?: string;
  userLoged?: boolean;
  error?: string;
}

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordResetModalVisible, setPasswordResetModalVisible] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const {
    setUserToken,
    setUserRole,
    setUserName,
    setBusinessName,
    setBusinessType,
    setIsLoggedIn,
    setBackgroundButtonNavBar,
    setSelectedOption,
    userRole
  } = useContext(Context);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Ingresa un correo electrónico válido")
      .required("Correo electrónico es requerido"),
    password: Yup.string()
      .required("Contraseña es requerida")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setError(undefined);
      setIsLoading(true);

      try {
        const firebaseResponse = await loginUserWithFirebase(
          values.email,
          values.password
        );

        if (firebaseResponse.error) {
          handleFirebaseError(firebaseResponse.error);
        } else {
          await handleLogin(values);
        }
      } catch (err) {
        setError("Error de red o el servidor no está disponible");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Manejo de errores de Firebase
  const handleFirebaseError = (firebaseError: any) => {
    let customErrorMessage = "Error desconocido";

    switch (firebaseError.code) {
      case "auth/user-not-found":
        customErrorMessage = "Usuario no encontrado";
        break;
      case "auth/wrong-password":
        customErrorMessage = "Contraseña incorrecta";
        break;
      case "auth/invalid-email":
        customErrorMessage = "Correo electrónico inválido";
        break;
      case "auth/user-disabled":
        customErrorMessage = "Usuario deshabilitado";
        break;
      default:
        customErrorMessage =
          "Error al iniciar sesión. Por favor, inténtalo de nuevo.";
    }

    setError(customErrorMessage);
  };

  // Manejo de respuesta de inicio de sesión
  const handleLogin = async (values: { email: string; password: string }) => {
    const loginResponse: LoginResponse = await login(values);

    if (loginResponse.error) {
      handleBackendError(loginResponse.error);
    } else if (loginResponse.success) {
      await handleSuccessfulLogin();
    }
  };

  // Manejo de errores del backend
  const handleBackendError = (backendError: any) => {
    let backendErrorMessage = "Error desconocido";

    switch (backendError.code) {
      case "INVALID_CREDENTIALS":
        backendErrorMessage = "Credenciales inválidas";
        break;
      case "USER_NOT_FOUND":
        backendErrorMessage = "Usuario no encontrado";
        break;
      case "ACCOUNT_LOCKED":
        backendErrorMessage = "Cuenta bloqueada";
        break;
      default:
        backendErrorMessage =
          "Error al iniciar sesión. Por favor, inténtalo de nuevo.";
    }

    setError(backendErrorMessage);
  };

  // Manejo del inicio de sesión exitoso
  const handleSuccessfulLogin = async () => {
    setIsLoggedIn(true); //
    setUserToken("true"); //Como loginResponse.success === true le doy un valor true a userToken sin exponer el verdadero token.

    //Como loginResponse.success === true creo una cokie con el valor en string true.
    Cookies.set("userToken", "true", {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });

    // No es necesario verificar si la cookie está establecida, asumiendo que set fue exitoso
    await fetchUserProfile();
  };

  // Función para obtener el perfil del usuario
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await userProfile();
      console.log("Valor de rsponse en useProfile()", response);

      if (response === "Token inválido o expirado") {
        setIsModalOpen(true);
        return;
      }

      Cookies.set("userRole", response.userRole, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("userName", response.userName, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("businessName", response.businessName, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("businessType", response.businessType, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      setUserRole(response.userRole);
      setUserName(response.userName);
      setBusinessName(response.businessName);
      setBusinessType(response.businessType);

      setBackgroundButtonNavBar(true);

      const expirationTime = 15 * 60 * 1000;

      setTimeout(() => {
        Cookies.remove("userToken");
        Cookies.remove("token"); //Remueve la cookie con el token
        Cookies.remove("userRole");
        Cookies.remove("userName");
        Cookies.remove("businessName");
        Cookies.remove("businessType");

        setUserRole("");
        setUserToken("");
        setUserName("");
        setBusinessName("");
        setBusinessType("");

        setIsLoggedIn(false);

        router.push("/login");
      
        setSelectedOption("Iniciar sesión");
      }, expirationTime);

      const roleAdminWeb = process.env.NEXT_PUBLIC_ROLE_ADMINWEB;

      if(response.userRole === roleAdminWeb) {
        router.push("/myAccount");
        setSelectedOption("Mi cuenta");
      } else {
        //router.push("/");
        //alert("No tienes autorizacion para iniciar sesión")
        setIsAccessModalOpen(true);
        Cookies.remove("userToken");
        Cookies.remove("token"); //Remueve la cookie con el token
        Cookies.remove("userRole");
        Cookies.remove("userName");
        Cookies.remove("businessName");
        Cookies.remove("businessType");

        setUserRole("");
        setUserToken("");
        setUserName("");
        setBusinessName("");
        setBusinessType("");

        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("Error al obtener el perfil del usuario:", err);
    }
  }, [router, setUserRole, setUserName, setBusinessName, setBusinessType]);

  return (
    <div>
      <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <UnauthorizedAccesssModal
        isOpenUnauthorizedAccess ={isAccessModalOpen} 
        onCloseUnauthorizedAccess = {() => setIsAccessModalOpen(false)}
      />
      <form
        onSubmit={formik.handleSubmit}
        className="w-screen px-4 sm:w-[450px] flex flex-col justify-center items-center gap-12 mx-auto mt-4"
      >
        <div className="w-full">
          <Input
            label="Email"
            placeholder="santiago@gmail.com"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-center text-red-700 py-1">
              {formik.errors.email}
            </p>
          ) : null}
        </div>

        <div className="w-full relative">
          <p
            className="text-sm text-blue-500 hover:text-blue-700 transition duration-200 cursor-pointer text-center mb-2 absolute right-3 top-3"
            onClick={() => setPasswordResetModalVisible(true)}
          >
            ¿Olvidaste tu contraseña?
          </p>
          <Input
            label="Contraseña"
            placeholder="****"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-center text-red-700 py-1">
              {formik.errors.password}
            </p>
          ) : null}
          {error && <p className="text-red-700 py-3">{error}</p>}
        </div>

        <Button buttonText={isLoading ? "Cargando..." : "Iniciar sesión"} />
      </form>

      <PasswordResetModal
        visible={isPasswordResetModalVisible}
        onClose={() => setPasswordResetModalVisible(false)}
      />
    </div>
  );
};

export default LoginForm;
