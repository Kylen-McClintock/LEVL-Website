import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/LEVTrajectory',
        destination: 'https://lev-longevity-trajectory-mu.vercel.app'
      },
      {
        source: '/LEVTrajectory/:path*',
        destination: 'https://lev-longevity-trajectory-mu.vercel.app/:path*'
      }
    ]
  },
};

export default nextConfig;
