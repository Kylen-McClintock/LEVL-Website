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
        source: '/LEVTrajectory/',
        destination: 'https://lev-longevity-trajectory.vercel.app/'
      },
      {
        source: '/LEVTrajectory/:path*',
        destination: 'https://lev-longevity-trajectory.vercel.app/:path*'
      }
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
