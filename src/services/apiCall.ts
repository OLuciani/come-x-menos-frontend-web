import axios from "axios";
import React from "react";
import { File } from "buffer";


export interface User {
  _id: string,
  name: string;
  lastName: string;
  businessName: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword?: string;
}

export interface Business {
  ownerName: string,
  businessName: string,
  businessType: string,
  address: string,
  //latitude: Number;
  //longitude: Number;
  ownerId: string,
  imageURL: File | null;
  _id: string;
}


export interface UserLogin {
  email: string;
  password: string;
}

export interface Discount {
  title: string;
  description: string;
  discountAmount: string;
  imageURL: File | null;
  businessName: string;
  businessId: string;
  businessType: string;
  isActive: boolean;
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
      }
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


export async function createUser(data: User): Promise<User | string> {
  try {
    const response = await axios.post(
      "https://discount-project-backend.onrender.com/api/user_register",
      //"http://localhost:5050/api/user_register",
      {
        name: data.name,
        lastName: data.lastName,
        businessName:data.businessName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        role: "adminweb"  //Por el momento el usuario web van puestos todos como adminweb.
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
      `https://discount-project-backend.onrender.com/api/user_update/${userId}`,
      //`http://localhost:5050/api/user_update/${userId}`,
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
        //latitude: data.;
        //longitude: ;
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
 
  try {
    const response = await axios.post(
      "https://discount-project-backend.onrender.com/api/discount_create",
      //"http://localhost:5050/api/discount_create",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
