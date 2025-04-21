/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // si tenías algún otro ajuste en el TS, transpílalo aquí:
  // experimental: { appDir: true }, etc.
  compiler: {
    // ejemplo: si usas styled‑components
    styledComponents: true,
  },
  // alias ya configurados en tsconfig.json seguirán funcionando
};

module.exports = nextConfig;
