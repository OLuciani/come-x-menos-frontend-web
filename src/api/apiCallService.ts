import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { verifyToken } from "@/services/tokenVerificationService";
import { UsersDiscountsList } from "@/types/apiCallTypes";
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


//Solicitud para obtener los descuentos generados por clientes de la aplicación movil consumidos (utilizados).
export async function usersDiscountsList(): Promise<
  UsersDiscountsList[] | string
> {
  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) {
    console.log("Token inválido o expirado en discountList");
    return "Token inválido o expirado en discountList";
  }

  try {
    const response = await axios.get(
      `/api/consumed_discounts`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200 && response.data) {
      console.log(
        "Listado de descuentos consumidos por usuarios del negocio traidos de MongoDB Atlas:",
        response.data
      );
      return response.data;
    } else {
      console.log(
        "El pedido de la lista de descuentos consumidos por usuarios al backend no fue exitoso:",
        response.data
      );
      return "Error al pedir el listado de descuentos consumidos por usuarios del negocio al backend";
    }
  } catch (error: any) {
    console.error(
      "Error al pedir un listado de descuentos consumidos por usuarios del negocio al backend:",
      error.message
    );
    return "Error al pedir un listado de descuentos consumidos por usuarios del negocio al backend";
  }
}