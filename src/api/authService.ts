import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { verifyToken } from "@/services/tokenVerificationService";
import { UserLogin } from "@/types/authTypes";
import apiClient from "@/utils/axiosConfig"

// Configuro Axios para enviar cookies automáticamente
axios.defaults.withCredentials = true;

//Creo constante con la variable de entorno de la url del backend
const BASE_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const handleResponse = <T>(response: AxiosResponse<T>): T | string => {
  if (response.status === 200 && response.data) {
    return response.data;
  }
  throw new Error("Request failed");
};

const handleError = (error: any): string => {
  if (error.response) {
    return error.response.data.message;
  } else if (error.request) {
    return "No se recibió respuesta del servidor";
  } else {
    return error.message;
  }
};



//Solicitud post al backend para loguear a un usuario (para iniciar sesión)
export async function login(
    data: UserLogin
  ): Promise<{ userId: string; userLoged: boolean } | { error: string }> {
    try {
      const response = await axios.post(
        `/api/login`,
        {
          email: data.email,
          password: data.password,
        }
      );
  
      if (response.status === 200) {
        console.log(
          "Usuario autenticado con éxito en Mongo DB Atlas: ",
          response.data
        );
        return response.data;
      } else {
        throw new Error("Login failed");
      }
    } catch (error: any) {
      if (error.response) {
        // El error es una respuesta HTTP con datos
        return { error: error.response.data.message };
      } else if (error.request) {
        // El error es una solicitud hecha pero no se recibió respuesta
        return { error: "No se recibió respuesta del servidor" };
      } else {
        // Error inesperado
        return { error: error.message };
      }
    }
  } 


  export async function userProfile() {
    try {
      const response = await apiClient.get(
        `/api/user_profile`,
        {
          withCredentials: true, // Esta línea asegura que las cookies (entre ellas va la del token que es indispensable en esta ruta) se envíen con la solicitud
        }
      );
  
      if (response.status === 200 && response.data) {
        console.log(
          "Datos del perfil de usuario traido de MongoDB Atlas:",
          response.data
        );
        return response.data;
      } else {
        console.log(
          "El pedido del perfil del usuario al backend no fue exitoso:",
          response.data
        );
        return "Error al pedir el perfil del usuario al backend";
      }
    } catch (error: any) {
      // Si el error tiene el flag `isAuthError`, puedo manejarlo aquí o en el componente que llama la función
      if (error.isAuthError) {
        console.error("Error de autenticación:", error.message);
        return "TOKEN_EXPIRED";
      }

      console.error(
        "Error al pedir el perfil del usuario al backend:",
        error.message
      );
      return "Error al pedir el perfil del usuario al backend";
    }
  }