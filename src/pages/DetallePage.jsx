import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getById } from '../api/videojuegosApi';
import { useVideojuegos } from '../hooks/useVideojuegos';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { eliminarVideojuego } = useVideojuegos();

  const [videojuego, setVideojuego] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Obtiene los datos del videojuego por ID al montar la vista o cambiar de ID
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
          setError('Videojuego no encontrado o error al conectar con la API.');
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

  // Maneja la eliminación con confirmación obligatoria del usuario
  const handleDelete = async () => {
    if (!videojuego) return;

    const confirmado = window.confirm(
      `¿Estás seguro de que querés eliminar "${videojuego.nombre}"? Esta acción no se puede deshacer.`
    );

    if (!confirmado) return;

    try {
      setIsDeleting(true);
      await eliminarVideojuego(id);
      navigate('/');
    } catch {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <LoadingSpinner mensaje="Cargando detalles del videojuego..." />
      </div>
    );
  }

  if (error || !videojuego) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-8">
          <span className="text-5xl block mb-4" role="img" aria-label="Error">⚠️</span>
          <h2 className="text-xl font-bold text-white mb-2">Videojuego no encontrado</h2>
          <p className="text-slate-400 text-sm mb-6">
            {error || 'No se encontró la información del videojuego solicitado.'}
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
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Botón Volver */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <span>←</span> Volver al catálogo
        </Link>
      </div>

      <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl overflow-hidden shadow-2xl">
        {/* Imagen de cabecera */}
        <div className="relative aspect-video w-full max-h-96 bg-slate-950 overflow-hidden">
          <img
            src={videojuego.imagen}
            alt={videojuego.nombre}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/800x450/1e293b/94a3b8?text=Sin+Imagen';
            }}
          />
          <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg text-sm font-bold text-amber-400 border border-slate-700 shadow-lg">
            ★ {videojuego.puntaje} / 10
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 sm:p-8">
          {/* Etiquetas y título */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-violet-950/80 text-violet-300 border border-violet-800/50">
              {videojuego.genero}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-700/60 text-slate-300">
              {videojuego.plataforma}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                videojuego.multijugador
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/50'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {videojuego.multijugador ? 'Multijugador' : 'Un jugador'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            {videojuego.nombre}
          </h1>

          <div className="border-t border-slate-700/50 my-6" />

          {/* Descripción */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Descripción
            </h2>
            <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
              {videojuego.descripcion}
            </p>
          </div>

          {/* Ficha técnica */}
          <div className="bg-slate-900/60 rounded-xl p-4 sm:p-6 mb-8 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Puntaje</span>
              <span className="text-lg font-bold text-amber-400">{videojuego.puntaje} / 10</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">Género</span>
              <span className="text-base font-semibold text-slate-200">{videojuego.genero}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">Plataforma</span>
              <span className="text-base font-semibold text-slate-200">{videojuego.plataforma}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">Modo de juego</span>
              <span className="text-base font-semibold text-slate-200">
                {videojuego.multijugador ? 'Multijugador' : 'Individual'}
              </span>
            </div>
          </div>

          {/* Barra de acciones (Editar y Eliminar) */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-700/50">
            <Link
              to={`/videojuegos/${id}/editar`}
              className="w-full sm:w-auto text-center bg-slate-700 hover:bg-slate-600 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Editar Videojuego
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 disabled:bg-rose-900 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar Videojuego'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
