import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

export const verifyToken = async (): Promise<boolean> => {
  //Creo constante con la variable de entorno de la url del backend
  const BASE_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    //Cookies.remove('userToken');
    //Cookies.remove("userRole");
  try {
    const token = Cookies.get('userToken'); // O el nombre de la cookie que usas para almacenar el token
    
    console.log("Valor de token en verifyToken: ", token);

    if (!token) {
      return false;
    }
   
      //const response = await axios.get(`https://discount-project-backend.onrender.com/api/protected_route`, 
    //const response = await axios.get(`http://localhost:5050/api/protected_route`,
    const response = await axios.get(`${BASE_BACKEND_URL}/api/protected_route`, 
    {
      withCredentials: true,
    });
    console.log("Valor de response en verifyToken: ", response);
    return response.status === 200; // Si el token es válido, la respuesta debería ser 200
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};