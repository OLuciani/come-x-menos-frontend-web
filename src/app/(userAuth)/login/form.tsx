"use client"
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "@/context/Context";
import Input from "@/components/InputAuth/Input";
import { login } from "@/services/apiCall";
import { loginUserWithFirebase } from "@/services/authService";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useRouter();
  const { userId, setUserId, newRole, setNewRole, userToken, setUserToken, setUserName, setBackgroundButtonNavBar, businessName, setBusinessName,businessId, setBusinessId, businessType, setBusinessType } =useContext(Context);

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
        // Primero autentica en Firebase
        const firebaseResponse = await loginUserWithFirebase(
          values.email,
          values.password
        );
        if (firebaseResponse.error) {
          setError(firebaseResponse.error);
        } else {
          // Luego autentica en el backend
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

              localStorage.setItem("token", tokenStr);
              localStorage.setItem("role", roleStr);
              localStorage.setItem("_id", userIdStr);
              localStorage.setItem("name", nameStr);
              localStorage.setItem("businessName", businessNameStr);
              localStorage.setItem("businessId", businessIdStr);
              localStorage.setItem("businessType", businessTypeStr);


              setNewRole(localStorage.getItem("role") || "");
              setUserToken(localStorage.getItem("token") || "");
              setUserId(userIdStr); // Actualiza el estado de userId en el contexto
              setUserName(nameStr);
              setBusinessName(businessNameStr);
              setBusinessId(businessIdStr);
              setBusinessType(businessTypeStr);

              setBackgroundButtonNavBar(true);

              const expirationTime = 15 * 60 * 1000;
              setTimeout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("_id");
                localStorage.removeItem("name");
                localStorage.removeItem("businessName");
                localStorage.removeItem("businessId");
                localStorage.removeItem("businessType")
                
                setNewRole("");
                setUserToken("");
                setUserId("");
                setUserName("");
                setBusinessName("");
                setBusinessId("");
                setBusinessType("");
              }, expirationTime);



              navigation.push("/");
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

  console.log(
    "Valor de token en localStorage: ",
    localStorage.getItem("token")
  );
  console.log("Valor de userId en estado: ", userId); // Asegúrate de que userId esté actualizado
  console.log("Valor de newToken en estado: ", userToken);
  console.log("Valor de newRole en estado:", newRole);
  console.log("Nombre del negocio, variable businessName: ", businessName);
  console.log("Valor del id del negocio (businessId): ", businessId);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[80%] sm:w-[500px] flex flex-col items-center mx-auto gap-5"
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
        <Input
          label="Contraseña"
          placeholder="********"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          extra="¿Olvidaste tu contraseña?"
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
  );
};

export default LoginForm;
