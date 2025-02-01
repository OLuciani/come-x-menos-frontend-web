import axios from 'axios';

const BASE_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;  // Asegúrate de tener la variable de entorno configurada

// Crear una instancia de Axios con la URL base de tu backend
const apiClient = axios.create({
  baseURL: '/',
  withCredentials: true, // Configurado globalmente
});

// Agregar un interceptor para manejar respuestas de error
apiClient.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, la retornamos tal cual
  (error) => {
    if (error.response?.status === 401) {
      error.isAuthError = true; // Marcamos el error como un problema de autenticación
    }
    return Promise.reject(error); // Propagamos el error
  }
);

// Agregar un interceptor para las solicitudes para asegurarse de que el token sea incluido
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // O donde tengas almacenado tu token

    if (token) {
      // Si el token existe, lo incluimos en las cabeceras de la solicitud
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Asegurarnos de que las cookies se envíen con la solicitud
    config.withCredentials = true;

    return config;
  },
  (error) => Promise.reject(error) // En caso de error, lo propagamos
);

export default apiClient;
