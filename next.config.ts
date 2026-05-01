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
    return []
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
