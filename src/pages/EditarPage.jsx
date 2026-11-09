import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getById } from '../api/videojuegosApi';
import { useVideojuegos } from '../hooks/useVideojuegos';
import VideojuegoForm from '../components/VideojuegoForm';
import LoadingSpinner from '../components/LoadingSpinner';

export default function EditarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editarVideojuego } = useVideojuegos();

  const [videojuego, setVideojuego] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtiene los datos actuales del videojuego para pre-cargar el formulario
  useEffect(() => {
    let ignore = false;

    const fetchVideojuego = async () => {
      try {
        const data = await getById(id);
        if (!ignore) {
          setVideojuego(data);
        }
      } catch {
        if (!ignore) {
          setError('No se pudo cargar la información del videojuego para editar.');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchVideojuego();

    return () => {
      ignore = true;
    };
  }, [id]);

  // Maneja el envío del formulario de edición sin incluir el ID en el payload del body
  const handleEditar = async (formData) => {
    // Excluye el id del payload enviado según las especificaciones del modelo de datos
    // eslint-disable-next-line no-unused-vars
    const { id: _id, ...datosActualizados } = formData;

    try {
      await editarVideojuego(id, datosActualizados);
      navigate(`/videojuegos/${id}`);
    } catch {
      // El toast de error lo dispara el contexto; el formulario permanece abierto para reintentar
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <LoadingSpinner mensaje="Cargando información para edición..." />
      </div>
    );
  }

  if (error || !videojuego) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-8">
          <span className="text-5xl block mb-4" role="img" aria-label="Error">⚠️</span>
          <h2 className="text-xl font-bold text-white mb-2">Error al cargar videojuego</h2>
          <p className="text-slate-400 text-sm mb-6">
            {error || 'No se encontró el videojuego solicitado para editar.'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Botón Volver */}
      <div className="mb-6">
        <Link
          to={`/videojuegos/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <span>←</span> Cancelar y volver al detalle
        </Link>
      </div>

      <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="mb-6 pb-6 border-b border-slate-700/60">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Editar Videojuego
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Modificá los datos de <strong className="text-violet-400">{videojuego.nombre}</strong>.
          </p>
        </div>

        <VideojuegoForm
          defaultValues={videojuego}
          onSubmit={handleEditar}
          submitText="Guardar Cambios"
        />
      </div>
    </div>
  );
}
