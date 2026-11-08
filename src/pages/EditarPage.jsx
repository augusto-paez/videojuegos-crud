import { useParams } from 'react-router-dom';

export default function EditarPage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Editar Videojuego</h1>
      <p className="text-slate-400 mt-2">ID recibido para edición: {id}</p>
    </div>
  );
}
