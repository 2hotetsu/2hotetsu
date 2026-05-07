import { type NextRequest, NextResponse } from 'next/server';

// next-intl locale detection is NOT used here — the locale comes from
// the [locale] URL segment and is set per-page via setRequestLocale().
// Running intlMiddleware would prepend /ja/ to /allergy/ja/... paths.
export default function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|studio|favicon\\.ico|.*\\..*).*)',
  ],
};
