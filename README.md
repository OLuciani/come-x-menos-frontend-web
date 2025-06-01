# Comé x Menos 

Aplicación web para que negocios gestionen descuentos visibles en la app móvil **"Comé x Menos"**.

---

## 🚀 Despliegue

- Frontend: [https://discount-project-web.vercel.app](https://discount-project-web.vercel.app)
- Video demo: [Ver video de presentación](https://discount-project-web.vercel.app/videos/demo-video-app-funcionando.mp4)

## 🔑 Prueba la app iniciando sesión como visitante

- Accede aquí: [https://discount-project-web.vercel.app](https://discount-project-web.vercel.app)
- Usuario demo:
  - Email: `visituser@demo.com`
  - Contraseña: `12345678`

(Este usuario representa un empleado asociado a un negocio. Podrás crear, editar y eliminar descuentos.)

---

## 💻 Tecnologías utilizadas

- **Frontend:**  
  Next.js, React, Tailwind CSS, Firebase Authentication, Firebase Storage

- **Backend:**  
  Node.js, Express, MongoDB Atlas

- **Hosting:**  
  Frontend en Vercel  
  Backend en Koyeb  
  Archivos en Firebase Storage

---

## 🔧 Backend

El backend de esta aplicación está desarrollado con Node.js, Express y MongoDB Atlas. Está desplegado y funcionando en Koyeb, donde expone una API REST que interactúa con el frontend y la base de datos. 

> ⚠️ El backend no tiene una interfaz visual ya que su función es únicamente ofrecer servicios a través de endpoints protegidos y conectarse con Firebase y MongoDB.

---

## 🛠 Instalación y ejecución local

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
5. Abre en tu navegador [http://localhost:3000](http://localhost:3000).

---

## 🎯 Características principales

- Autenticación segura con Firebase Authentication y validación en MongoDB.
- Gestión de roles para acceso diferenciado entre negocios y usuarios finales.
- Dashboard para negocios con gestión y métricas de descuentos en tiempo real.
- Sistema de creación, edición, activación y eliminación de descuentos.
- Panel administrativo para aprobar y activar negocios.
- Interfaz moderna y responsiva diseñada con Tailwind CSS.
- Almacenamiento de imágenes y documentos con Firebase Storage.

---

## 🚧 Posibles mejoras futuras

- 📦 Modularizar y organizar mejor el código para mayor mantenimiento y escalabilidad.  
- ⚠️ Mejorar manejo de errores en frontend y backend para mejor experiencia de usuario.  
- 🎨 Refinar UX y flujos de navegación para mayor fluidez.  
- ✅ Agregar pruebas unitarias e integración para mayor confiabilidad.

---

## 📚 Información adicional

Este proyecto fue creado usando [Next.js](https://nextjs.org/) y personalizado para las necesidades específicas de **"Comé x Menos"**.

Para aprender más sobre Next.js, consulta la [documentación oficial](https://nextjs.org/docs).

