import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

export const verifyToken = async (): Promise<boolean> => {
    //Cookies.remove('userToken');
  try {
    const token = Cookies.get('userToken'); // O el nombre de la cookie que usas para almacenar el token
    const userId = Cookies.get('userId');
    console.log("Valor de token en verifyToken: ", token);
    console.log("Valor de userId en verifyToken: ", userId);

    if (!token) {
      return false;
    }
   
    const response = await axios.get(`https://discount-project-backend.onrender.com/api/protected_route/${userId}`, {
    //const response = await axios.get(`http://localhost:5050/api/protected_route/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log("Valor de response en verifyToken: ", response);
    return response.status === 200; // Si el token es válido, la respuesta debería ser 200
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};