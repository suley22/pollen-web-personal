/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deshabilitar source maps para evitar errores de ENOENT
  productionBrowserSourceMaps: false,

  // Configuración para Turbopack (nueva sintaxis)
  turbopack: {
    resolveAlias: {
      // Si necesitas alias adicionales, agrégalos aquí
    },
  },
};

export default nextConfig;
