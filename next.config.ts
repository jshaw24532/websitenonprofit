import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@neondatabase/serverless"],
  ...(isStaticExport
    ? { output: "export" as const, trailingSlash: true }
    : {}),
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
