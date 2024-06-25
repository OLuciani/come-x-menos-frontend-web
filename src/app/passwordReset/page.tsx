/* "use client";
import { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Context } from "@/context/Context";

interface ValidationErrors {
  [key: string]: string;
}

const PasswordResetPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setSelectedOption } = useContext(Context);

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);

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

  const resetValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La nueva contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), undefined],
        "Las contraseñas deben coincidir"
      )
      .required("La confirmación de la contraseña es obligatoria"),
  });

  const handleSubmitReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetValidationSchema.validate(
        { newPassword, confirmPassword },
        { abortEarly: false }
      );
      setErrors({});

      if (!token || !email) {
        console.error("El token o el email no están presentes");
        return;
      }

      console.log("Reseteando contraseña...");

      // Primero, actualiza la contraseña en MongoDB
      const response = await axios.patch(
        `http://localhost:5050/api/resetPassword`,
        {
          email: email,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Contraseña restablecida correctamente en MongoDB");
        setShowMessage(true); //Para mostrar mensaje de restablecimiento exitoso de la contraseña
        setTimeout(() => {
          router.push("/login"); //Una vez restablecida la contraseña se redirije a login
          setSelectedOption("Iniciar sesión");
        }, 10000);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: ValidationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path as string] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Error al restablecer la contraseña:", error);
      }
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="w-[90%] sm:w-[50%] p-6 bg-white rounded-lg shadow-md flex justify-center items-center">
        {!showMessage ? (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Restablecer contraseña
            </h2>
            <form onSubmit={handleSubmitReset}>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.newPassword && (
                  <p className="text-red-500">{errors.newPassword}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Restablecer contraseña
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-lg font-bold mt-8">
              Tu contraseña ha sido restablecida con éxito. Ahora puedes iniciar
              sesión con tu nueva contraseña. Si encuentras algún problema, no
              dudes en contactar a nuestro equipo de soporte. Gracias por
              utilizar nuestros servicios.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordResetPage; */



import { Krona_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import PasswordResetForm from "./form";

const krona = Krona_One({ weight: "400", subsets: ["latin"] });
const PasswordResetPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
       
            {/* <h1
            className={`${krona.className} text-[34px] text-[#FD7B03] text-center mb-10`}
            >
            Comé x menos
            </h1>
            <p className="font-semibold text-2xl text-center text-[#FD7B03]">
            Iniciar sesión
            </p> */}
            <PasswordResetForm />
            {/* <p className="text-center my-5 text-sm font-medium">
            ¿No eres miembro? {" "}
            <span className="text-[#fc7b03] ml-2">
                <Link href="/register">Registrate gratis</Link>
            </span>
            </p> */}
        
    </div>
  );
};

export default PasswordResetPage;