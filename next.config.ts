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
        destination: 'https://research-hub.levlhealth.com/',
      },
      {
        source: '/research/:path*',
        destination: 'https://research-hub.levlhealth.com/:path*',
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
