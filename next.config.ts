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
    // The allergy site used to live at /allergy/ja and /allergy/en. Japanese
    // is now the root (/allergy) and English takes the prefix (/en/allergy).
    // These 301s preserve what is already indexed. `redirects` runs before
    // the proxy, so next-intl never sees the old URLs.
    return [
      {
        source: '/allergy/ja',
        destination: '/allergy',
        permanent: true,
      },
      {
        source: '/allergy/ja/:path*',
        destination: '/allergy/:path*',
        permanent: true,
      },
      {
        source: '/allergy/en',
        destination: '/en/allergy',
        permanent: true,
      },
      {
        source: '/allergy/en/:path*',
        destination: '/en/allergy/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
