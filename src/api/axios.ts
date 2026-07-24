import axios from 'axios';

// 1. Llamamos a la variable de entorno
const baseURL = import.meta.env.VITE_API_URL;

// 2. Creamos la instancia centralizada
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- PASO 4: INTERCEPTOR DE PETICIONES ---
api.interceptors.request.use(
  (config) => {
    // 🛡️ EL ESCUDO: Verificamos que estamos en el entorno del navegador (window)
    // Esto evita el error fatal "localStorage is not defined"
    if (typeof window !== 'undefined') {
      // 1. Buscamos el token en el almacenamiento local del navegador
      const token = localStorage.getItem('edugami_token'); 

      // 2. Si el usuario tiene un token guardado, se lo inyectamos a la cabecera
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    // Si hay un error al configurar la petición, lo dejamos pasar para manejarlo en los componentes
    return Promise.reject(error);
  }
);

// Exportamos la instancia ya blindada
export default api;