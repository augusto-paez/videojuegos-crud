import { useParams } from 'react-router-dom';

export default function DetallePage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Detalle del Videojuego</h1>
      <p className="text-slate-400 mt-2">ID recibido por parámetro: {id}</p>
    </div>
  );
}
