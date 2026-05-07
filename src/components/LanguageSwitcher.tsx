'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // e.g. /allergy/ja/highlights

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;

    // pathname is like /allergy/ja/something
    // Replace the locale segment: /allergy/ja → /allergy/en
    const newPath = pathname.replace(
      /^(\/allergy\/)(en|ja)(\/|$)/,
      `$1${nextLocale}$3`
    );

    router.push(newPath);
  }

  return (
    <select
      defaultValue={locale}
      onChange={onSelectChange}
      className={styles.select}
    >
      <option value="en">English</option>
      <option value="ja">日本語</option>
    </select>
  );
}
