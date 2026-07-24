import axios from 'axios';

// 1. Obtenemos la variable de entorno
const rawBaseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// 2. Normalizador de URL base: elimina barras diagonales finales y asegura que siempre termine en /api
const getNormalizedBaseURL = (url: string) => {
  let cleaned = url.trim().replace(/\/+$/, '');
  if (!cleaned.endsWith('/api')) {
    cleaned = `${cleaned}/api`;
  }
  return cleaned;
};

const baseURL = getNormalizedBaseURL(rawBaseURL);

// 3. Creamos la instancia centralizada
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 4. Interceptor de Peticiones compatible con SSR
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('edugami_token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;