import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Habilita PPR + Cache Components
  cacheComponents: true,
  images: {
    remotePatterns: [new URL('https://www.thecocktaildb.com/**')],
  },
};

export default nextConfig;
