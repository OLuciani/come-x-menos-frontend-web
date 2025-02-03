"use client"
import React, { useContext, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "@/context/Context";
import Input from "@/components/InputAuth/Input";
//import { login, userProfile } from "@/services/apiCall";
//import { UserProfile } from '../../../services/apiCall';
import { login, userProfile } from "@/api/authService"
import { loginUserWithFirebase } from "@/services/firebaseAuthService";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordResetModalVisible, setPasswordResetModalVisible] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const {
    setUserToken,
    userToken,
    setUserRole,
    setUserName,
    setBusinessName,
    setBusinessType,
    setIsLoggedIn,
    setBackgroundButtonNavBar,
    setSelectedOption,
    userRole,
    setUserStatus,
    setUserSubRole
  } = useContext(Context);

  //const roleAppAdmin = process.env.NEXT_PUBLIC_ROLE_APP_ADMIN;
  //const roleBusinessDirector = process.env.NEXT_PUBLIC_ROLE_BUSINESS_DIRECTOR;
  //const roleBusinessManager = "process.env.NEXT_PUBLIC_ROLE_BUSINESS_MANAGER";
  //const roleBusinessEmployee = process.env.NEXT_PUBLIC_ROLE_BUSINESS_EMPLOYEE;
  //const roleMobileCustomer = process.env.NEXT_PUBLIC_ROLE_MOBILE_CUSTOMER;
  
  //Adjudico los roles a las constantes directamente y no con variables de entorno, ya que al utilizar un proxy en next.config.mjs para solucionar el problema con las cookies de terceros en algunos dispositivos que tienen por defecto navegadores como por ejemplo safari que no acepta cookies de terceros ese proxy crea conflicto con las variables de entorno en producción de vercel. Lo hago porque los valores que se adjudican no son datos sensibles, ya que los verdaderos roles son secrets que van en las cookies y se utilizan solo en el backend para autenticar roles en las rutas de las solicitudes.
  const roleAppAdmin = "appAdmin";
  const roleBusinessDirector = "businessDirector";
  const roleBusinessManager = "businessManager";
  const roleBusinessEmployee = "businessEmployee";


  console.log("Valor de roleBusinessEmploye: ", roleBusinessEmployee);
  console.log("Valor de roleBusinessDirector: ", roleBusinessDirector);

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
        // Si decides usar solo el backend
        await handleLogin(values); 
      } catch (err) {
        setError("Error de red o el servidor no está disponible");
      } finally {
        // Detén siempre el estado de carga, independientemente del resultado
        setIsLoading(false);
      }
    },
  });


  // Manejo de respuesta de inicio de sesión 
  const handleLogin = async (values: { email: string; password: string }) => {
    const loginResponse: LoginResponse = await login(values);

    
    console.log("Valor de loginResponse en login: ", loginResponse);

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

    // No es necesario verificar si la cookie está establecida, asumiendo que set fue exitoso
    await fetchUserProfile();
  };

  // Función para obtener el perfil del usuario
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await userProfile();
      console.log("Valor de response en userProfile()", response);

      /* if (response === "Token inválido o expirado") {
        setIsModalOpen(true);
        return;
      } */

      setUserToken("true"); //Como loginResponse.success === true le doy un valor true a userToken sin exponer el verdadero token.

    //Como loginResponse.success === true creo una cokie con el valor en string true.
    Cookies.set("userToken", "true", {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });

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

      Cookies.set("userSubRole", response.userSubRole, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      setBusinessName(response.businessName);
      setBusinessType(response.businessType);


      Cookies.set("userStatus", response.userStatus, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      setUserRole(response.userRole);
      const localUserRole: string = response.userRole;
      setUserSubRole(response.userSubRole);
      setUserName(response.userName);
      //setBusinessName(response.businessName);
      //setBusinessType(response.businessType);
      setUserStatus(response.userStatus);

      setBackgroundButtonNavBar(true);

      /* const expirationTime = 15 * 60 * 1000;

      setTimeout(() => {
        Cookies.remove("userToken");
        Cookies.remove("token"); //Remueve la cookie con el token
        Cookies.remove("userRole");
        Cookies.remove("userName");
        Cookies.remove("businessName");
        Cookies.remove("businessType");
        Cookies.remove("userStatus");

        setUserRole("");
        setUserToken("");
        setUserName("");
        setBusinessName("");
        setBusinessType("");
        setUserStatus("");

        setIsLoggedIn(false);

        router.push("/login");
      
        setSelectedOption("Iniciar sesión");
      }, expirationTime); */

      console.log("Valor del rol que llega en response: ", response.userRole);

      
      console.log("valor de response.userSTatus: ", response.userStatus);
      console.log("Valor de roleBusinessEmploye: ", roleBusinessEmployee);

      console.log("Valor de userToken:  ", userToken);
      if(response.userStatus !== "active") {
        router.push("/notifications");
        setSelectedOption("Notificaciones")
      }  else {
        if(response.userRole === roleAppAdmin) {
          router.push("/dashboardAplicationAdmin");
          setSelectedOption("Mi cuenta");
        } else if (response.userRole === roleBusinessDirector || response.userRole === roleBusinessManager || response.userRole === roleBusinessEmployee) {
          router.push("dashboardBusinessAdmin");
          setSelectedOption("Mi cuenta");
        } else {
          setTimeout(() => {
            setIsAccessModalOpen(true);//Modal para informar al usuario que no tiene credenciales para iniciar sesión

            //Limpio los valores en caso que un usuario de la app móvil intente iniciar sesión en esta app web
            Cookies.remove("userToken");
            Cookies.remove("token"); //Remueve la cookie con el token
            Cookies.remove("userRole");
            Cookies.remove("userName");
            Cookies.remove("businessName");
            Cookies.remove("businessType");
            Cookies.remove("userStatus");

            setUserRole("");
            setUserToken("");
            setUserName("");
            setBusinessName("");
            setBusinessType("");
            setUserStatus("");

            setIsLoggedIn(false);

            //router.push("/login");
          
            //setSelectedOption("Iniciar sesión");
          }, 2000);
        }
      }
    } catch (err) {
      console.error("Error al obtener el perfil del usuario:", err);
    }
  }, [router, setUserRole, setUserName, setBusinessName, setBusinessType, setUserStatus]);



  return (
    <div>
      {/* <TokenExpiredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
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
            placeholder="********"
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

        <Button 
          buttonText={isLoading ? "Cargando..." : "Iniciar sesión"} 
          disabled={isLoading} // Opcional para deshabilitar mientras carga
        />
      </form>

      <PasswordResetModal
        visible={isPasswordResetModalVisible}
        onClose={() => setPasswordResetModalVisible(false)}
      />
    </div>
  );
};

export default LoginForm;
