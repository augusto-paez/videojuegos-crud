/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getAll, create, update, remove } from '../api/videojuegosApi';

export const VideojuegosContext = createContext(null);

export function VideojuegosProvider({ children }) {
  const [videojuegos, setVideojuegos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga inicial al montar el provider utilizando una bandera para prevenir race conditions
  useEffect(() => {
    let ignore = false;

    const cargarInicial = async () => {
      try {
        const data = await getAll();
        if (!ignore) {
          setVideojuegos(data);
        }
      } catch {
        if (!ignore) {
          setError('No se pudo cargar el catálogo de videojuegos. Verificá la conexión con la API.');
          toast.error('Error al obtener los videojuegos.');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    cargarInicial();

    return () => {
      ignore = true;
    };
  }, []);

  // Función para reintentar la carga en caso de error
  const recargar = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAll();
      setVideojuegos(data);
    } catch {
      setError('No se pudo cargar el catálogo de videojuegos. Verificá la conexión con la API.');
      toast.error('Error al obtener los videojuegos.');
    } finally {
      setIsLoading(false);
    }
  };

  // Agrega un videojuego al catálogo actualizando el estado de forma inmutable
  const agregarVideojuego = async (nuevoVideojuego) => {
    try {
      const creado = await create(nuevoVideojuego);
      setVideojuegos((prev) => [...prev, creado]);
      toast.success('Videojuego agregado correctamente.');
      return creado;
    } catch {
      toast.error('No se pudo guardar el videojuego. Intentá de nuevo.');
      throw new Error('Error al crear videojuego');
    }
  };

  // Actualiza un videojuego y reemplaza el elemento en el estado
  const editarVideojuego = async (id, datosActualizados) => {
    try {
      const actualizado = await update(id, datosActualizados);
      setVideojuegos((prev) =>
        prev.map((item) => (item.id === id ? actualizado : item))
      );
      toast.success('Videojuego actualizado correctamente.');
      return actualizado;
    } catch {
      toast.error('No se pudo actualizar el videojuego. Intentá de nuevo.');
      throw new Error('Error al actualizar videojuego');
    }
  };

  // Elimina un videojuego y lo remueve del estado
  const eliminarVideojuego = async (id) => {
    try {
      await remove(id);
      setVideojuegos((prev) => prev.filter((item) => item.id !== id));
      toast.success('Videojuego eliminado correctamente.');
      return true;
    } catch {
      toast.error('No se pudo eliminar el videojuego. Intentá de nuevo.');
      throw new Error('Error al eliminar videojuego');
    }
  };

  return (
    <VideojuegosContext.Provider
      value={{
        videojuegos,
        isLoading,
        error,
        recargar,
        agregarVideojuego,
        editarVideojuego,
        eliminarVideojuego,
      }}
    >
      {children}
    </VideojuegosContext.Provider>
  );
}
