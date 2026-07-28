import { getTranslations, getLocale } from 'next-intl/server';
import styles from './Nav.module.css';

const navKeys = [
  { key: 'home' as const,         anchor: null },
  { key: 'symptoms' as const,     anchor: '#symptoms' },
  { key: 'patchTest' as const,    anchor: '#patchTest' },
  { key: 'articles' as const,     anchor: '#articles' },
  { key: 'news' as const,         anchor: '#news' },
  { key: 'highlights' as const,   anchor: '#highlights' },
  { key: 'researchGroup' as const,anchor: '#asmi' },
  { key: 'access' as const,       anchor: '#access' },
];

export default async function Nav() {
  const t = await getTranslations('Nav');
  const locale = await getLocale();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navKeys.map(({ key, anchor }) => (
          <li key={key}>
            <a href={anchor ?? `/allergy/${locale}`} className={styles.navLink}>
              {t(key)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
