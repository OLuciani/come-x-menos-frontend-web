"use client";
import { useState } from "react";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import Button from "../../../components/button/Button";
import { useRouter } from "next/navigation";

interface ValidationErrors {
  [key: string]: string;
}

const EmailConfirmPage: React.FC = () => {
  //Creo constante con la variable de entorno de la url del backend
  const BASE_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Nuevo estado para el mensaje de alerta
  const router = useRouter();

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
  });

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null); // Reinicia el mensaje de alerta al enviar una nueva solicitud

    try {
      await emailValidationSchema.validate({ email }, { abortEarly: false });
      setErrors({});

      console.log("Enviando solicitud de chequeo de correo electrónico...");
      const responseConfirmEmail = await axios.post(`/api/confirm_email`,
        { email }
      );

      const dataConfirmEmail = responseConfirmEmail.data;

      if (dataConfirmEmail.success) {
        console.log(
          "Correo electrónico con token para confirmar la autenticidad del email del usuario que está por crear una cuenta enviado correctamente."
        );
        setShowMessage(true);
      }
    } catch (error) {
      // Verificamos si el error es una instancia de AxiosError
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          setErrorMessage("El correo electrónico ya está registrado. Serás redirigido a la página de inicio de sesión.");
          setTimeout(() => {
            router.push("/login");
          }, 7000);
        } else {
          setErrorMessage("Hubo un error al procesar tu solicitud. Inténtalo de nuevo más tarde.");
          setTimeout(() => {
            router.push("/");
          }, 6000);
        }
      } else if (error instanceof Yup.ValidationError) {
        const validationErrors: ValidationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path as string] = err.message;
        });
        setErrors(validationErrors);
      } else {
        setErrorMessage("Hubo un error al procesar tu solicitud. Inténtalo de nuevo más tarde.");
        console.error("Error al procesar la solicitud:", error);
        setTimeout(() => {
          router.push("/");
        }, 6000);
      }
    } finally {
      setIsSubmitting(false); // Termina el proceso de solicitud
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="w-full p-4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex">
        {showMessage ? (
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-lg font-bold mt-8 text-center">
              Hemos enviado un correo electrónico con un enlace para que crees tu cuenta en la aplicación. Por favor, revisa tu bandeja de entrada y sigue las
              instrucciones que encontrarás en el mensaje. Si no ves el correo en
              tu bandeja de entrada, verifica también la carpeta de spam o correo
              no deseado.
            </p>
          </div>
        ) : (
          <div>
            <div className="w-full flex flex-col items-center">
              <h1 className="text-3xl text-[gray] mb-8">Crear cuenta</h1>
              <h2 className="text-xl text-[gray] mb-4">Confirmación de Correo</h2>

              <form onSubmit={handleSubmitEmail} className="w-full">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="mt-6">
                  <Button
                    buttonText={isSubmitting ? "Enviando..." : "Enviar enlace"} // Cambia el texto según el estado
                    disabled={isSubmitting} // Desactiva el botón mientras se envía la solicitud
                  />
                </div>
                
                {errorMessage && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white p-6 rounded shadow-lg z-60 max-w-md w-full mx-4">
                      <div className="text-center text-lg font-bold text-red-700 mb-4">
                        Error
                      </div>
                      <p className="text-center text-gray-700">
                        {errorMessage}
                      </p>
                    </div>
                  </div>
                )}
              </form>
              <p className="text-sm mt-5 text-center">
                Se enviará un enlace a tu correo electrónico para que crees tu cuenta
                en la aplicación.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmPage;





