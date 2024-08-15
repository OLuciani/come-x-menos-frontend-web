"use client";
//Este funciona perfecto
/* import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "@/context/Context";
import Input from "@/components/InputAuth/Input";
import { login } from "@/services/apiCall";
import { loginUserWithFirebase } from "@/services/authService";
import PasswordResetModal from "@/components/passwordResetModal/PasswordResetModal"; // Importa el modal
import Cookies from "js-cookie";
import Button from "@/components/button/Button";
import { UserProfile } from '../../../services/apiCall';

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordResetModalVisible, setPasswordResetModalVisible] =
    useState(false); // Estado para el modal
  const router = useRouter();
  const {
    userId,
    setUserId,
    userRole,
    setUserRole,
    userToken,
    setUserToken,
    setUserName,
    setBackgroundButtonNavBar,
    businessName,
    setBusinessName,
    businessId,
    setBusinessId,
    businessType,
    setBusinessType,
    isLoggedIn,
    setIsLoggedIn,
    setSelectedOption,
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
          const firebaseError: any = firebaseResponse.error;
          let customErrorMessage = "Error desconocido";

          // Mapea errores específicos de Firebase a mensajes personalizados en español
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
        } else {
          const response = await login(values);
          if ("error" in response) {
            const backendError: any = response.error;
            let backendErrorMessage = "Error desconocido";

            // Mapea errores específicos del backend a mensajes personalizados en español
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
          } else {
            if (
              "token" in response &&
              "role" in response &&
              "_id" in response &&
              "name" in response &&
              "businessName" in response &&
              "businessId" in response &&
              "businessType" in response
            ) {
              const {
                token,
                role,
                _id,
                name,
                businessName,
                businessId,
                businessType,
              } = response;

              const tokenStr = String(token);
              const roleStr = String(role);
              const userIdStr = String(_id);
              const nameStr = String(name);
              const businessNameStr = String(businessName);
              const businessIdStr = String(businessId);
              const businessTypeStr = String(businessType);

              Cookies.set("userToken", tokenStr, {
                expires: 1,
                secure: true,
                sameSite: "strict",
              });

              Cookies.set("userRole", roleStr, {
                expires: 1,
                secure: true,
                sameSite: "strict",
              });

              Cookies.set("userId", userIdStr, {
                expires: 1,
                secure: true,
                sameSite: "strict",
              });

              Cookies.set("userName", nameStr, {
                expires: 1,
                secure: true,
                sameSite: "strict",
              });

              Cookies.set("businessName", businessNameStr, {
                expires: 1,
                secure: true,
                sameSite: "strict",
              });
              
              Cookies.set("businessId", businessIdStr, {
                expires: 1,
                secure: true,
                sameSite: "strict",
              });

              Cookies.set("businessType", businessTypeStr, {
                expires: 1,
                secure: true,
                sameSite: "strict",
              });

              const cookieUserToken = Cookies.get("userToken") || "";
              const cookieUserRole = Cookies.get("userRole") || "";
              console.log(cookieUserToken);

              setIsLoggedIn(true);
              setUserRole(cookieUserRole);
              setUserId(userIdStr);
              setUserName(nameStr);
              setBusinessName(businessNameStr);
              setBusinessId(businessIdStr);
              setBusinessType(businessTypeStr);

              setBackgroundButtonNavBar(true);

              const expirationTime = 15 * 60 * 1000;

              setTimeout(() => {
                Cookies.remove("userToken");
                Cookies.remove("userRole");
                setUserId("");
                setUserRole("");
                setUserToken("");
                setUserName("");
                router.push("/login");
                setSelectedOption("Iniciar sesión");
              }, expirationTime);

              router.push("/myAccount");
            } else {
              setError("Respuesta inválida del servidor");
            }
          }
        }
      } catch (err) {
        setError("Error de red o el servidor no está disponible");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
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
            className="text-sm text-blue-500 cursor-pointer text-center mb-2 absolute right-3 top-3"
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

export default LoginForm; */

//el que estaba probando
/* import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "@/context/Context";
import Input from "@/components/InputAuth/Input";
import { login, userProfile, UserProfile, User } from "@/services/apiCall";
import { loginUserWithFirebase } from "@/services/authService";
import PasswordResetModal from "@/components/passwordResetModal/PasswordResetModal"; // Importa el modal
import Cookies from "js-cookie";
import Button from "@/components/button/Button";

interface LoginResponse {
  message?: string;  // Cambiar a opcional
  success?: boolean; // Cambiar a opcional
  userId?: string;
  userLoged?: boolean;
  error?: string;
}

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordResetModalVisible, setPasswordResetModalVisible] =
    useState(false); // Estado para el modal
  const router = useRouter();
  const {
    userId,
    setUserId,
    userRole,
    setUserRole,
    userToken,
    setUserToken,
    setUserName,
    setBackgroundButtonNavBar,
    businessName,
    setBusinessName,
    businessId,
    setBusinessId,
    businessType,
    setBusinessType,
    isLoggedIn,
    setIsLoggedIn,
    setSelectedOption,
    setValidToken
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
          const firebaseError: any = firebaseResponse.error;
          let customErrorMessage = "Error desconocido";

          // Mapea errores específicos de Firebase a mensajes personalizados en español
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
        } else {
          const response: LoginResponse = await login(values);
          if ("error" in response) {
            const backendError: any = response.error;
            let backendErrorMessage = "Error desconocido";

            // Mapea errores específicos del backend a mensajes personalizados en español
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
          } else {
            if(response.success === true) {
              setIsLoggedIn(true);

              setUserToken("true");

              Cookies.set("userToken", "true", {
                expires: 1,
                secure: true,
                sameSite: "strict",
              });
            
          }

          if (Cookies.get('token')) {
          const response = await userProfile();
              //console.log("valor de response de userProfile: ", response);
              if(response === "Token válido") {
                setValidToken(true);

                setUserToken("true");

                Cookies.set("userToken", "true", {
                  expires: 1,
                  secure: true,
                  sameSite: "strict",
                });
              }

              Cookies.set("userRole", response.user.role, {
                expires: 1,
                secure: true,
                sameSite: "strict",
              });


              Cookies.set("userName", response.user.name, {
                expires: 1,
                secure: true,
                sameSite: "strict",
              });

              Cookies.set("businessName", response.user.businessName, {
                expires: 1,
                secure: true,
                sameSite: "strict",
              });
              

              Cookies.set("businessType", response.user.businessType, {
                expires: 1,
                secure: true,
                sameSite: "strict",
              });

              console.log("valor de responseeeeeeeeeee: ", response);


              setUserToken("true");
              setUserRole(response.user.role);
              //setUserId(response.user._id);
              setUserName(response.user.name);
              setBusinessName(response.user.businessName);
              //setBusinessId(response.user.businessId);
              setBusinessType(response.user.businessType);


              router.push("/myAccount");
            }

          }

        }
      } catch (err) {
        setError("Error de red o el servidor no está disponible");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
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
            className="text-sm text-blue-500 cursor-pointer text-center mb-2 absolute right-3 top-3"
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

export default LoginForm; */

//Funciona perfecto sin utilizar id ni token en las peticiones (lo cambié por el que sigue que lo retoque un poco)
/* import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "@/context/Context";
import Input from "@/components/InputAuth/Input";
import { login, userProfile, UserProfile, User } from "@/services/apiCall";
import { loginUserWithFirebase } from "@/services/authService";
import PasswordResetModal from "@/components/passwordResetModal/PasswordResetModal"; // Importa el modal
import Cookies from "js-cookie";
import Button from "@/components/button/Button";
import TokenExpiredModal from "@/components/tokenExpiredModal/TokenExpiredModal";

interface LoginResponse {
  message?: string;  // Cambiar a opcional
  success?: boolean; // Cambiar a opcional
  userId?: string;
  userLoged?: boolean;
  error?: string;
}


const LoginForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordResetModalVisible, setPasswordResetModalVisible] =
    useState(false); // Estado para el modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para manejar el modal TokenExpiredModal.tsx
  const router = useRouter();
  const {
    setUserToken,
    setUserRole,
    setUserName,
    setBusinessName,
    setBusinessType,
    setIsLoggedIn,
    setValidToken,
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
          const firebaseError: any = firebaseResponse.error;
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
        } else {
          const loginResponse: LoginResponse = await login(values);

          if ("error" in loginResponse) {
            const backendError: any = loginResponse.error;
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
          } else {
            if (loginResponse.success) {
              setIsLoggedIn(true);

              setUserToken("true");

              Cookies.set("userToken", "true", {
                expires: 1,
                secure: true,
                sameSite: "strict",
              });

              // Espera hasta que la cookie esté disponible
              if (Cookies.get("userToken")) {
                console.log("Por fin se instaló la cookie");//Este console.log no se ejecuta asi que fetchUserProfile() tampoco
                await fetchUserProfile();
              }
            }
          }
        }
      } catch (err) {
        setError("Error de red o el servidor no está disponible");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Función separada para obtener el perfil del usuario
  const fetchUserProfile = async () => {
    console.log("estoy adentro de fetchUserProfile")
    try {
      const response = await userProfile();
      
      if(response === "Token inválido o expirado") {
        setIsModalOpen(true); // Muestra el modal TokenExpiredModal.tsx si el token es inválido y redirecciona a login
      }

      Cookies.set("userRole", response.user.role, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("userName", response.user.name, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("businessName", response.user.businessName, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("businessType", response.user.businessType, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      setUserRole(response.user.role);
      setUserName(response.user.name);
      setBusinessName(response.user.businessName);
      setBusinessType(response.user.businessType);

      router.push("/myAccount");
   
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  return (
    <div>
      <TokenExpiredModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
            className="text-sm text-blue-500 cursor-pointer text-center mb-2 absolute right-3 top-3"
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

export default LoginForm; */



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
    setIsLoggedIn(true);
    setUserToken("true");

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
      } else {
        router.push("/");
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
