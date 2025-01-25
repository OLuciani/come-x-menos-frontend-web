<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->



# Comé x Menos
Aplicación web diseñada para que los negocios gestionen los descuentos que ofrecen a través de la aplicación móvil "Comé x Menos", donde los usuarios finales pueden descubrir y aprovechar ofertas en restaurantes, cafeterías, panaderías y más.

Los negocios pueden crear, editar y eliminar descuentos, y obtener métricas detalladas sobre el rendimiento de sus ofertas, las cuales son vistas por los usuarios en la app móvil. Esta plataforma facilita la gestión eficiente de las promociones, mientras que la app móvil permite a los clientes interactuar fácilmente con las ofertas disponibles.

## Impacto del Proyecto
- **Optimización de la gestión de descuentos**: El dashboard permite a los negocios gestionar sus ofertas de manera eficiente, aumentando la visibilidad de los descuentos hasta en un 30%.
- **Interfaz de usuario moderna y responsiva**: Diseñada con **Tailwind CSS**, la interfaz se adapta perfectamente a dispositivos móviles y escritorio, brindando una experiencia de usuario atractiva y fluida.
- **Autenticación segura y flujo de usuario**: Implementación de una autenticación **doble** con **Firebase Authentication** y validación adicional mediante datos almacenados en **MongoDB**, garantizando la seguridad de los usuarios.
- **Almacenamiento eficiente de archivos**: Uso de **Firebase Storage** para guardar imágenes y documentos, ofreciendo una gestión de archivos sencilla y segura.

## Capturas de pantalla

![Vista principal](images/vista-principal.png)

![Gestión de descuentos 1](images/gestion-descuentos.png)

![Gestión de descuentos 2](images/editar-eliminar-descuento.png)


## Tecnologías utilizadas
- **Frontend**: 
  - Next.js
  - React
  - Tailwind CSS
  - Firebase Authentication
  - Firebase Storage
- **Backend**:
  - Node.js
  - Express
  - MongoDB Atlas
- **Hosting**: 
  - Vercel (para el frontend)
  - Firebase (para el almacenamiento de archivos)

## Instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/OLuciani/discount-project-web.git

2. Navega al directorio del proyecto:
   ```bash
   cd discount-project-web

3. Instala las dependencias
   ```bash
   npm install

4. Ejecuta el proyecto
   ```bash
   npm run dev

## Características
- Autenticación segura: Implementación de un flujo de autenticación doble utilizando Firebase Authentication y validación adicional con datos almacenados en MongoDB, garantizando seguridad tanto en el acceso como en la gestión de la sesión.
- Gestión de roles: Los usuarios tienen diferentes niveles de acceso según su rol, ya sea como negocio o usuario final, para una administración eficiente de los descuentos.
- Dashboard para negocios: Los negocios tienen acceso a un panel de control donde pueden gestionar sus descuentos y visualizar métricas en tiempo real sobre el rendimiento de sus ofertas.
- Sistema de descuentos: Los negocios pueden crear, editar, activar y eliminar descuentos de manera sencilla, con un temporizador dinámico que se actualiza en tiempo real.
- Dashboard para administradores de la app: Los administradores pueden acceder a un panel donde pueden verificar los datos enviados por los dueños de los negocios durante el registro. Después de revisar la información, el administrador puede cambiar el estado del negocio de "pendiente" a "activo", permitiendo así que el negocio comience a ofrecer descuentos.
- Interfaz moderna y responsiva: La plataforma utiliza Tailwind CSS para ofrecer una experiencia de usuario atractiva y fluida, adaptándose a todos los tamaños de pantalla.
- Almacenamiento de archivos: Uso de Firebase Storage para guardar imágenes y documentos relacionados con los descuentos de manera eficiente y segura.

## Video de presentación
Aquí puedes ver un video de presentación de la app:

<video width="560" controls>
  <source src="/videos/mi-video.mp4" type="video/mp4">
  Tu navegador no soporta el elemento de video.
</video>


## Prueba la app iniciando sesión como visitante
- Para probar la aplicación haz click en el siguiente enlace: https://discount-project-web.vercel.app/
- Puedes iniciar sesión en la aplicación como usuario visitante, utilizando el email ficticio de prueba visituser@demo.com y la contraseña 12345678 (este usuario tiene el rol que tendría un empleado asociado a la cuenta de un negocio). Puedes crear, editar y eliminar un descuento.


