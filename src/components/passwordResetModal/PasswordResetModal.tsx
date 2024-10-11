"use client"
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "../../utils/firebase-config";
import { useRouter } from "next/navigation";
import Button from "../button/Button";

interface PasswordResetModalProps {
  visible: boolean;
  onClose: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  visible,
  onClose,
}) => {
  //Creo constante con la variable de entorno de la url del backend
  const BASE_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  //const [step, setStep] = useState<number>(1);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  if (!visible) return null;

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
  });

  const resetValidationSchema = Yup.object().shape({
    token: Yup.string().required("El token es obligatorio"),
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

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailValidationSchema.validate({ email }, { abortEarly: false });
      setErrors({});

      console.log("Enviando solicitud de correo electrónico...");
      const responseCheckEmail = await axios.get(
        //`https://discount-project-backend.onrender.com/api/checkEmail/${email}`
        //`http://localhost:5050/api/checkEmail/${email}`
        `${BASE_BACKEND_URL}/api/checkEmail/${email}`
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-[90%] sm:w-[50%] sm:h-[60%] xl:w-[30%] flex items-center justify-center relative">
        {!showMessage ? (
          <div>
            <button
              onClick={onClose}
              className="text-gray-500 absolute top-5 right-5"
            >
              X
            </button>
            <h2 className="text-xl mb-4">Restablecer contraseña</h2>

            <form onSubmit={handleSubmitEmail}>
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
                {/* <button
                  type="submit"
                  className="w-full bg-[#FFCF91] text-[18px] font-semibold text-white mt-3 h-[60px] rounded-[30px] border-[5px] border-[#FD7B03] transition-colors duration-300 ease-in-out hover:bg-[#FD7B03] hover:text-[#FFCF91] hover:border-[#FFCF91]"
                >
                  <div className="flex justify-center">
                    <div className="w-[98%] bg-[#FD7B03] rounded-[30px] py-[7px] hover:bg-[#FFCF91] hover:text-[#FD7B03]">
                      Enviar enlace                    
                    </div>
                  </div>
                </button> */}
                <Button buttonText="Enviar enlace" />
              </div>
            </form>
            <p className="text-[14px] mt-5">Se enviará un enlace a tu correo electrónico para que restablezcas tu contraseña.</p>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <button
              onClick={onClose}
              className="text-gray-500 absolute top-4 right-4"
            >
              X
            </button>
            
            <p className="text-lg font-bold mt-8">
              Hemos enviado un correo electrónico con un enlace para restablecer
              tu contraseña. Por favor, revisa tu bandeja de entrada y sigue las
              instrucciones que encontrarás en el mensaje. Si no ves el correo
              en tu bandeja de entrada, verifica también la carpeta de spam o
              correo no deseado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordResetModal;
