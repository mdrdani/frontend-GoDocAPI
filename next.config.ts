import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    const isProd = process.env.NODE_ENV === 'production';
    // In production (Docker), default to the internal backend service URL.
    // In development, default to localhost.
    const fallbackUrl = isProd ? 'http://backend:8080' : 'http://localhost:8080';
    const apiUrl = process.env.API_URL || fallbackUrl;

    console.log(`[Next.Config] Rewrites - NODE_ENV: ${process.env.NODE_ENV}, API_URL: ${process.env.API_URL}, Resolved: ${apiUrl}`);

    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiUrl}/api/v1/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
