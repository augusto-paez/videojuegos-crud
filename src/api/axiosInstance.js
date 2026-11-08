import axios from 'axios';

// Instancia centralizada de axios. La URL base proviene de la variable de entorno VITE_API_URL.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
