import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const GENEROS = [
  'Acción',
  'Aventura',
  'RPG',
  'Estrategia',
  'Deportes',
  'Terror',
  'Plataformas',
  'Simulación',
];

const PLATAFORMAS = [
  'PC',
  'PlayStation',
  'Xbox',
  'Nintendo Switch',
  'Mobile',
];

export default function VideojuegoForm({
  defaultValues,
  onSubmit,
  submitText = 'Guardar Videojuego',
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues || {
      nombre: '',
      genero: '',
      plataforma: '',
      puntaje: 10,
      multijugador: false,
      imagen: '',
      descripcion: '',
    },
  });

  // El reset es necesario porque defaultValues puede llegar de forma asíncrona en modo edición
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Campo: Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-slate-300 mb-1.5">
          Nombre del videojuego *
        </label>
        <input
          id="nombre"
          type="text"
          placeholder="Ej: The Legend of Zelda: Tears of the Kingdom"
          className={`w-full bg-slate-900 border rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors ${
            errors.nombre ? 'border-rose-500' : 'border-slate-700'
          }`}
          {...register('nombre', {
            required: 'El nombre es obligatorio',
            minLength: {
              value: 2,
              message: 'El nombre debe tener al menos 2 caracteres',
            },
          })}
        />
        {errors.nombre && (
          <span className="text-xs text-rose-400 mt-1 block">
            {errors.nombre.message}
          </span>
        )}
      </div>

      {/* Grid: Género y Plataforma */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Campo: Género */}
        <div>
          <label htmlFor="genero" className="block text-sm font-medium text-slate-300 mb-1.5">
            Género *
          </label>
          <select
            id="genero"
            className={`w-full bg-slate-900 border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors ${
              errors.genero ? 'border-rose-500' : 'border-slate-700'
            }`}
            {...register('genero', {
              required: 'El género es obligatorio',
            })}
          >
            <option value="">Seleccioná un género</option>
            {GENEROS.map((gen) => (
              <option key={gen} value={gen}>
                {gen}
              </option>
            ))}
          </select>
          {errors.genero && (
            <span className="text-xs text-rose-400 mt-1 block">
              {errors.genero.message}
            </span>
          )}
        </div>

        {/* Campo: Plataforma */}
        <div>
          <label htmlFor="plataforma" className="block text-sm font-medium text-slate-300 mb-1.5">
            Plataforma *
          </label>
          <select
            id="plataforma"
            className={`w-full bg-slate-900 border rounded-lg px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors ${
              errors.plataforma ? 'border-rose-500' : 'border-slate-700'
            }`}
            {...register('plataforma', {
              required: 'La plataforma es obligatoria',
            })}
          >
            <option value="">Seleccioná una plataforma</option>
            {PLATAFORMAS.map((plat) => (
              <option key={plat} value={plat}>
                {plat}
              </option>
            ))}
          </select>
          {errors.plataforma && (
            <span className="text-xs text-rose-400 mt-1 block">
              {errors.plataforma.message}
            </span>
          )}
        </div>
      </div>

      {/* Grid: Puntaje y Multijugador */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Campo: Puntaje */}
        <div>
          <label htmlFor="puntaje" className="block text-sm font-medium text-slate-300 mb-1.5">
            Puntaje (1 al 10) *
          </label>
          <input
            id="puntaje"
            type="number"
            min="1"
            max="10"
            placeholder="10"
            className={`w-full bg-slate-900 border rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors ${
              errors.puntaje ? 'border-rose-500' : 'border-slate-700'
            }`}
            {...register('puntaje', {
              valueAsNumber: true,
              required: 'El puntaje es obligatorio',
              min: {
                value: 1,
                message: 'El puntaje mínimo es 1',
              },
              max: {
                value: 10,
                message: 'El puntaje máximo es 10',
              },
            })}
          />
          {errors.puntaje && (
            <span className="text-xs text-rose-400 mt-1 block">
              {errors.puntaje.message}
            </span>
          )}
        </div>

        {/* Campo: Multijugador */}
        <div className="sm:pt-6">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-violet-600 focus:ring-violet-500 focus:ring-offset-slate-900 accent-violet-600 cursor-pointer"
              {...register('multijugador')}
            />
            <span className="text-sm font-medium text-slate-300">
              ¿Tiene modo multijugador?
            </span>
          </label>
        </div>
      </div>

      {/* Campo: URL de la Imagen */}
      <div>
        <label htmlFor="imagen" className="block text-sm font-medium text-slate-300 mb-1.5">
          URL de la imagen de portada *
        </label>
        <input
          id="imagen"
          type="url"
          placeholder="https://ejemplo.com/portada.jpg"
          className={`w-full bg-slate-900 border rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors ${
            errors.imagen ? 'border-rose-500' : 'border-slate-700'
          }`}
          {...register('imagen', {
            required: 'La imagen es obligatoria',
            pattern: {
              value: /^https?:\/\/.+/i,
              message: 'Debe ser una URL válida',
            },
          })}
        />
        {errors.imagen && (
          <span className="text-xs text-rose-400 mt-1 block">
            {errors.imagen.message}
          </span>
        )}
      </div>

      {/* Campo: Descripción */}
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-slate-300 mb-1.5">
          Descripción del videojuego *
        </label>
        <textarea
          id="descripcion"
          rows={4}
          placeholder="Breve reseña o sinopsis de la trama y jugabilidad (mínimo 10 caracteres)..."
          className={`w-full bg-slate-900 border rounded-lg px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors resize-y ${
            errors.descripcion ? 'border-rose-500' : 'border-slate-700'
          }`}
          {...register('descripcion', {
            required: 'La descripción es obligatoria',
            minLength: {
              value: 10,
              message: 'La descripción debe tener al menos 10 caracteres',
            },
          })}
        />
        {errors.descripcion && (
          <span className="text-xs text-rose-400 mt-1 block">
            {errors.descripcion.message}
          </span>
        )}
      </div>

      {/* Botón de Envío */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-violet-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2"
        >
          {isSubmitting ? 'Guardando...' : submitText}
        </button>
      </div>
    </form>
  );
}
