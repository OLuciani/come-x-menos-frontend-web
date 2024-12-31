import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { verifyToken } from "@/services/tokenVerificationService";
import {
  User,
  BusinessEmployee,
  ExtraBusinessAdminUser,
} from "@/types/userTypes";

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

export async function createUser(
  data: User,
  token: string,
  email: string
): Promise<User | string> {
  try {
    console.log(
      "Valor de businessName en createUser de apiCall.ts: ",
      data.businessName
    );
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
  businessId: string
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

//Solicitud para obtener el detalle de los datos de un usuario en particular
export const getUserById = async () => {
  const response = await axios.get(`${BASE_BACKEND_URL}/api/user_detail`, {
    withCredentials: true,
  });
  return response.data;
  console.log("Valor del detalle de usuario: ", response.data);
};

//Solicitud para modificar los datos de un usuario en particular en el momento que se crea una cuenta nueva de un negocio (que obviamente se crea un usuario y un negocio asociado a ese usuario);
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
        "La modificación del usuario en MongoDB Atlas no fue exitosa:",
        response.data
      );
      return "Error al modificar el usuario";
    }
  } catch (error: any) {
    console.error("Error al modificar el usuario:", error.message);
    return "Error al modificar el usuario";
  }
};

//Solicitud para traer los usuarios que crearon una cuenta de negocio y todavia estan pendientes de aprobación por parte de la administración de la app.
export async function fetchPendingUsersFromAPI() {
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.get(`${BASE_BACKEND_URL}/api/pending_users`, {
      withCredentials: true, // Esta línea asegura que las cookies (entre ellas va la del token que es indispensable en esta ruta) se envíen con la solicitud
    });

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

//Solicitud para modificar el status de la cuenta de un usuario de pending a active.
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

//Solicitud para traer un listado con todos los usuarios
export async function fetchAllUsersFromAPI() {
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.get(`${BASE_BACKEND_URL}/api/all_users_list`, {
      withCredentials: true, // Esta línea asegura que las cookies (entre ellas va la del token que es indispensable en esta ruta) se envíen con la solicitud
    });

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
    console.log(
      "Valor de response en la petición userPendingNotifications: ",
      response
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error al obtener las notificaciones"
      );
    }
    throw new Error("Error desconocido al obtener las notificaciones");
  }
};

//Solicitud para enviar notificación a un usuario
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

//Solicitud para marcar una notificacion de un usuario como leída
export const markUserNotificationsAsRead = async (notificationId?: string) => {
  console.log("Valor de notifictionId en la solicitud post:", notificationId);
  try {
    const response = await axios.post(
      `${BASE_BACKEND_URL}/api/mark_user_notification_as_read`,
      {},
      {
        withCredentials: true, // Asegura que las cookies se envíen con la solicitud.
      }
    );

    return response.data; // Devuelves la respuesta para que el componente la maneje
  } catch (error: unknown) {
    console.error("Error al marcar la notificación como leída:", error);

    let errorMessage: string;
    if (axios.isAxiosError(error)) {
      // Si el error es un error de Axios, puedes acceder a la respuesta
      errorMessage = error.response?.data?.message || "Error desconocido";
    } else {
      errorMessage = "Error desconocido";
    }

    return { success: false, message: errorMessage }; // Asegúrate de devolver un objeto con el mensaje de error
  }
};

//Solicitud para enviar un mail para invitar a un usuario a crear una cuenta asociada a la cuenta de un negocio en particular.
export const invitationBusinessEmployeeUser = async (
  user: BusinessEmployee
) => {
  console.log(user.email);
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.post(
      `${BASE_BACKEND_URL}/api/invitation_business_employee_user`,
      {
        email: user.email, // Solo enviamos los datos del usuario
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Error al enviar la invitación al usuario con acceso al scanner en la aplicación movil"
    );
  }
};

//Solicitud para crear una cuenta de usuario con rol de empleado asociada a un negocio.
export async function createBusinessEmployeeUser(
  data: BusinessEmployee,
  token: string,
  businessId: string
): Promise<BusinessEmployee | string> {
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
        businessId: businessId,
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
    console.error(
      "Error al registrar el usuario con acceso a scanner en aplicación movil en MongoDB Atlas:",
      error
    );
    return "Error al registrar el usuario con acceso a scanner en aplicación movil";
  }
}

//Solicitud para invitar a crear cuenta asociada a un negocio en particular a un usuario con rol de administrador
export const invitationExtraBusinessAdminUser = async (
  user: ExtraBusinessAdminUser
) => {
  console.log(user.email);
  try {
    // Verifico el token antes de hacer la solicitud
    const isTokenValid = await verifyToken();
    if (!isTokenValid) {
      return "Token inválido o expirado";
    }

    const response = await axios.post(
      `${BASE_BACKEND_URL}/api/invitation_extra_business_admin_user`,
      {
        email: user.email, // Solo enviamos los datos del usuario
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        "Error al enviar la invitación al usuario administrador de la cuenta del negocio"
    );
  }
};

//Solicitud para crear un usuario con rol de administrador asociado a la cuenta de un negocio en particular
export async function createExtraBusinessAdminUser(
  data: ExtraBusinessAdminUser,
  token: string,
  businessId: string
): Promise<ExtraBusinessAdminUser | string> {
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
        businessId: businessId,
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
    console.error(
      "Error al registrar el Usuario Estra Administrador de cuenta de negocio en MongoDB Atlas:",
      error
    );
    return "Error al registrar el Usuario Estra Administrador de cuenta de negocio en aplicación movil";
  }
}

//Solicitud al backend que trae un listado de todos los usuarios con roles roleBusinessDirector y roleBusinessManager con status active.
export async function getBusinessAdminUsersCount() {
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

//Solicitud que trae un listado de todos los usuarios asociados a un negocio en particular
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


//Función para activar a un usuario pasando su estado de status "pending" a status "active".
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
