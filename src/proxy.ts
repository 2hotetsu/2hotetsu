import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

// With `localePrefix: 'as-needed'` this middleware rewrites /staff -> /ja/staff
// internally (the address bar still shows /staff) and lets /en/staff through.
export default createMiddleware(routing);

export const config = {
  matcher: [
    // Everything except Next's assets, the Studio, the SEO files at the root
    // and any path with an extension (images, PDFs, legacy js).
    '/((?!_next|_vercel|studio|sitemap\\.xml|robots\\.txt|.*\\..*).*)',
  ],
};
