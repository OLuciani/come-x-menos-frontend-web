import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { verifyToken } from "./tokenVerification";

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

export interface User {
  _id: string;
  name: string;
  lastName: string;
  businessName: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword?: string;
  businessType: string;
  //token: string;
  /*  businessId: string;
  originalEmail: string;
  pdfBusinessRegistration: string;
  role: string;
  status: string; */
}

export interface UserPending {
  _id: string;
  name: string;
  lastName: string;
  businessName: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword?: string;
  businessType: string;
  //token: string;
  businessId: string;
  originalEmail: string;
  pdfBusinessRegistration: string;
  role: string;
  status: string;
  business: object | null;
}

export interface ActiveBusinessAdminUser {
  _id: string;
  name: string;
  lastName: string;
  businessName: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword?: string;
  businessType: string;
  //token: string;
  businessId: string;
  originalEmail: string;
  pdfBusinessRegistration: string;
  role: string;
  status: string;
  business: object | null;
}

export interface Business {
  ownerName: string;
  businessName: string;
  businessType: string;
  address: string;
  addressNumber: string;
  city: string;
  country: string;
  ownerId: string;
  imageURL: File | Blob | null; // Aqui originalmente es imageURL: File | null;
  _id: string;
  latitude?: number;
  longitude?: number;
  pdfBusinessRegistration: File | null; //Esta la agregué para enviar datos afipp
  logo?: File | Blob | null; //Para enviar logo
}

export interface BusinessDetail {
  ownerName: string;
  businessName: string;
  businessType: string;
  address: string;
  city: string;
  country: string;
  ownerId: string;
  imageURL: File | null | string;
  _id: string;
}

export interface PendingBusiness {
  address: string;
  addressNumber: string;
  businessName: string;
  businessType: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  imageURL: string;
  urlLogo: string;
  pdfBusinessRegistration: string;
}

export interface ActiveBusiness {
  address: string;
  addressNumber: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  imageURL: string;
  urlLogo: string;
  pdfBusinessRegistration: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserToProfile {
  businessId: string;
  businessName: string;
  businessType: string;
  email: string;
  lastName: string;
  name: string;
  originalEmail: string;
  phone: string;
  role: string;
  _id: string;
}

export interface UserProfile {
  user: UserToProfile;
}

export interface Discount {
  title: string;
  description: string;
  normalPrice: string;
  discountAmount: string;
  imageURL: string | File | null;
  businessName: string;
  businessId: string;
  businessType: string;
  isActive: boolean;
  validityPeriod: number;
  businessLocationLatitude: number;
  businessLocationLongitude: number;
}

export interface CheckMyAccountPermissions {
  message: string;
}

export interface ApiResponse {
  success: boolean;

  discount?: Discount;
}

export interface DiscountsList {
  businessId: string;
  userToken: string;
  title: string;
  description: string;
  discountAmount: string;
  imageURL: string;
  normalPrice: string;
  priceWithDiscount: number;
  _id: string;
  isDeleted: string;
  validityPeriod: number;
  startDateTime: Date;
  expirationDate: Date;
  generatedDiscounts: number;
  usedDiscounts: number;
  discountViews: number;
  salesValue?: number;
}

export interface UsersDiscountsList {
  businessId: string;
  businessName: string;
  userId: string;
  offeredDiscountId: string;
  discountDetails: string;
  createdAt: Date;
  isValid: boolean;
  isUsed: boolean;
  expirationDate: Date;
}

export interface DiscountDetail {
  title: string;
  description: string;
  normalPrice: string;
  discountAmount: string;
  imageURL: File | null;
  businessName: string;
  businessId: string;
  businessType: string;
  isActive: boolean;
  priceWithDiscount: string;
  validityPeriod: number;
  startDateTime: Date;
  businessLocationLatitude: number;
  businessLocationLongitude: number;
}

export interface DashboardData {
  totalDiscounts: number;
  activeUsers: number;
  redeemedDiscounts: number;
  usageOverTime: {
    labels: string[];
    data: number[];
  };
  discountsByType: {
    labels: string[];
    data: number[];
  };
}

export interface BusinessEmployee {
  name?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password?: string;
  businessId?: string;
  token?: string;
}


export interface ExtraBusinessAdminUser {
  name?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password?: string;
  businessId?: string;
  token?: string;
}


export interface ActiveUser {
  _id: string;
  name: string;
  lastName: string;
  businessName?: string;
  phone: string;
  email: string;
  //password: string;
  //repeatPassword?: string;
  businessType?: string;
  //token: string;
  businessId?: string;
  originalEmail?: string;
  pdfBusinessRegistration?: string;
  role?: string;
  status?: string;
  business?: object | null;
}

export async function login(
  data: UserLogin
): Promise<{ userId: string; userLoged: boolean } | { error: string }> {
  try {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/api/login`,
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
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/api/user_profile`,
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
    console.error(
      "Error al pedir el perfil del usuario al backend:",
      error.message
    );
    return "Error al pedir el perfil del usuario al backend";
  }
}

//Función para saber si el usuario cuenta con los permisos para acceder a la vista myAccount
export async function checkMyAccountPermissions() {
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.get(
      //`https://discount-project-backend.onrender.com/api/checkMyAccountPermissions`,
      //`http://localhost:5050/api/checkMyAccountPermissions`,
      `${BASE_BACKEND_URL}/api/checkMyAccountPermissions`,
      {
        withCredentials: true, // Esta línea asegura que las cookies (entre ellas va la del token que es indispensable en esta ruta) se envíen con la solicitud
      }
    );

    if (response.status === 200 && response.data) {
      console.log(
        "Datos de la verificación de acceso a la vista myAccount:",
        response.data
      );
      return response.data;
    } else {
      console.log("El acceso a Mi cuenta fue exitoso:", response.data);
      return "Error al pedir acceso a Mi cuenta al backend";
    }
  } catch (error: any) {
    console.error(
      "Error al pedir acceso a Mi cuenta al backend:",
      error.message
    );
    return "Error al pedir acceso a Mi cuenta al backend";
  }
}

//Función para saber si el usuario cuenta con los permisos para acceder a la vista dashboardAdmin. Esta ruta en el backend la encuentro en el archivo de rutas checkAdminAppRote.js
export async function checkAdminAppPermissions() {
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/api/checkAdminAppPermissions`,
      {
        withCredentials: true, // Esta línea asegura que las cookies (entre ellas va la del token que es indispensable en esta ruta) se envíen con la solicitud
      }
    );

    if (response.status === 200 && response.data) {
      console.log(
        "Datos de la verificación de acceso a la vista dashboardAdmin:",
        response.data
      );
      return response.data;
    } else {
      console.log("El acceso a dashboardAdmin fue exitoso:", response.data);
      return "Error al pedir acceso a dashboardAdmin al backend";
    }
  } catch (error: any) {
    console.error(
      "Error al pedir acceso a dashboardAdmin al backend:",
      error.message
    );
    return "Error al pedir acceso a dashboardAdmin al backend";
  }
}

export async function createUser(
  data: User,
  token: string,
  email: string
): Promise<User | string> {
  try {
    console.log("Valor de businessName en createUser de apiCall.ts: ", data.businessName);
    const response = await axios.post(
      `${BASE_BACKEND_URL}/api/user_register`,
      {
        name: data.name,
        lastName: data.lastName,
        businessName: data.businessName,
        phone: data.phone,
        email: email,
        password: data.password,
        role: "user", //Por el momento el usuario web van puestos todos como user.
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Verificar si el registro fue exitoso basado en la respuesta del backend
    if (response.status === 200 && response.data) {
      console.log(
        "Usuario registrado en MongoDB Atlas correctamente:",
        response.data
      );
    } else {
      console.log(
        "El registro en MongoDB Atlas no fue exitoso:",
        response.data
      );
    }

    return response.data;
  } catch (error: any) {
    console.error("Error al registrar el usuario en MongoDB Atlas:", error);
    return "Error al registrar el usuario";
  }
}

export const updateUserWithBusinessId = async (
  userId: string,
  businessId: string,
) => {
  try {
    const response = await axios.patch(
      `${BASE_BACKEND_URL}/api/businessId_and_businessType_update/${userId}`,
      {
        businessId,
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response ? error.response.data : error.message;
  }
};

export async function createBusiness(
  data: FormData
): Promise<Business | string> {
  try {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/api/business_create`,
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

export async function createDiscount(
  data: FormData
): Promise<Discount | string> {
  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) {
    return "Token inválido o expirado";
  }

  try {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/api/discount_create`,
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
}

//export async function discountsList(businessId: string, userToken: string): Promise<DiscountsList[] | string> {
export async function discountsList(): Promise<DiscountsList[] | string> {
  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) {
    console.log("Token inválido o expirado en discountList");
    return "Token inválido o expirado en discountList";
  }

  try {
    //console.log("Valor de userId en pedido get: ", businessId);
    //console.log("Valor de userToken en pedido get: ", userToken);
    const response = await axios.get(
      `${BASE_BACKEND_URL}/api/discounts_list_one_business`,
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
}

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
      `${BASE_BACKEND_URL}/api/consumed_discounts`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200 && response.data) {
      console.log(
        "Listado de descuentos creados por usuarios del negocio traidos de MongoDB Atlas:",
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



export async function discountDetail(
  discountId: string
): Promise<DiscountDetail | string> {
  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) {
    return "Token inválido o expirado";
  }

  try {
    //console.log("Valor de discountId en pedido get: ", discountId);
    //console.log("Valor de userToken en pedido get: ", userToken);

    const response = await axios.get(
      `${BASE_BACKEND_URL}/api/discount_detail/${discountId}`,
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
    console.error(
      "Error al pedir el descuento del negocio al backend:",
      error.message
    );
    return "Error al pedir el descuento del negocio al backend";
  }
}

export async function editDiscount(
  data: FormData,
  discountId: string
): Promise<Discount | string> {
  console.log("ID DEL DESCUENTOOOOOOO:", discountId);
  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) {
    return "Token inválido o expirado";
  }

  try {
    const response = await axios.patch(
      `${BASE_BACKEND_URL}/api/discount_update/${discountId}`,
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
    console.error("Error al modificar el descuento:", error.message);
    return "Error al modificar el descuento";
  }
}

export async function deleteDiscount(
  discountId: string
): Promise<{ success: boolean; message: string } | string> {
  //console.log("valor de discountId en deleteDiscount", discountId)

  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) {
    return "Token inválido o expirado";
  }

  try {
    const response = await axios.delete(
      //`https://discount-project-backend.onrender.com/api/discount_delete/${discountId}`,
      //`http://localhost:5050/api/discount_delete/${discountId}`,
      `${BASE_BACKEND_URL}/api/discount_delete/${discountId}`,
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
    console.error("Error al eliminar el descuento:", error.message);
    return "Error al eliminar el descuento";
  }
}

//export async function businessDetail(businessId: string, userToken: string): Promise<Business | string> {
export async function businessDetail(): Promise<Business | string> {
  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) {
    console.log("Token inválido o expirado en businessDetail");
    return "Token inválido o expirado en businessDetail";
  }
  try {
    const response = await axios.get(
      //`https://discount-project-backend.onrender.com/api/business_detail`,
      //`http://localhost:5050/api/business_detail`,
      `${BASE_BACKEND_URL}/api/business_detail`,
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

export const getUserById = async () => {
  //const response = await axios.get(`https://discount-project-backend.onrender.com/api/user_detail`,
  //const response = await axios.get(`http://localhost:5050/api/user_detail`,
  const response = await axios.get(`${BASE_BACKEND_URL}/api/user_detail`, {
    withCredentials: true,
  });
  return response.data;
  console.log("Valor del detalle de usuario: ", response.data);
};

export const updateUser = async (data: Partial<User>) => {
  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) {
    return "Token inválido o expirado";
  }

  try {
    const response = await axios.patch(
      //`https://discount-project-backend.onrender.com/api/user_update`,
      //`http://localhost:5050/api/user_update`,
      `${BASE_BACKEND_URL}/api/user_update`,
      {
        name: data.name,
        lastName: data.lastName,
        businessName: data.businessName,
        phone: data.phone,
        businessType: data.businessType,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200 && response.data) {
      // console.log("Respuesta completa de la API:", response.data);

      // Recupero el nuevo nombre del usuario en caso que el usuario lo cambie para que se refleje instantaneamente en el NavBar
      if (response.data.updatedUser && response.data.updatedUser.name) {
        const newUserName = response.data.updatedUser.name;
        Cookies.set("userName", newUserName, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });

        const cookieUserName = Cookies.get("userName") || "";
      } else {
        console.log("userName no se encontró en response.data.updatedUser");
      }

      return response.data;
    } else {
      console.log(
        "La modificación del descuento en MongoDB Atlas no fue exitosa:",
        response.data
      );
      return "Error al modificar el descuento";
    }
  } catch (error: any) {
    console.error("Error al modificar el descuento:", error.message);
    return "Error al modificar el descuento";
  }
};

export const getBusinessById = async () => {
  //const response = await axios.get(`https://discount-project-backend.onrender.com/api/business_detail`,
  //const response = await axios.get(`http://localhost:5050/api/business_detail`,
  const response = await axios.get(`${BASE_BACKEND_URL}/api/business_detail`, {
    withCredentials: true,
  });
  return response.data;
};

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

    //const response = await axios.patch(`https://discount-project-backend.onrender.com/api/update_business`, formData, {
    //const response = await axios.patch(`http://localhost:5050/api/update_business`, formData, {
    const response = await axios.patch(
      `${BASE_BACKEND_URL}/api/update_business`,
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

export const getDashboardData = async (
  userToken: string
): Promise<DashboardData> => {
  const response = await fetch(`${BASE_BACKEND_URL}/api/dashboard`, {
    headers: {
      //Authorization: `Bearer ${yourToken}`,  // Usa tu token de autenticación
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching dashboard data");
  }

  return (await response.json()) as DashboardData;
};


export async function fetchPendingUsersFromAPI() {
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/api/pending_users`,
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
        "El pedido de Usuarios Pendientes al backend no fue exitoso:",
        response.data
      );
      return "Error al pedir Usuarios Pendientes al backend";
    }
  } catch (error: any) {
    console.error(
      "Error al pedir Usuarios Pendientes al backend:",
      error.message
    );
    return "Error al pedir Usuarios Pendientes al backend";
  }
}


export const approveUser = async (userId: string) => {
  console.log("Valor de userId en la funcion approveUser: ", userId);
  try {
    const response = await axios.patch(
      `${BASE_BACKEND_URL}/api/approve_user/${userId}`,
      {
        withCredentials: true,
      } // Asegúrate de que las cookies de autenticación se envíen con la solicitud
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al aprobar usuario:", error.message);
    return "Error al aprobar usuario";
  }
};


export async function fetchPendingBusinessFromAPI(businessId: string | null) {
  try {
    const response = await axios.get(
      `${BASE_BACKEND_URL}/api/pending_business/${businessId}`,
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

export async function fetchAllUsersFromAPI() {
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/api/all_users_list`,
      {
        withCredentials: true, // Esta línea asegura que las cookies (entre ellas va la del token que es indispensable en esta ruta) se envíen con la solicitud
      }
    );

    if (response.status === 200 && response.data) {
      console.log(
        "Datos de Usuarios Activos traidos de MongoDB Atlas:",
        response.data
      );
      return response.data;
    } else {
      console.log(
        "El pedido de Usuarios Activos al backend no fue exitoso:",
        response.data
      );
      return "Error al pedir Usuarios Activos al backend";
    }
  } catch (error: any) {
    console.error("Error al pedir Usuarios Activos al backend:", error.message);
    return "Error al pedir Usuarios Activos al backend";
  }
}


export async function fetchActiveBusinessFromAPI(businessId: string | null) {
  try {
    const response = await axios.get(
      `${BASE_BACKEND_URL}/api/active_business/${businessId}`,
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

// Función para obtener las notificaciones del usuario
export const getUserNotifications = async () => {
  try {
    const response = await axios.get(
      `${BASE_BACKEND_URL}/api/user_pending_notifications`,
      {
        withCredentials: true, // Asegura que las cookies se envíen con la solicitud.
      }
    );
    return response.data.notifications;
    console.log("Valor de response en la petición userPendingNotifications: ", response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al obtener las notificaciones"
      );
    }
    throw new Error("Error desconocido al obtener las notificaciones");
  }
};



export const sendUserNotification = async (userId: string, message: string) => {
  try {
    const response = await axios.post(
      //`${BASE_BACKEND_URL}/api/send_notification_pending_user`,
      `${BASE_BACKEND_URL}/api/send_user_notification`,
      { userId, message },
      { withCredentials: true } // Asegúrate de incluir esto si estás usando cookies
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al enviar notificación:", error.message);
    return { success: false, message: "Error al enviar notificación" };
  }
};


export const markUserNotificationsAsRead = async (notificationId?: string) => {
  console.log("Valor de notifictionId en la solicitud post:", notificationId);
  try {
      const response = await axios.post(`${BASE_BACKEND_URL}/api/mark_user_notification_as_read`, 
          {},
          {
              withCredentials: true, // Asegura que las cookies se envíen con la solicitud.
          }
      );

      return response.data; // Devuelves la respuesta para que el componente la maneje
  } catch (error: unknown) {
      console.error('Error al marcar la notificación como leída:', error);
      
      let errorMessage: string;
      if (axios.isAxiosError(error)) {
          // Si el error es un error de Axios, puedes acceder a la respuesta
          errorMessage = error.response?.data?.message || 'Error desconocido';
      } else {
          errorMessage = 'Error desconocido';
      }

      return { success: false, message: errorMessage }; // Asegúrate de devolver un objeto con el mensaje de error
  }
};


export const invitationBusinessEmployeeUser = async (user: BusinessEmployee) => {
  console.log(user.email)
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.post(`${BASE_BACKEND_URL}/api/invitation_business_employee_user`, 
    {
      email:user.email,  // Solo enviamos los datos del usuario
    },
    { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al enviar la invitación al usuario con acceso al scanner en la aplicación movil"
    );
  }
};


export async function createBusinessEmployeeUser(data: BusinessEmployee, token: string, businessId: string): Promise<BusinessEmployee | string> {
  //console.log("Valor de data en createUserQrScanner: ", data);
  //console.log("Valor de token en createUserQrScanner: ", token);
  //console.log("Valor de businessId en createUserQrScanner: ", businessId);
  try {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/api/create_business_employee_user`,
      {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password, 
        businessId: businessId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
      }
    );

    // Verificar si el registro fue exitoso basado en la respuesta del backend
    if (response.status === 200 && response.data) {
      console.log(
        "Usuario con acceso a scanner en aplicación movil registrado en MongoDB Atlas correctamente:",
        response.data
      );
    } else {
      console.log(
        "El registro del usuario con acceso a scanner en aplicación movil en MongoDB Atlas no fue exitoso:",
        response.data
      );
    }

    return response.data;
  } catch (error: any) {
    console.error("Error al registrar el usuario con acceso a scanner en aplicación movil en MongoDB Atlas:", error);
    return "Error al registrar el usuario con acceso a scanner en aplicación movil";
  }
}


export const invitationExtraBusinessAdminUser = async (user: ExtraBusinessAdminUser) => {
  console.log(user.email)
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.post(`${BASE_BACKEND_URL}/api/invitation_extra_business_admin_user`, 
    {
      email:user.email,  // Solo enviamos los datos del usuario
    },
    { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Error al enviar la invitación al usuario administrador de la cuenta del negocio"
    );
  }
};



export async function createExtraBusinessAdminUser(data: ExtraBusinessAdminUser, token: string, businessId: string): Promise<ExtraBusinessAdminUser | string> {
  //console.log("Valor de data en createUserQrScanner: ", data);
  //console.log("Valor de token en createUserQrScanner: ", token);
  //console.log("Valor de businessId en createUserQrScanner: ", businessId);
  try {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/api/create_extra_business_admin_user`,
      {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password, 
        businessId: businessId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
      }
    );

    // Verificar si el registro fue exitoso basado en la respuesta del backend
    if (response.status === 200 && response.data) {
      console.log(
        "Usuario Estra Administrador de cuenta de negocio registrado en MongoDB Atlas correctamente:",
        response.data
      );
    } else {
      console.log(
        "El registro del Usuario Estra Administrador de cuenta de negocio en MongoDB Atlas no fue exitoso:",
        response.data
      );
    }

    return response.data;
  } catch (error: any) {
    console.error("Error al registrar el Usuario Estra Administrador de cuenta de negocio en MongoDB Atlas:", error);
    return "Error al registrar el Usuario Estra Administrador de cuenta de negocio en aplicación movil";
  }
}


export async function getBusinessAdminUsersCount () {
  /* // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) {
    console.log("Token inválido o expirado en discountList");
    return "Token inválido o expirado en discountList";
  } */

  try {
    const response = await axios.get(
      `${BASE_BACKEND_URL}/api/all_business_admin_users`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200 && response.data) {
      console.log(
        "Listado de Usuarios Administradores de la cuenta en la app de un negocio traidos de MongoDB Atlas:",
        response.data
      );
      return response.data;
    } else {
      console.log(
        "El pedido del listado de Usuarios Administradores de la cuenta en la app de un negocio al backend no fue exitoso:",
        response.data
      );
      return "Error al pedir el listado de Usuarios Administradores de la cuenta en la app de un negocio al backend";
    }
  } catch (error: any) {
    console.error(
      "Error al pedir un listado de Usuarios Administradores de la cuenta en la app de un negocio al backend:",
      error.message
    );
    return "Error al pedir un listado de Usuarios Administradores de la cuenta en la app de un negocio al backend";
  }
}


export async function fetchAsociatedBusinessUsers() {
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.get(
      `${BASE_BACKEND_URL}/api/asociated_business_users`,
      {
        withCredentials: true, // Esta línea asegura que las cookies (entre ellas va la del token que es indispensable en esta ruta) se envíen con la solicitud
      }
    );

    if (response.status === 200 && response.data) {
      console.log(
        "Listado de usuarios asociados a una cuenta de negocio traidos de MongoDB Atlas:",
        response.data
      );
      return response.data;
    } else {
      console.log(
        "El pedido de Listado de usuarios asociados a una cuenta de negocio al backend no fue exitoso:",
        response.data
      );
      return "Error al pedir un Listado de usuarios asociados a una cuenta de negocio al backend";
    }
  } catch (error: any) {
    console.error(
      "Error al pedir un Listado de usuarios asociados a una cuenta de negocio al backend:",
      error.message
    );
    return "Error al pedir Listado de usuarios asociados a una cuenta de negocio al backend";
  }
}

//Función para pasar un usuario de status "active" a status "pending". Sería una especie de eliminación lógica.
export const desactivateUser = async (userId: string) => {
  console.log("Valor de userId en la funcion desactivateUser: ", userId);
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.patch(
      `${BASE_BACKEND_URL}/api/desactivate_user/${userId}`,
      {
        withCredentials: true,
      } // Asegúrate de que las cookies de autenticación se envíen con la solicitud
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al aprobar usuario:", error.message);
    return "Error al aprobar usuario";
  }
};


//Función para activar a un usuariopasando su estado de status "pending" a status "active".
export const activateUser = async (userId: string) => {
  console.log("Valor de userId en la funcion desactivateUser: ", userId);
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.patch(
      `${BASE_BACKEND_URL}/api/activate_user/${userId}`,
      {
        withCredentials: true,
      } // Asegúrate de que las cookies de autenticación se envíen con la solicitud
    );
    return response.data;
  } catch (error: any) {
    console.error("Error al activar al usuario:", error.message);
    return "Error al activar al usuario";
  }
};


export async function deleteUser(
  userId: string
)/* : Promise<{ success: boolean; message: string } | string> */ {
  //console.log("valor de discountId en deleteDiscount", discountId)

  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) {
    return "Token inválido o expirado";
  }

  try {
    const response = await axios.delete(
      `${BASE_BACKEND_URL}/api/delete_user/${userId}`,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(
        "Usuario eliminado correctamente de MongoDB Atlas:",
        response.data
      );
      return response.data;
    } else {
      console.log(
        "La eliminación del usuario en MongoDB Atlas no fue exitosa:",
        response.data
      );
      return "Error al eliminar el usuario";
    }
  } catch (error: any) {
    console.error("Error al eliminar el usuario:", error.message);
    return "Error al eliminar el usuario";
  }
}