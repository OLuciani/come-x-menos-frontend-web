"use client"
import { useState, useEffect, useContext, Suspense } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Context } from "@/context/Context";
import Button from "@/components/button/Button";

interface ValidationErrors {
  [key: string]: string;
}

// Configura Axios para enviar cookies automáticamente con cada solicitud
axios.defaults.withCredentials = true;

// Componente de formulario para restablecer la contraseña
const PasswordResetForm: React.FC = () => {
  // Obtener parámetros de la URL (token y email)
  const searchParams = useSearchParams();

  const router = useRouter();
  const { setSelectedOption } = useContext(Context);

  // Definición de los estados locales para manejar los valores del formulario y errores
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  // useEffect para obtener el token y el email desde los parámetros de la URL
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const emailFromUrl = searchParams.get("email");

    if (!tokenFromUrl || !emailFromUrl) {
      console.error("El token o el email no están presentes en la URL");
      return;
    }

    setToken(tokenFromUrl);
    setEmail(emailFromUrl);
    //setEmail("mariacharriol@gmail.com");
  }, [searchParams]);

  console.log("Valor del token: ", token);
  console.log("Valor del email que llega en el resetLink: ", email);

  // Esquema de validación para las contraseñas con Yup
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

  // Función que maneja el envío del formulario de restablecimiento de contraseña
  const handleSubmitReset = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(token);
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

      // Realiza la solicitud para restablecer la contraseña en el backend
      const response = await axios.patch(`/api/resetPassword`,
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

      // Si la respuesta es exitosa
      if (response.status === 200) {
        console.log("Contraseña restablecida correctamente en MongoDB");
        setShowMessage(true); // Para mostrar mensaje de restablecimiento exitoso de la contraseña
        setTimeout(() => {
        // Redirige a la aplicación móvil usando la URL de Expo para desarrollo. Esto sirve solo mientras desarrollo la app. Cambiar esto cuando tenga un dominio propio.
        
        window.location.href = 'exp://192.168.100.2:8081'; // Usa la URL local de Expo para desarrollo

          // Cierra la ventana si es posible
          setTimeout(() => {
            if (window.opener) {
              window.close();
            } else {
              // En caso de que la ventana no pueda ser cerrada
              router.push("/login");
              setSelectedOption("Iniciar sesión");
            }
          }, 2000); // Espera 2 segundos para redirigir antes de intentar cerrar la ventana
        }, 2000); // Espera 2 segundos antes de redirigir
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
              <Button buttonText="Restablecer contraseña" />
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
  );
};

// Componente que maneja el renderizado con Suspense (cargando el formulario)
export default function PasswordResetPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PasswordResetForm />
    </Suspense>
  );
}

