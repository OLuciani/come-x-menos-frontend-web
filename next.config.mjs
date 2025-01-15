///** @type {import('next').NextConfig} */
//const nextConfig = {
  //images: {
   //remotePatterns: [
      //{
       // protocol: 'http',
        //hostname: 'localhost',
        //port: '5050', // Asegúrate de que este sea el puerto correcto
        //pathname: '/img/**',
      //},
      //{
        //protocol: 'https',
        //hostname: 'discount-project-backend.onrender.com',
       // pathname: '/img/**',
      //},
   // ],
 // },
//};
//
//export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5050', // Asegúrate de que este sea el puerto correcto
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
        hostname: 'firebasestorage.googleapis.com', // Agrega esta sección
        pathname: '/**', // Permitir todas las rutas de Firebase Storage
      },
    ],
  },
  // Deshabilita los source maps en producción
  productionBrowserSourceMaps: false,
  // Configuración del proxy para redirigir las peticiones
  async rewrites() {
    return [
      {
        source: '/:path*', // Ruta interna en el frontend
        destination: 'https://wrong-lisa-oluciani-3ba92637.koyeb.app/:path*', // Backend en Koyeb
      },
    ];
  },
};

export default nextConfig;
