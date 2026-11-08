export default function LoadingSpinner({ mensaje = 'Cargando videojuegos...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
      <p className="text-slate-400 text-sm animate-pulse">{mensaje}</p>
    </div>
  );
}
