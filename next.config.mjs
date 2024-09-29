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
    domains: ['discount-project-backend.onrender.com', 'firebasestorage.googleapis.com'],
  },
};

export default nextConfig;
