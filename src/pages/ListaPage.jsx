import { useVideojuegos } from '../hooks/useVideojuegos';
import VideojuegoList from '../components/VideojuegoList';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ListaPage() {
  const { videojuegos, isLoading, error, recargar } = useVideojuegos();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Catálogo de Videojuegos</h1>
          <p className="text-sm text-slate-400 mt-1">
            Explorá, agregá y administrá todos los títulos registrados.
          </p>
        </div>
        {!isLoading && !error && videojuegos.length > 0 && (
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700 self-start sm:self-auto">
            Total: <strong className="text-violet-400">{videojuegos.length}</strong>
          </span>
        )}
      </div>

      {isLoading && <LoadingSpinner mensaje="Obteniendo catálogo desde la API..." />}

      {error && !isLoading && (
        <div className="bg-rose-950/50 border border-rose-800/80 rounded-xl p-6 text-center max-w-xl mx-auto">
          <p className="text-rose-200 font-medium mb-3">{error}</p>
          <button
            type="button"
            onClick={recargar}
            className="bg-rose-700 hover:bg-rose-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Reintentar
          </button>
        </div>
      )}

      {!isLoading && !error && <VideojuegoList videojuegos={videojuegos} />}
    </div>
  );
}
