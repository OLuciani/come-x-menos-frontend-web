import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { verifyToken } from './tokenVerification';

// Configuro Axios para enviar cookies automáticamente
axios.defaults.withCredentials = true;

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
  _id: string,
  name: string;
  lastName: string;
  businessName: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword?: string;
  businessType: string;
  //token: string;
}

export interface Business {
  ownerName: string,
  businessName: string,
  businessType: string,
  address: string,
  addressNumber: string,
  city: string,
  country: string,
  ownerId: string,
  imageURL: File| Blob | null; // Aqui originalmente es imageURL: File | null;
  _id: string;
  latitude?: number;
  longitude?: number;
}


export interface BusinessDetail {
  ownerName: string,
  businessName: string,
  businessType: string,
  address: string,
  city: string,
  country: string,
  ownerId: string,
  imageURL: File | null | string;
  _id: string;
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
  priceWithDiscount: string;
  _id: string;
  isDeleted: string;
  validityPeriod: number;
  startDateTime: Date;
  expirationDate: Date;
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




export async function login(
  data: UserLogin
): Promise<{ userId: string; userLoged: boolean } | { error: string }> {
  try {
    const response = await axios.post(
      "https://discount-project-backend.onrender.com/api/login",
      //"http://localhost:5050/api/login",
      {
        email: data.email,
        password: data.password,
      },
    );

    if (response.status === 200) {
      console.log("Usuario autenticado con éxito en Mongo DB Atlas: ", response.data);
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
      return 'Token inválido o expirado';
    }

    const response = await axios.get(
      `https://discount-project-backend.onrender.com/api/user_profile`,
      //`http://localhost:5050/api/user_profile`,
      {
        withCredentials: true // Esta línea asegura que las cookies (entre ellas va la del token que es indispensable en esta ruta) se envíen con la solicitud
      }
      
    );

    if (response.status === 200 && response.data) {
      console.log("Datos del perfil de usuario traido de MongoDB Atlas:", response.data);
      return response.data;
    } else {
      console.log("El pedido del perfil del usuario al backend no fue exitoso:", response.data);
      return "Error al pedir el perfil del usuario al backend";
    }
  } catch (error: any) {
    console.error("Error al pedir el perfil del usuario al backend:", error.message);
    return "Error al pedir el perfil del usuario al backend";
  
}
}


//Función para saber si el usuario cuenta con los permisos para acceder a la vista myAccount
export async function checkMyAccountPermissions() {
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) { 
      return 'Token inválido o expirado';
    }

    const response = await axios.get(
      `https://discount-project-backend.onrender.com/api/checkMyAccountPermissions`,
      //`http://localhost:5050/api/checkMyAccountPermissions`,
      {
        withCredentials: true // Esta línea asegura que las cookies (entre ellas va la del token que es indispensable en esta ruta) se envíen con la solicitud
      }
      
    );

    if (response.status === 200 && response.data) {
      console.log("Datos de la verificación de acceso a la vista myAccount:", response.data);
      return response.data;
    } else {
      console.log("El acceso a Mi cuenta fue exitoso:", response.data);
      return "Error al pedir acceso a Mi cuenta al backend";
    }
  } catch (error: any) {
    console.error("Error al pedir acceso a Mi cuenta al backend:", error.message);
    return "Error al pedir acceso a Mi cuenta al backend";
  
}
}



export async function createUser(data: User, token: string, email: string): Promise<User | string> {
  
  try {
    const response = await axios.post(
      "https://discount-project-backend.onrender.com/api/user_register",
      //"http://localhost:5050/api/user_register",
      {
        name: data.name,
        lastName: data.lastName,
        businessName:data.businessName,
        phone: data.phone,
        email: email,
        password: data.password,
        role: "user"  //Por el momento el usuario web van puestos todos como user.
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Verificar si el registro fue exitoso basado en la respuesta del backend
    if (response.status === 200 && response.data) {
      console.log("Usuario registrado en MongoDB Atlas correctamente:", response.data);
    } else {
      console.log("El registro en MongoDB Atlas no fue exitoso:", response.data);
    }

    return response.data;
  } catch (error: any) {
    console.error("Error al registrar el usuario en MongoDB Atlas:", error);
    return "Error al registrar el usuario";
  }
}


export const updateUserWithBusinessId = async (userId: string, businessId: string, businessType: string) => {
  try {
    const response = await axios.patch(
      `https://discount-project-backend.onrender.com/api/businessId_and_businessType_update/${userId}`,
      //`http://localhost:5050/api/businessId_and_businessType_update/${userId}`,
    {
      businessId,
      businessType
    });
    return response.data;
  } catch (error: any) {
    return error.response ? error.response.data : error.message;
  }
};



export async function createBusiness(data: Business): Promise<Business | string> {
  try {
    const response = await axios.post(
      "https://discount-project-backend.onrender.com/api/business_create",
      //"http://localhost:5050/api/business_create",
      {
        ownerName: data.ownerName,
        businessName: data.businessName,
        businessType: data.businessType,
        address: data.address, //Cambiar por businessAddress
        addressNumber: data.addressNumber,
        city: data.city,
        country: data.country,
        ownerId: data.ownerId,
        imageURL: data.imageURL,
      }, 
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Verifica si el registro del negocio fue exitoso basado en la respuesta del backend
    if (response.status === 200 && response.data) {
      console.log("Negocio registrado en MongoDB Atlas correctamente:", response.data);
    } else {
      console.log("El registro del negocio en MongoDB Atlas no fue exitoso:", response.data);
    }

    return response.data;
  } catch (error: any) {
    console.error("Error al registrar el negocio en MongoDB Atlas:", error);
    return "Error al registrar el negocio";
  }
}


export async function createDiscount(data: FormData): Promise<Discount | string> {
  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) { 
    return 'Token inválido o expirado';
  }

  try {
    const response = await axios.post(
      "https://discount-project-backend.onrender.com/api/discount_create",
      //"http://localhost:5050/api/discount_create",
        data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          //Authorization: `Bearer ${userToken}`,
        },
        withCredentials: true // Esta línea asegura que las cookies (entre ellas va la del token que es indispensable en esta ruta) se envíen con la solicitud
      }
    );

    if (response.status === 200 && response.data) {
      console.log("Descuento creado correctamente en MongoDB Atlas:", response.data);
      return response.data;
    } else {
      console.log("La creación del descuento en MongoDB Atlas no fue exitosa:", response.data);
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
    console.log('Token inválido o expirado en discountList')
    return 'Token inválido o expirado en discountList';
  }

  try {
    //console.log("Valor de userId en pedido get: ", businessId);
    //console.log("Valor de userToken en pedido get: ", userToken);
    const response = await axios.get(
      `https://discount-project-backend.onrender.com/api/discounts_list_one_business`,
      //`http://localhost:5050/api/discounts_list_one_business`,
      {
        withCredentials: true
      }
    );

    if (response.status === 200 && response.data) {
      console.log("Listado de descuentos vigentes del negocio traidos de MongoDB Atlas:", response.data);
      return response.data;
    } else {
      console.log("El pedido de la lista de descuentos al backend no fue exitoso:", response.data);
      return "Error al pedir el listado de descuentos del negocio al backend";
    }
  } catch (error: any) {
    console.error("Error al pedir un listado de descuentos del negocio al backend:", error.message);
    return "Error al pedir un listado de descuentos del negocio al backend";
  }
}


export async function usersDiscountsList(): Promise<UsersDiscountsList[] | string> {
  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) { 
    console.log('Token inválido o expirado en discountList')
    return 'Token inválido o expirado en discountList';
  }

  try {
    const response = await axios.get(
      `https://discount-project-backend.onrender.com/api/consumed_discounts`,
      //`http://localhost:5050/api/consumed_discounts`,
      {
        withCredentials: true
      }
    );

    if (response.status === 200 && response.data) {
      console.log("Listado de descuentos consumidos por usuarios del negocio traidos de MongoDB Atlas:", response.data);
      return response.data;
    } else {
      console.log("El pedido de la lista de descuentos consumidos por usuarios al backend no fue exitoso:", response.data);
      return "Error al pedir el listado de descuentos consumidos por usuarios del negocio al backend";
    }
  } catch (error: any) {
    console.error("Error al pedir un listado de descuentos consumidos por usuarios del negocio al backend:", error.message);
    return "Error al pedir un listado de descuentos consumidos por usuarios del negocio al backend";
  }
}



export async function discountDetail(discountId: string): Promise<DiscountDetail | string> {
  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) { 
    return 'Token inválido o expirado';
  }

  try {
    //console.log("Valor de discountId en pedido get: ", discountId);
    //console.log("Valor de userToken en pedido get: ", userToken);

    const response = await axios.get(
      `https://discount-project-backend.onrender.com/api/discount_detail/${discountId}`,
      //`http://localhost:5050/api/discount_detail/${discountId}`,
      {
        withCredentials: true
      }
    );

    if (response.status === 200 && response.data) {
      console.log("Detalle del descuento vigente del negocio traido de MongoDB Atlas:", response.data);
      return response.data;
    } else {
      console.log("El pedido del descuento al backend no fue exitoso:", response.data);
      return "Error al pedir el descuento del negocio al backend";
    }
  } catch (error: any) {
    console.error("Error al pedir el descuento del negocio al backend:", error.message);
    return "Error al pedir el descuento del negocio al backend";
  }
}


export async function editDiscount(data: FormData, discountId: string): Promise<Discount | string> {
  console.log("ID DEL DESCUENTOOOOOOO:", discountId);
  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) { 
    return 'Token inválido o expirado';
  }
 
  try {
    const response = await axios.patch(
      `https://discount-project-backend.onrender.com/api/discount_update/${discountId}`,
      //`http://localhost:5050/api/discount_update/${discountId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      }
    );

    if (response.status === 200 && response.data) {
      console.log("Descuento modificado correctamente en MongoDB Atlas:", response.data);
      return response.data;
    } else {
      console.log("La modificación del descuento en MongoDB Atlas no fue exitosa:", response.data);
      return "Error al modificar el descuento";
    }
  } catch (error: any) {
    console.error("Error al modificar el descuento:", error.message);
    return "Error al modificar el descuento";
  }
}


export async function deleteDiscount(discountId: string): Promise<{ success: boolean; message: string; } | string> {
  //console.log("valor de discountId en deleteDiscount", discountId)

  // Verifico el token antes de hacer la solicitud
  const isTokenValid = await verifyToken();
  if (!isTokenValid) { 
    return 'Token inválido o expirado';
  }

  try {
    
    const response = await axios.delete(
      `https://discount-project-backend.onrender.com/api/discount_delete/${discountId}`,
      //`http://localhost:5050/api/discount_delete/${discountId}`,
      {
        withCredentials: true
      }
    );

    if (response.status === 200) {
      console.log("Descuento eliminado correctamente de MongoDB Atlas:", response.data);
      return response.data;
    } else {
      console.log("La eliminación del descuento en MongoDB Atlas no fue exitosa:", response.data);
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
    console.log('Token inválido o expirado en businessDetail');
    return 'Token inválido o expirado en businessDetail';
  }
  try {
    const response = await axios.get(
      `https://discount-project-backend.onrender.com/api/business_detail`,
      //`http://localhost:5050/api/business_detail`,
      {
        withCredentials: true
      }
    );

    if (response.status === 200 && response.data) {
      console.log("Detalle del negocio traido de MongoDB Atlas:", response.data);
      return response.data as Business;
    } else {
      console.log("El pedido del detalle del negocio al backend no fue exitoso:", response.data);
      return "Error al pedir detalles del negocio al backend";
    }
  } catch (error: any) {
    console.error("Error al pedir detalles del negocio al backend:", error.message);
    return "Error al pedir detalles del negocio al backend";
  }
}


export const getUserById = async () => {
  const response = await axios.get(`https://discount-project-backend.onrender.com/api/user_detail`,
  //const response = await axios.get(`http://localhost:5050/api/user_detail`,
  {
    withCredentials: true
  }
);
  return response.data;
  console.log("Valor del detalle de usuario: ", response.data);
};




export const updateUser = async (data: Partial<User>) => {
   // Verifico el token antes de hacer la solicitud
   const isTokenValid = await verifyToken();
   if (!isTokenValid) { 
     return 'Token inválido o expirado';
   }

  try {
    const response = await axios.patch(
      `https://discount-project-backend.onrender.com/api/user_update`,
      //`http://localhost:5050/api/user_update`,
      {
        name: data.name,
        lastName: data.lastName,
        businessName: data.businessName,
        phone: data.phone,
        businessType: data.businessType
      },
      {
        withCredentials: true
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
      console.log("La modificación del descuento en MongoDB Atlas no fue exitosa:", response.data);
      return "Error al modificar el descuento";
    }
  } catch (error: any) {
    console.error("Error al modificar el descuento:", error.message);
    return "Error al modificar el descuento";
  }
};



export const getBusinessById = async () => {
  const response = await axios.get(`https://discount-project-backend.onrender.com/api/business_detail`,
  //const response = await axios.get(`http://localhost:5050/api/business_detail`,
  {
    withCredentials: true
  }
  );
  return response.data;
};



export const updateBusiness = async (formData: FormData) => {
   // Verifico el token antes de hacer la solicitud
   const isTokenValid = await verifyToken();
   if (!isTokenValid) { 
     return 'Token inválido o expirado';
   }

  try {
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    const response = await axios.patch(`https://discount-project-backend.onrender.com/api/update_business`, formData, {
    //const response = await axios.patch(`http://localhost:5050/api/update_business`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    });
    //console.log("Negocio actualizado correctamente en MongoDB Atlas:", response.data);

    // Recupero el nuevo nombre del negocio en caso que el usuario lo cambie para que se refleje instantaneamente en las vistas
    if (response.data.updatedBusiness && response.data.updatedBusiness.businessName) {
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



export const getDashboardData = async (userToken: string): Promise<DashboardData> => {
  const response = await fetch('https://discount-project-backend.onrender.com/api/dashboard', 
    {
      headers: {
        //Authorization: `Bearer ${yourToken}`,  // Usa tu token de autenticación
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error fetching dashboard data');
  }

  return await response.json() as DashboardData;
};
