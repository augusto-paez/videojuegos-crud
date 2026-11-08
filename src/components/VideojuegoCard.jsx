import { Link } from 'react-router-dom';

export default function VideojuegoCard({ videojuego }) {
  const { id, nombre, genero, plataforma, puntaje, multijugador, imagen, descripcion } = videojuego;

  return (
    <article className="bg-slate-800/80 border border-slate-700/60 rounded-xl overflow-hidden flex flex-col hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-950/20 transition-all duration-200">
      <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
        <img
          src={imagen}
          alt={nombre}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            // Imagen de respaldo por si el enlace provisto no carga
            e.currentTarget.src = 'https://placehold.co/600x400/1e293b/94a3b8?text=Sin+Imagen';
          }}
        />
        <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-md text-xs font-bold text-amber-400 flex items-center gap-1 border border-slate-700">
          <span>★</span> {puntaje}/10
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-violet-950/80 text-violet-300 border border-violet-800/50">
              {genero}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-700/60 text-slate-300">
              {plataforma}
            </span>
            {multijugador && (
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                Multijugador
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold text-white line-clamp-1" title={nombre}>
            {nombre}
          </h2>
          <p className="text-sm text-slate-400 mt-2 line-clamp-2">
            {descripcion}
          </p>
        </div>

        <Link
          to={`/videojuegos/${id}`}
          className="w-full text-center bg-slate-700/70 hover:bg-violet-600 text-slate-200 hover:text-white font-medium text-sm py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Ver Detalle
        </Link>
      </div>
    </article>
  );
}
