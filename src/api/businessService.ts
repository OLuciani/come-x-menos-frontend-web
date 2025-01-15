import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { verifyToken } from "@/services/tokenVerificationService";
import { Business } from "@/types/businessTypes";

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


//Solicitud post al backend para la creación de un negocio
export async function createBusiness(
    data: FormData
  ): Promise<Business | string> {
    try {
      const response = await axios.post(
        `/api/business_create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      // Verifica si el registro del negocio fue exitoso basado en la respuesta del backend
      if (response.status === 200 && response.data) {
        console.log(
          "Negocio registrado en MongoDB Atlas correctamente:",
          response.data
        );
      } else {
        console.log(
          "El registro del negocio en MongoDB Atlas no fue exitoso:",
          response.data
        );
      }
  
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al registrar el negocio en MongoDB Atlas:",
        error.response?.data || error.message
      );
      return "Error al registrar el negocio";
    }
  }


  //Solicitud para obtener el detalle de los datos de un negocio en particular
export async function businessDetail(): Promise<Business | string> {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      console.log("Token inválido o expirado en businessDetail");
      return "Token inválido o expirado en businessDetail";
    }
    try {
      const response = await axios.get(`/api/business_detail`,
        {
          withCredentials: true,
        }
      );
  
      if (response.status === 200 && response.data) {
        console.log(
          "Detalle del negocio traido de MongoDB Atlas:",
          response.data
        );
        return response.data as Business;
      } else {
        console.log(
          "El pedido del detalle del negocio al backend no fue exitoso:",
          response.data
        );
        return "Error al pedir detalles del negocio al backend";
      }
    } catch (error: any) {
      console.error(
        "Error al pedir detalles del negocio al backend:",
        error.message
      );
      return "Error al pedir detalles del negocio al backend";
    }
  }


  //Solicitud que trae el detalle de los datos de un negocio en particular
export const getBusinessById = async () => {
    const response = await axios.get(`/api/business_detail`, {
      withCredentials: true,
    });
    return response.data;
  };


  //Solicitud para modificar un negocio
export const updateBusiness = async (formData: FormData) => {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }
  
    try {
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
  
      const response = await axios.patch(
        `/api/update_business`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      //console.log("Negocio actualizado correctamente en MongoDB Atlas:", response.data);
  
      // Recupero el nuevo nombre del negocio en caso que el usuario lo cambie para que se refleje instantaneamente en las vistas
      if (
        response.data.updatedBusiness &&
        response.data.updatedBusiness.businessName
      ) {
        const newBusinessName = response.data.updatedBusiness.businessName;
        Cookies.set("businessName", newBusinessName, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });
  
        const cookieBusinessName = Cookies.get("businessName") || "";
      } else {
        console.log("businessName no se encontró en response.data.updatedUser");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error al actualizar negocio:", error);
      throw error;
    }
  };

//Solicitud de negocios pendientes de aprobacion de cuenta
  export async function fetchPendingBusinessFromAPI(businessId: string | null) {
    try {
      const response = await axios.get(
        `/api/pending_business/${businessId}`,
        {
          withCredentials: true, // Asegura que las cookies se envíen con la solicitud.
        }
      );
  
      // Verifico si la respuesta es exitosa
      if (response.status === 200) {
        return response.data; // Retornamos los datos del negocio pendiente
        console.log("Valor de response.data en apiCall.ts: ", response.data);
      } else {
        throw new Error(`Error inesperado: ${response.status}`);
      }
    } catch (error) {
      // Aquí manejo los posibles errores de la solicitud
      if (axios.isAxiosError(error)) {
        console.error("Error en la solicitud Axios:", error.response?.data);
        throw new Error(
          error.response?.data.message || "Error en la solicitud al backend."
        );
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Ocurrió un error inesperado.");
      }
    }
  }


  //Solicitud para traer un negocio en particular del backend. NO DEBERIA INCLUIR LA PALABRA ACTIVE EN LA FUNCION NI EN LA RUTA YA QUE NO FILTRA NEGOCIO ACTIVO SINO QUE SOLO BUSCA AL NEGOCIO POR SU ID. CORREGIR ESO.
export async function fetchActiveBusinessFromAPI(businessId: string | null) {
    try {
      const response = await axios.get(
        `/api/active_business/${businessId}`,
        {
          withCredentials: true, // Asegura que las cookies se envíen con la solicitud.
        }
      );
  
      // Verifico si la respuesta es exitosa
      if (response.status === 200) {
        return response.data; // Retornamos los datos del negocio pendiente
        console.log("Valor de response.data en apiCall.ts: ", response.data);
      } else {
        throw new Error(`Error inesperado: ${response.status}`);
      }
    } catch (error) {
      // Aquí manejo los posibles errores de la solicitud
      if (axios.isAxiosError(error)) {
        console.error("Error en la solicitud Axios:", error.response?.data);
        throw new Error(
          error.response?.data.message || "Error en la solicitud al backend."
        );
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Ocurrió un error inesperado.");
      }
    }
  } 


  


