import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      // the legacy second achievements page now lives on /achievements
      {
        source: '/achievements02',
        destination: '/achievements#achievements02',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
