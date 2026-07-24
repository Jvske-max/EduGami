import api from '../api/axios';

// Función para iniciar sesión
export const loginUser = async (credentials: any) => {
  // api.post ya sabe que la URL base es http://localhost:4000/api
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Función para registrar un nuevo usuario
export const registerUser = async (userData: { name: string; email: string; password: string; role: string }) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Obtener los datos reales del usuario autenticado
export const getCurrentProfile = async () => {
  // Asumiendo que en tu backend tienes una ruta como GET /api/auth/me o /api/users/me
  const response = await api.get('/auth/me'); 
  return response.data;
};

