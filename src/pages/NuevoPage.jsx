import { useNavigate, Link } from 'react-router-dom';
import { useVideojuegos } from '../hooks/useVideojuegos';
import VideojuegoForm from '../components/VideojuegoForm';

export default function NuevoPage() {
  const navigate = useNavigate();
  const { agregarVideojuego } = useVideojuegos();

  const handleCrear = async (formData) => {
    try {
      await agregarVideojuego(formData);
      navigate('/');
    } catch {
      // El toast de error lo dispara el contexto; el formulario permanece abierto para reintentar
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Botón Volver */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <span>←</span> Volver al catálogo
        </Link>
      </div>

      <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="mb-6 pb-6 border-b border-slate-700/60">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Agregar Nuevo Videojuego
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Completá todos los campos para registrar un nuevo título en el catálogo.
          </p>
        </div>

        <VideojuegoForm
          onSubmit={handleCrear}
          submitText="Crear Videojuego"
        />
      </div>
    </div>
  );
}
