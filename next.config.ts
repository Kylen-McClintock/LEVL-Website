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
};

export default nextConfig;
