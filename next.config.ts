import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
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
