/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deshabilitar source maps para evitar errores de ENOENT
  productionBrowserSourceMaps: false,

  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gravatar.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Configuración para Turbopack (nueva sintaxis)
  turbopack: {
    resolveAlias: {
      // Si necesitas alias adicionales, agrégalos aquí
    },
  },
};

export default nextConfig;
