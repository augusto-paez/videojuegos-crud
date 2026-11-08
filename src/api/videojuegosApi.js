import api from './axiosInstance';

// Obtiene todos los videojuegos del catálogo
export const getAll = async () => {
  const { data } = await api.get('/videojuegos');
  return data;
};

// Obtiene un videojuego por su ID
export const getById = async (id) => {
  const { data } = await api.get(`/videojuegos/${id}`);
  return data;
};

// Crea un nuevo registro de videojuego
export const create = async (videojuego) => {
  const { data } = await api.post('/videojuegos', videojuego);
  return data;
};

// Actualiza los datos de un videojuego existente
export const update = async (id, videojuego) => {
  const { data } = await api.put(`/videojuegos/${id}`, videojuego);
  return data;
};

// Elimina un videojuego según su ID
export const remove = async (id) => {
  const { data } = await api.delete(`/videojuegos/${id}`);
  return data;
};
