// axiosConfig.ts
import axios from "axios";

//Creo constante con la variable de entorno de la url del backend
const BASE_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const apiClient = axios.create({
  baseURL: `${BASE_BACKEND_URL}`, // Cambia esto por la URL de tu backend
});

apiClient.interceptors.response.use(
  (response) => response, // Respuestas exitosas
  (error) => {
    if (error.response?.status === 401) {
      error.isAuthError = true; // Marcamos el error como un problema de autenticación
    }
    return Promise.reject(error); // Propagamos el error
  }
);

export default apiClient;
