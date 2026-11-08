import { useContext } from 'react';
import { VideojuegosContext } from '../context/VideojuegosContext';

// Hook personalizado para acceder a las operaciones y estado del catálogo
export const useVideojuegos = () => {
  const context = useContext(VideojuegosContext);

  if (!context) {
    throw new Error('useVideojuegos debe ser utilizado dentro de un VideojuegosProvider');
  }

  return context;
};
