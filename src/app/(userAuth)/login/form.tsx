"use client";
//Este login funciona perfecto
/* import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "@/context/Context";
import Input from "@/components/InputAuth/Input";
import { login } from "@/services/apiCall";
import { loginUserWithFirebase } from "@/services/authService";
import PasswordResetModal from "@/components/passwordResetModal/PasswordResetModal";  // Importa el modal
import Cookies from "js-cookie";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordResetModalVisible, setPasswordResetModalVisible] = useState(false);  // Estado para el modal
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
    setIsLoggedIn
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
          setError(firebaseResponse.error);
        } else {
          const response = await login(values);
          if ("error" in response) {
            setError(response.error);
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
              const { token, role, _id, name, businessName, businessId, businessType } = response;


              const tokenStr = String(token);
              const roleStr = String(role);
              const userIdStr = String(_id);
              const nameStr = String(name);
              const businessNameStr = String(businessName);
              const businessIdStr = String(businessId);
              const businessTypeStr = String(businessType);

              Cookies.set('userToken', tokenStr, { expires: 1, secure: true, sameSite: 'strict' });
              Cookies.set('userRole', roleStr, { expires: 1, secure: true, sameSite: 'strict' });
              Cookies.set('userId', userIdStr, { expires: 1, secure: true, sameSite: 'strict' });
              Cookies.set('userName', nameStr, { expires: 1, secure: true, sameSite: 'strict' });
              Cookies.set('businessName', businessNameStr, { expires: 1, secure: true, sameSite: 'strict' });
              Cookies.set('businessId', businessIdStr, { expires: 1, secure: true, sameSite: 'strict' });
              Cookies.set('businessType', businessTypeStr, { expires: 1, secure: true, sameSite: 'strict' });

              const cookieUserToken = Cookies.get('userToken') || '';
              //console.log(cookieUserToken);

              const cookieUserRole = Cookies.get('userRole') || '';
              setUserRole(cookieUserRole);

              setIsLoggedIn(true); //Variable bandera del context cuando se loguea exitosamente el usuario
              
              setUserId(userIdStr);
              setUserName(nameStr);
              setBusinessName(businessNameStr);
              setBusinessId(businessIdStr);
              setBusinessType(businessTypeStr); 

              setBackgroundButtonNavBar(true);

              router.push("/");
            } else {
              setError("Invalid response from server");
            }
          }
        }
      } catch (err) {
        setError("Network error or server is unreachable");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full px-4 sm:w-[450px] flex flex-col items-center mx-auto gap-6"
      >
        <div className="w-full">
          <Input
            label="Email"
            placeholder="rafaric@yahoo.com.ar"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-center text-red-700 py-1">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="w-full">
          <p
            className="text-sm text-blue-500 cursor-pointer text-center mb-2"
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

        <button
          className="w-full bg-[#FFCF91] text-[18px] font-semibold text-white mt-3 h-[60px] rounded-[30px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91]"
          type="submit"
          disabled={isLoading}
        >
          <div className="flex justify-center">
            <div className="w-[98%] bg-[#FD7B03] rounded-[30px] py-[7px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </div>
          </div>
        </button>
      </form>

      <PasswordResetModal
        visible={isPasswordResetModalVisible}
        onClose={() => setPasswordResetModalVisible(false)}
      />
    </>
  );
};

export default LoginForm; */

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "@/context/Context";
import Input from "@/components/InputAuth/Input";
import { login } from "@/services/apiCall";
import { loginUserWithFirebase } from "@/services/authService";
import PasswordResetModal from "@/components/passwordResetModal/PasswordResetModal"; // Importa el modal
import Cookies from "js-cookie";

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

              router.push("/");
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
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full px-4 sm:w-[450px] flex flex-col items-center mx-auto gap-6"
      >
        <div className="w-full">
          <Input
            label="Email"
            placeholder="rafaric@yahoo.com.ar"
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

        <div className="w-full">
          <p
            className="text-sm text-blue-500 cursor-pointer text-center mb-2"
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

        <button
          className="w-full bg-[#FFCF91] text-[18px] font-semibold text-white mt-3 h-[60px] rounded-[30px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91]"
          type="submit"
          disabled={isLoading}
        >
          <div className="flex justify-center">
            <div className="w-[98%] bg-[#FD7B03] rounded-[30px] py-[7px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
              {isLoading ? "Cargando..." : "Iniciar sesión"}
            </div>
          </div>
        </button>
      </form>

      <PasswordResetModal
        visible={isPasswordResetModalVisible}
        onClose={() => setPasswordResetModalVisible(false)}
      />
    </>
  );
};

export default LoginForm;
