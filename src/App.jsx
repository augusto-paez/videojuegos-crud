import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListaPage from './pages/ListaPage';
import NuevoPage from './pages/NuevoPage';
import DetallePage from './pages/DetallePage';
import EditarPage from './pages/EditarPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ListaPage />} />
            {/* Se declara antes que /:id para evitar que "nuevo" sea interpretado como un ID dinámico */}
            <Route path="/videojuegos/nuevo" element={<NuevoPage />} />
            <Route path="/videojuegos/:id" element={<DetallePage />} />
            <Route path="/videojuegos/:id/editar" element={<EditarPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
