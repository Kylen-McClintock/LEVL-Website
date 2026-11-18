import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    qualities: [75, 95, 100],
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
    return {
      afterFiles: [
        {
          source: '/research',
          destination: 'https://research-hub.levlhealth.com/',
        },
        {
          source: '/research/:path*',
          destination: 'https://research-hub.levlhealth.com/:path*',
        },
      ],
      fallback: [
        {
          source: '/app/:path+/',
          destination: 'https://2026-levl-protocols-app.vercel.app/app/:path+',
        },
        {
          source: '/app/:path+',
          destination: 'https://2026-levl-protocols-app.vercel.app/app/:path+',
        },
      ],
    }
  },
  async redirects() {
    const founderCodes = [
      'TOM30', 'CAT30', 'MARK30', 'TAYLOR30', 'LAM30',
      'KYLEN30', 'DAN30', 'EMMETT30', 'KEGAN30', 'LAROCCA30', 'AARON30', 'BECCA30',
      'FOUNDER30'
    ];
    const founderRedirects = founderCodes.flatMap(code => {
      const lower = code.toLowerCase();
      const title = code.charAt(0).toUpperCase() + lower.slice(1);
      return [
        {
          source: `/${code}`,
          destination: `/?ref=${code}`,
          permanent: false,
        },
        {
          source: `/${lower}`,
          destination: `/?ref=${code}`,
          permanent: false,
        },
        {
          source: `/${title}`,
          destination: `/?ref=${code}`,
          permanent: false,
        },
      ];
    });

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
