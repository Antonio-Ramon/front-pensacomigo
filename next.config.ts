import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ponytail: root explícito porque há lockfile em pasta ancestral que confunde o Turbopack
  turbopack: { root: __dirname },
  // acesso ao dev server via túnel ngrok (assets e HMR)
  allowedDevOrigins: ["*.ngrok-free.app"],
  experimental: {
    serverActions: {
      // upload de imagem passa por server action — o padrão de 1 MB estoura com foto de capa
      bodySizeLimit: "8mb",
      // server actions validam origem — sem isso, POST vindo do ngrok é rejeitado
      allowedOrigins: ["*.ngrok-free.app"],
    },
  },
};

export default nextConfig;
