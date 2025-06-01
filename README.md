# Comé x Menos

Aplicación híbrida para promover descuentos en locales gastronómicos (restaurantes, bares, panaderías, etc.), compuesta por una app móvil para los usuarios y una app web para los negocios. Ambos frontends se comunican con un backend centralizado que gestiona toda la lógica de negocio.

---

## 🎥 Demo

- Video de presentación: [Ver video de demo](https://discount-project-web.vercel.app/videos/demo-video-app-funcionando.mp4)

---

## 🚀 Despliegue

- Web app (negocios): [https://discount-project-web.vercel.app](https://discount-project-web.vercel.app)

---

## 🔑 Prueba la app web iniciando sesión como visitante

- Accede aquí: [https://discount-project-web.vercel.app](https://discount-project-web.vercel.app)
- Usuario demo:
  - Email: `visituser@demo.com`
  - Contraseña: `12345678`

_Este usuario representa un empleado asociado a un negocio. Podrás crear, editar y eliminar descuentos._

---

## 💻 Tecnologías utilizadas

- Next.js  
- React  
- Tailwind CSS  
- Formik + Yup (validación de formularios)

---

### Hosting

- Vercel  

---

## 🎯 Características principales del Frontend Web

- Formularios validados con **Formik** y **Yup** para una mejor experiencia de usuario.
- Dashboard para negocios con métricas y gestión de descuentos en tiempo real.
- Gestión de roles: administradores, negocios y empleados (visibles según permisos).
- Sistema completo de creación, edición, activación y eliminación de descuentos con expiración automática.
- Panel administrativo para aprobación y activación de nuevos negocios.
- Interfaz moderna, responsiva y accesible diseñada con **Tailwind CSS**.

---

## 🛠 Instalación y ejecución local del Frontend Web

1. Clona el repositorio:
    ```bash
    git clone https://github.com/OLuciani/come-x-menos-frontend-web.git
    ```
2. Entra al directorio:
    ```bash
    cd come-x-menos-frontend-web
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Ejecuta la app en modo desarrollo:
    ```bash
    npm run dev
    ```
5. Abre en tu navegador [http://localhost:3000](http://localhost:3000)

---

## 🛠 Posibles mejoras futuras

- 📦 Mejor modularización del código.
- ⚠️ Mejor manejo de errores globales en frontend y backend.
- 🎨 Mejora de la experiencia de usuario (UX).
- ✅ Inclusión de pruebas unitarias y de integración.

---

## 🏗 Arquitectura general del sistema

**Comé x Menos** consta de tres componentes principales:

### 1. Frontend Móvil
- App para usuarios finales (React Native con Expo).
- Permite explorar descuentos en tiempo real según ubicación.

### 2. Backend compartido
- API REST en Node.js + Express.
- Base de datos en MongoDB Atlas.
- Autenticación con Firebase Auth y gestión de roles en MongoDB.
- Firebase Storage para archivos.
- Lógica compartida para frontend web y móvil.

### 3. Frontend Web
- App web para negocios (Next.js + React + Tailwind CSS).
- Los negocios pueden crear, editar y eliminar sus descuentos, así como visualizar métricas relevantes desde su panel.
- Panel exclusivo para administradores de la plataforma: permite validar cuentas de negocios, enviar mensajes a los clientes y gestionar configuraciones globales.

---

Si te interesa conocer más sobre los otros componentes (app móvil o backend), consulta sus repositorios respectivos o contacta al equipo de desarrollo.

