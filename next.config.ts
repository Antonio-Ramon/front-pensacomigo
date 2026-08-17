import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ponytail: root explícito porque há lockfile em pasta ancestral que confunde o Turbopack
  turbopack: { root: __dirname },
};

export default nextConfig;
