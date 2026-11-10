# 🎮 Videojuegos CRUD — Catálogo de Administración

Aplicación web desarrollada en **React (Vite)** para la administración completa de un catálogo de videojuegos. Permite **listar**, **ver detalle**, **crear**, **editar** y **eliminar** títulos en tiempo real, persistiendo toda la información en una API REST externa (**MockAPI**).

---

## 🚀 Demo en Vivo

> 🔗 **Enlace de la aplicación desplegada:**  
> 👉 [videojuegos crud](https://videojuegos-crud.vercel.app/)

---

## 📋 Recurso Administrado y API

El sistema administra la entidad **Videojuego**, con los siguientes atributos:

* `id`: Identificador único (generado automáticamente por MockAPI).
* `nombre`: Título del videojuego (mínimo 2 caracteres).
* `genero`: Género temático (`Acción`, `Aventura`, `RPG`, `Estrategia`, `Deportes`, `Terror`, `Plataformas`, `Simulación`).
* `plataforma`: Sistema principal (`PC`, `PlayStation`, `Xbox`, `Nintendo Switch`, `Mobile`).
* `puntaje`: Valoración entera de 1 a 10.
* `multijugador`: Booleano que indica si cuenta con modalidad multijugador.
* `imagen`: URL con la portada del juego (con imagen de respaldo automática en caso de error de carga).
* `descripcion`: Sinopsis o reseña detallada (mínimo 10 caracteres).

### Proveedor de Datos
* **Servicio:** [MockAPI.io](https://mockapi.io)
* **Endpoint base configurado:** Definido mediante la variable de entorno `VITE_API_URL`.
* **Recurso:** `/videojuegos` (soporta `GET`, `POST`, `PUT`, `DELETE`).

---

## ✨ Características y Requisitos Técnicos

* ✅ **CRUD completo de punta a punta:** Crear, listar, consultar detalle, editar y eliminar con actualización reactiva inmediata en la interfaz.
* ✅ **Navegación con React Router v6:** Rutas semánticas (`/`, `/videojuegos/nuevo`, `/videojuegos/:id`, `/videojuegos/:id/editar`).
* ✅ **Capa de API desacoplada:** Cliente HTTP centralizado en `src/api/` con Axios. Ningún componente interactúa directamente con Axios.
* ✅ **Gestión de estado global con Context API:** `VideojuegosContext` administra la colección y expone las operaciones CRUD con inmutabilidad estricta.
* ✅ **Formularios con React Hook Form:** Validación en tiempo real y mensajes de error inline bajo cada campo según el esquema de datos.
* ✅ **Feedback en cada acción:** Notificaciones toast mediante `react-hot-toast` para operaciones exitosas y fallos de conexión.
* ✅ **Eliminación protegida:** Confirmación obligatoria e irreversible con `window.confirm()` antes de borrar cualquier registro.
* ✅ **Manejo de estados de carga y error:** Indicador visual animado (`LoadingSpinner`) y pantallas de error contextuales ante fallas de red o registros inexistentes (404).
* ✅ **Diseño responsivo:** Construido con Tailwind CSS v4, adaptable desde dispositivos móviles (375px) hasta pantallas de escritorio.
* ✅ **Soporte SPA en producción:** Configuración de reescritura de rutas para Vercel (`vercel.json`) y Netlify (`public/_redirects`).

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React 19, Vite 8, React Router Dom 6
* **Estilos:** Tailwind CSS v4, `@tailwindcss/vite`
* **Formularios:** React Hook Form 7
* **Cliente HTTP:** Axios 1
* **Notificaciones:** react-hot-toast 2
* **Gestor de paquetes:** pnpm (v11)

---

## 💻 Instalación y Ejecución Local

### Prerrequisitos
* Node.js v18 o superior.
* Gestor de paquetes `pnpm` (o `npm` / `yarn`).

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/augusto-paez/videojuegos-crud.git
   cd videojuegos-crud
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno:**
   Crear un archivo `.env` en la raíz (puedes tomar como base `.env.example`):
   ```env
   VITE_API_URL=https://<tu-id-mockapi>.mockapi.io
   ```
   *(Nota: Por indicación académica para la evaluación del Sprint 5, el archivo `.env` se incluye en el repositorio para facilitar la prueba).*

4. **Iniciar en modo desarrollo:**
   ```bash
   pnpm dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

5. **Compilar para producción:**
   ```bash
   pnpm build
   pnpm preview
   ```

6. **Verificar calidad de código:**
   ```bash
   pnpm lint
   ```

---
