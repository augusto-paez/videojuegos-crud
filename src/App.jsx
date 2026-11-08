import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListaPage from './pages/ListaPage';
import NuevoPage from './pages/NuevoPage';
import DetallePage from './pages/DetallePage';
import EditarPage from './pages/EditarPage';

export default function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-slate-900 text-slate-100">
        <Routes>
          <Route path="/" element={<ListaPage />} />
          {/* Se declara antes que /:id para evitar que "nuevo" sea interpretado como un ID dinámico */}
          <Route path="/videojuegos/nuevo" element={<NuevoPage />} />
          <Route path="/videojuegos/:id" element={<DetallePage />} />
          <Route path="/videojuegos/:id/editar" element={<EditarPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
