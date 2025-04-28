# Comé x Menos

Aplicación web diseñada para que los negocios gestionen los descuentos que ofrecen a través de la aplicación móvil **"Comé x Menos"**, donde los usuarios finales pueden descubrir y aprovechar ofertas en restaurantes, cafeterías, panaderías y más.

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

## Instalación y ejecución

1. Clona este repositorio:
    ```bash
    git clone https://github.com/OLuciani/discount-project-web.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd discount-project-web
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```

5. Luego abre [http://localhost:8081](http://localhost:8081) en tu navegador para ver la aplicación en funcionamiento.

## Características principales

- **Autenticación segura**: Implementación de un flujo de autenticación doble utilizando Firebase Authentication y validación adicional con datos almacenados en MongoDB, garantizando seguridad tanto en el acceso como en la gestión de la sesión.
- **Gestión de roles**: Los usuarios tienen diferentes niveles de acceso según su rol (negocio o usuario final) para una administración eficiente de los descuentos.
- **Dashboard para negocios**: Los negocios tienen acceso a un panel de control donde pueden gestionar sus descuentos y visualizar métricas en tiempo real sobre el rendimiento de sus ofertas.
- **Sistema de descuentos**: Los negocios pueden crear, editar, activar y eliminar descuentos de manera sencilla, con un temporizador dinámico que se actualiza en tiempo real.
- **Dashboard para administradores de la app**: Los administradores pueden acceder a un panel donde verifican los datos enviados por los dueños de los negocios durante el registro. Luego de la revisión, pueden cambiar el estado del negocio de "pendiente" a "activo", permitiendo que comiencen a ofrecer descuentos.
- **Interfaz moderna y responsiva**: Desarrollada con Tailwind CSS para ofrecer una experiencia de usuario atractiva en todos los dispositivos.
- **Almacenamiento de archivos**: Uso de Firebase Storage para guardar imágenes y documentos relacionados con los descuentos de manera eficiente y segura.

## Video de presentación

Haz clic en el siguiente enlace para ver una demostración de la aplicación:  
[Ver video de presentación](https://discount-project-web.vercel.app/videos/demo-video-app-funcionando.mp4)

## Prueba la app iniciando sesión como visitante

- Accede a la app aquí: [https://discount-project-web.vercel.app/](https://discount-project-web.vercel.app/)
- Puedes iniciar sesión como **usuario visitante** usando:
  - **Email**: `visituser@demo.com`
  - **Contraseña**: `12345678`

(Este usuario representa un empleado asociado a un negocio. Podrás crear, editar y eliminar descuentos.)

---

## Información adicional

Este proyecto fue creado usando [Next.js](https://nextjs.org/) y personalizado para satisfacer las necesidades específicas de **"Comé x Menos"**.  

Para aprender más sobre Next.js, puedes consultar su [documentación oficial](https://nextjs.org/docs).

## Posibles mejoras futuras

- **Modularización del código**: Separar y organizar mejor algunos componentes y páginas que actualmente son extensos, para mejorar el mantenimiento y la escalabilidad del proyecto.
- **Optimización del manejo de errores**: Implementar un sistema más robusto de manejo de errores en el frontend y backend para brindar una experiencia de usuario más clara y amigable.
- **Refinamiento de la experiencia de usuario (UX)**: Mejorar ciertos flujos de navegación y feedback visual en algunas interacciones, para hacer la experiencia aún más fluida.
- **Implementación de testing automatizado**: Agregar pruebas unitarias y de integración para fortalecer la calidad y confiabilidad del sistema.
