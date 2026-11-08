import { Link } from 'react-router-dom';
import VideojuegoCard from './VideojuegoCard';

export default function VideojuegoList({ videojuegos }) {
  if (videojuegos.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-slate-800/40 rounded-2xl border border-slate-800 max-w-xl mx-auto">
        <span className="text-5xl block mb-4" role="img" aria-label="Juego">👾</span>
        <h3 className="text-xl font-bold text-white mb-2">No hay videojuegos en el catálogo</h3>
        <p className="text-slate-400 text-sm mb-6">
          Comenzá agregando el primer videojuego para administrarlo desde la aplicación.
        </p>
        <Link
          to="/videojuegos/nuevo"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-violet-600/20"
        >
          <span>+</span> Agregar Videojuego
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videojuegos.map((videojuego) => (
        <VideojuegoCard key={videojuego.id} videojuego={videojuego} />
      ))}
    </div>
  );
}
