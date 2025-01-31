/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5050',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'discount-project-backend.onrender.com',
        pathname: '/img/**',
        //pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wrong-lisa-oluciani-3ba92637.koyeb.app', // Agrega el dominio de Koyeb
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com', // Agrega esta sección
        pathname: '/**', // Permitir todas las rutas de Firebase Storage
      },
    ],
  },
  // Deshabilita los source maps en producción
  productionBrowserSourceMaps: false,
  // Configuración del proxy para redirigir las peticiones
  async rewrites() {
    // Accedo a la variable de entorno para configurar el backend dinámicamente
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
      throw new Error(
        "La variable de entorno NEXT_PUBLIC_BACKEND_URL no está definida. Asegúrate de configurarla en tu archivo .env.local."
      );
    }
    return [
      {
        source: '/:path*', // Ruta interna en el frontend
        destination: `${backendUrl}/:path*`, // Redirige dinámicamente al backend,
      },
    ];
  },
};

export default nextConfig;
