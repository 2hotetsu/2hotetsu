import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ja', 'en'],
  defaultLocale: 'ja',

  // Japanese lives at the root (/, /staff, /allergy) and English takes a
  // prefix (/en, /en/staff, /en/allergy). The `[locale]` segment still
  // exists under app/, but the proxy rewrites /staff -> /ja/staff internally.
  localePrefix: 'as-needed',

  // No accept-language redirect: `/` is always Japanese. Redirecting on the
  // browser's language confuses crawlers and makes the canonical home page
  // answer differently for every visitor.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
