import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl" role="img" aria-label="Joystick">🎮</span>
          <span className="font-bold text-xl text-white group-hover:text-violet-400 transition-colors">
            Videojuegos<span className="text-violet-500">App</span>
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? 'text-violet-400' : 'text-slate-300 hover:text-white'
              }`
            }
          >
            Catálogo
          </NavLink>
          <Link
            to="/videojuegos/nuevo"
            className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1 shadow-lg shadow-violet-600/20"
          >
            <span>+</span> Nuevo Videojuego
          </Link>
        </nav>
      </div>
    </header>
  );
}
