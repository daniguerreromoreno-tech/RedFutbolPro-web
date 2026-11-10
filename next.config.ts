
import type { NextConfig } from "next";

const managerUrl =
  "https://redfutbolpro-manager.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/manager",
        destination: `${managerUrl}/manager`,
      },
      {
        source: "/manager/:path*",
        destination: `${managerUrl}/manager/:path*`,
      },
      {
        source: "/manager-static/:path*",
        destination: `${managerUrl}/manager-static/:path*`,
      },
    ];
  },
};

export default nextConfig;
