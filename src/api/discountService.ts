import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { verifyToken } from "@/services/tokenVerificationService";
import { Discount, DiscountsList, DiscountDetail } from "@/types/discountTypes";

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


//Solicitud al backend para crear un descuento
/* export async function createDiscount(
    data: FormData
  ): Promise<Discount | string> {
    // Verifico el token antes de hacer la solicitud
    //const isTokenValid = await verifyToken();
    //if (!isTokenValid) {
      //return "Token inválido o expirado";
    //}
  
    try {
      const response = await axios.post(
        `/api/discount_create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            //Authorization: `Bearer ${userToken}`,
          },
          withCredentials: true, // Esta línea asegura que las cookies (entre ellas va la del token que es indispensable en esta ruta) se envíen con la solicitud
        }
      );
  
      console.log("RESPONSE EN APICALL PARA VERIFICAR RESPUESTA DEL BACKEND  CRATE_DISCOUNT: ", response.data);
  
      if (response.status === 200 && response.data) {
        console.log(
          "Descuento creado correctamente en MongoDB Atlas:",
          response.data
        );
        return response.data;
      } else {
        console.log(
          "La creación del descuento en MongoDB Atlas no fue exitosa:",
          response.data
        );
        return "Error al crear el descuento";
      }
    } catch (error: any) {
      console.error("Error al crear el descuento:", error.message);
      return "Error al crear el descuento";
    }
  } */
  export async function createDiscount(
    data: FormData
  ): Promise<Discount | string> {
    try {
      const response = await axios.post(
        `/api/discount_create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            //Authorization: `Bearer ${userToken}`,
          },
          withCredentials: true, // Esta línea asegura que las cookies (entre ellas va la del token que es indispensable en esta ruta) se envíen con la solicitud
        }
      );
  
      console.log("RESPONSE EN APICALL PARA VERIFICAR RESPUESTA DEL BACKEND  CRATE_DISCOUNT: ", response.data);
  
      if (response.status === 200 && response.data) {
        console.log(
          "Descuento creado correctamente en MongoDB Atlas:",
          response.data
        );
        return response.data;
      } else {
        console.log(
          "La creación del descuento en MongoDB Atlas no fue exitosa:",
          response.data
        );
        return "Error al crear el descuento";
      }
    } catch (error: any) {
      // Si el error tiene el flag `isAuthError`, puedo manejarlo aquí o en el componente que llama la función
      /* if (error.isAuthError) {
        console.error("Error de autenticación:", error.message);
        return "TOKEN_EXPIRED";
      } */

      console.error("Error al crear el descuento:", error.message);
      return "Error al crear el descuento";
    }
  }
  
  
  /* export async function discountsList(): Promise<DiscountsList[] | string> {
    try {
      const response = await axios.get(
        `/api/discounts_list_one_business`,
        {
          withCredentials: true,
        }
      );
  
      if (response.status === 200 && response.data) {
        console.log(
          "Listado de descuentos vigentes del negocio traidos de MongoDB Atlas:",
          response.data
        );
        return response.data;
      } else {
        console.log(
          "El pedido de la lista de descuentos al backend no fue exitoso:",
          response.data
        );
        return "Error al pedir el listado de descuentos del negocio al backend";
      }
    } catch (error: any) {
      console.error(
        "Error al pedir un listado de descuentos del negocio al backend:",
        error.message
      );
      return "Error al pedir un listado de descuentos del negocio al backend";
    }
  } */
  export async function discountsList(): Promise<DiscountsList[] | string> {
    try {
      const response = await axios.get(`/api/discounts_list_one_business`, {
        withCredentials: true,
      });
  
      if (response.status === 200 && response.data) {
        console.log(
          "Listado de descuentos vigentes del negocio traídos de MongoDB Atlas:",
          response.data
        );
        return response.data;
      } else {
        console.log(
          "El pedido de la lista de descuentos al backend no fue exitoso:",
          response.data
        );
        return "Error al pedir el listado de descuentos del negocio al backend";
      }
    } catch (error: any) {
      // Verificar si el error es por token expirado
      /* if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.message;
        //console.log("Valor de errorMessage: ", errorMessage);
        if (errorMessage === "Token expired. Please log in again.") {
          console.error("El token ha expirado. Redirigiendo al login...");
          return "TOKEN_EXPIRED"; // Retornamos un mensaje específico para manejarlo en el frontend
        }
      } */
      if (error.response && error.response.status === 401) {
          return "TOKEN_EXPIRED"; // Retornamos un mensaje específico para manejarlo en el frontend
      }
  
      console.error(
        "Error al pedir un listado de descuentos del negocio al backend:",
        error.message
      );
      return "Error al pedir un listado de descuentos del negocio al backend";
    }
  }
  


  //Solicitud para obtener el detalle de un descuento en particular ofrecido por un negocio
export async function discountDetail(
    discountId: string
  ): Promise<DiscountDetail | string> {
   try {
      //console.log("Valor de discountId en pedido get: ", discountId);
      //console.log("Valor de userToken en pedido get: ", userToken);
  
      const response = await axios.get(
        `/api/discount_detail/${discountId}`,
        {
          withCredentials: true,
        }
      );
  
      if (response.status === 200 && response.data) {
        console.log(
          "Detalle del descuento vigente del negocio traido de MongoDB Atlas:",
          response.data
        );
        return response.data;
      } else {
        console.log(
          "El pedido del descuento al backend no fue exitoso:",
          response.data
        );
        return "Error al pedir el descuento del negocio al backend";
      }
    } catch (error: any) {
      // Si el error tiene el flag `isAuthError`, puedo manejarlo aquí o en el componente que llama la función
      /* if (error.isAuthError) {
        console.error("Error de autenticación:", error.message);
        return "TOKEN_EXPIRED";
      } */

      console.error(
        "Error al pedir el descuento del negocio al backend:",
        error.message
      );
      return "Error al pedir el descuento del negocio al backend";
    }
  }


  //Solicitud para modificar un descuento en particular ofrecido por un negocio (por eso lleva el id del descuento)
export async function editDiscount(
    data: FormData,
    discountId: string
  ): Promise<Discount | string> {
    console.log("ID DEL DESCUENTOOOOOOO:", discountId);
   try {
      const response = await axios.patch(
        `/api/discount_update/${discountId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
  
      if (response.status === 200 && response.data) {
        console.log(
          "Descuento modificado correctamente en MongoDB Atlas:",
          response.data
        );
        return response.data;
      } else {
        console.log(
          "La modificación del descuento en MongoDB Atlas no fue exitosa:",
          response.data
        );
        return "Error al modificar el descuento";
      }
    } catch (error: any) {
      // Si el error tiene el flag `isAuthError`, puedo manejarlo aquí o en el componente que llama la función
      /* if (error.isAuthError) {
        console.error("Error de autenticación:", error.message);
        return "TOKEN_EXPIRED";
      } */

      console.error("Error al modificar el descuento:", error.message);
      return "Error al modificar el descuento";
    }
  }


  //Solicitud para la eliminación lógica de un descuento en particular ofrecido por un negocio
export async function deleteDiscount(
    discountId: string
  ): Promise<{ success: boolean; message: string } | string> {
    try {
      const response = await axios.delete(`/api/discount_delete/${discountId}`,
        {
          withCredentials: true,
        }
      );
  
      if (response.status === 200) {
        console.log(
          "Descuento eliminado correctamente de MongoDB Atlas:",
          response.data
        );
        return response.data;
      } else {
        console.log(
          "La eliminación del descuento en MongoDB Atlas no fue exitosa:",
          response.data
        );
        return "Error al eliminar el descuento";
      }
    } catch (error: any) {
      // Si el error tiene el flag `isAuthError`, puedo manejarlo aquí o en el componente que llama la función
      /* if (error.isAuthError) {
        console.error("Error de autenticación:", error.message);
        return "TOKEN_EXPIRED";
      } */

      console.error("Error al eliminar el descuento:", error.message);
      return "Error al eliminar el descuento";
    }
  }