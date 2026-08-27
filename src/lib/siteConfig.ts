export const SITE_URL = 'https://2hotetsu-tokushima-u.jp';

/**
 * Absolute URL of a route in a given locale. Japanese is the default and
 * takes no prefix (`/staff`); English does (`/en/staff`) — the same rule as
 * `localePrefix: 'as-needed'` in `src/i18n/routing.ts`.
 *
 *   localeUrl('ja', '/allergy') -> https://…/allergy
 *   localeUrl('en', '/allergy') -> https://…/en/allergy
 */
export function localeUrl(locale: string, path = '/'): string {
  const prefix = locale === 'en' ? '/en' : '';
  // Each locale's root is "/" (ja) and "/en" (en) — no trailing slash, or the
  // canonical would point at a URL that Next redirects away from.
  if (path === '/' || path === '') return prefix ? SITE_URL + prefix : SITE_URL + '/';
  return `${SITE_URL}${prefix}${path}`;
}
