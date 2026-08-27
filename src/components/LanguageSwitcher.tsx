'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

/**
 * Switches locale while staying on the current page.
 *
 * next-intl's `usePathname` returns the path with the locale prefix ALREADY
 * stripped (/en/staff -> /staff), and `router.replace(path, {locale})` puts
 * the prefix back following the `as-needed` rule: Japanese bare, English
 * under /en. That is why one component serves both sites — it knows nothing
 * about /allergy or about the department routes.
 */
export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as (typeof routing.locales)[number];
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <select
      value={locale}
      onChange={onSelectChange}
      disabled={isPending}
      className={className}
    >
      <option value="ja">日本語</option>
      <option value="en">English</option>
    </select>
  );
}
