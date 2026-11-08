import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { VideojuegosProvider } from './context/VideojuegosContext';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VideojuegosProvider>
      <App />
      <Toaster position="top-right" />
    </VideojuegosProvider>
  </StrictMode>,
);
