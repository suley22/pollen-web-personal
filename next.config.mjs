/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deshabilitar source maps para evitar errores de ENOENT
  productionBrowserSourceMaps: false,

  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = false; // Deshabilitar source maps en desarrollo
    }
    return config;
  },
};

export default nextConfig;
