/* "use client"; */
/* import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import Button from "../../../components/button/Button";

interface EmailConfirmationRequestProps {
  visible: boolean;
  onClose: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const EmailConfirmPage: React.FC<EmailConfirmationRequestProps> = ({
  visible,
  onClose,
}) => {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showMessage, setShowMessage] = useState<boolean>(false);

  if (!visible) return null;

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
  });

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailValidationSchema.validate({ email }, { abortEarly: false });
      setErrors({});

      console.log("Enviando solicitud de correo electrónico...");
      const responseCheckEmail = await axios.get(
        `https://discount-project-backend.onrender.com/api/checkEmail/${email}`
        //`http://localhost:5050/api/checkEmail/${email}`
      );
      const dataCheckEmail = responseCheckEmail.data;

      if (dataCheckEmail.success) {
        console.log(
          "Correo electrónico con token para restablecer password en cuenta de usuario en Mongo DB Atlas enviado correctamente"
        );
        setShowMessage(true);
        setTimeout(() => {
          onClose();
        }, 15000);
      } else {
        console.error(
          "Error al enviar correo electrónico:",
          dataCheckEmail.message
        );
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: ValidationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path as string] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Error al validar el formulario:", error);
      }
    }
  };

  return (
   
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex flex-col items-center justify-center relative">
        
          <div className="w-full flex flex-col items-center">
            
            <h2 className="text-2xl mb-4">Solicitud de Confirmación de Correo</h2>

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
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="mt-6">
                <Button buttonText="Enviar enlace" />
              </div>
            </form>
            <p className="text-sm mt-5 text-center">Se enviará un enlace a tu correo electrónico para que crees tu cuenta en la aplicación.</p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <button
              onClick={onClose}
              className="text-gray-500 absolute top-5 right-5 text-2xl"
            >
              ×
            </button>
            
            <p className="text-lg font-bold mt-8 text-center">
              Hemos enviado un correo electrónico con un enlace para restablecer
              tu contraseña. Por favor, revisa tu bandeja de entrada y sigue las
              instrucciones que encontrarás en el mensaje. Si no ves el correo
              en tu bandeja de entrada, verifica también la carpeta de spam o
              correo no deseado.
            </p>
          </div>
       
      </div>
    
  );
};

export default EmailConfirmPage; */




/* import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import Button from "../../../components/button/Button";

interface ValidationErrors {
  [key: string]: string;
}

const EmailConfirmPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
  });

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailValidationSchema.validate({ email }, { abortEarly: false });
      setErrors({});

      console.log("Enviando solicitud de correo electrónico...");
      const responseCheckEmail = await axios.get(
        `https://discount-project-backend.onrender.com/api/checkEmail/${email}`
        //`http://localhost:5050/api/checkEmail/${email}`
      );
      const dataCheckEmail = responseCheckEmail.data;

      if (dataCheckEmail.success) {
        console.log(
          "Correo electrónico con token para restablecer la contraseña enviado correctamente"
        );
        setShowMessage(true);
      } else {
        console.error(
          "Error al enviar correo electrónico:",
          dataCheckEmail.message
        );
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: ValidationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path as string] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Error al validar el formulario:", error);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex flex-col items-center justify-center">
      {showMessage ? (
        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-lg font-bold mt-8 text-center">
            Hemos enviado un correo electrónico con un enlace para restablecer
            tu contraseña. Por favor, revisa tu bandeja de entrada y sigue las
            instrucciones que encontrarás en el mensaje. Si no ves el correo en
            tu bandeja de entrada, verifica también la carpeta de spam o correo
            no deseado.
          </p>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="w-full flex flex-col items-center bg-yellow-300">
            <h2 className="text-2xl mb-4">Solicitud de Confirmación de Correo</h2>
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
                <Button buttonText="Enviar enlace" />
              </div>
            </form>
            <p className="text-sm mt-5 text-center">
              Se enviará un enlace a tu correo electrónico para que crees tu cuenta
              en la aplicación.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailConfirmPage; */





/* "use client";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import Button from "../../../components/button/Button";

interface ValidationErrors {
  [key: string]: string;
  
}

interface ConfirmEmail {
  email: string;
}

const EmailConfirmPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
  });

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailValidationSchema.validate({ email }, { abortEarly: false });
      setErrors({});

      console.log("Enviando solicitud de correo electrónico...");
      const responseConfirmEmail = await axios.post(
        `https://discount-project-backend.onrender.com/api/confirm_email`,
        //`http://localhost:5050/api/confirm_email`,
        {
          email: email
        }
      );
      const dataConfirmEmail = responseConfirmEmail.data;

      if (dataConfirmEmail.success) {
        console.log(
          "Correo electrónico con token para confirmar la autenticidad del email del usuario que esta por crear una cuenta enviado correctamente."
        );
        setShowMessage(true);
      } else {
        console.error(
          "Error al enviar correo electrónico:",
          dataConfirmEmail.message
        );
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: ValidationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path as string] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Error al validar el formulario:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="w-full p-4 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex">
        {showMessage ? (
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-lg font-bold mt-8 text-center">
              Hemos enviado un correo electrónico con un enlace para crees una cuenta en la aplicación. Por favor, revisa tu bandeja de entrada y sigue las
              instrucciones que encontrarás en el mensaje. Si no ves el correo en
              tu bandeja de entrada, verifica también la carpeta de spam o correo
              no deseado.
            </p>
          </div>
        ) : (
          <div className="">
            <div className="w-full flex flex-col items-center">
              <h2 className="text-2xl mb-4">Confirmación de Correo</h2>
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
                  <Button buttonText="Enviar enlace" />
                </div>
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

export default EmailConfirmPage; */



/* "use client";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import Button from "../../../components/button/Button";

interface ValidationErrors {
  [key: string]: string;
}

const EmailConfirmPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
  });

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await emailValidationSchema.validate({ email }, { abortEarly: false });
      setErrors({});

      console.log("Enviando solicitud de correo electrónico...");
      const responseConfirmEmail = await axios.post(
        //`https://discount-project-backend.onrender.com/api/confirm_email`,
        `http://localhost:5050/api/confirm_email`,
        {
          email: email,
        }
      );


      const dataConfirmEmail = responseConfirmEmail.data;

      if (dataConfirmEmail.success) {
        console.log(
          "Correo electrónico con token para confirmar la autenticidad del email del usuario que está por crear una cuenta enviado correctamente."
        );
        setShowMessage(true);
      } else {
        console.error(
          "Error al enviar correo electrónico:",
          dataConfirmEmail.message
        );
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: ValidationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path as string] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Error al validar el formulario:", error);
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
              Hemos enviado un correo electrónico con un enlace para que crees una cuenta en la aplicación. Por favor, revisa tu bandeja de entrada y sigue las
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
                    buttonText={isSubmitting ? "Enviando..." : "Enviar enlace"} // Cambio el texto según el estado
                    disabled={isSubmitting} // Desactivo el botón mientras se envía la solicitud
                  />
                </div>
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
 */



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

      console.log("Enviando solicitud de correo electrónico...");
      const responseConfirmEmail = await axios.post(
        `https://discount-project-backend.onrender.com/api/confirm_email`,
        //`http://localhost:5050/api/confirm_email`,
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





