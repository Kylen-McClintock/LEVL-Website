import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/research',
        destination: 'https://levl-research-paper-summary-engine.vercel.app/',
      },
      {
        source: '/research/:path*',
        destination: 'https://levl-research-paper-summary-engine.vercel.app/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/deepcell',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
