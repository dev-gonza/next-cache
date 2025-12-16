import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Habilita PPR + Cache Components
  cacheComponents: true,
  images: {
    remotePatterns: [new URL('www.thecocktaildb.com/**')],
  },
};

export default nextConfig;
