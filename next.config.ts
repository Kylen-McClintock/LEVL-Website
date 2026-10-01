import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
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
    const founderCodes = [
      'TOM30', 'CAT30', 'MARK30', 'TAYLOR30', 'LAM30',
      'KYLEN30', 'DAN30', 'EMMETT30', 'KEGAN30', 'LAROCCA30',
      'FOUNDER30'
    ];
    const founderRedirects = founderCodes.flatMap(code => [
      {
        source: `/${code}`,
        destination: `/?ref=${code}`,
        permanent: false,
      },
      {
        source: `/${code.toLowerCase()}`,
        destination: `/?ref=${code}`,
        permanent: false,
      },
    ]);

    return [
      ...founderRedirects,
      {
        source: '/deepcell',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
