'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import styles from './MobileMenu.module.css';

const navKeys = [
  { key: 'home' as const,         anchor: null },
  { key: 'symptoms' as const,     anchor: '#symptoms' },
  { key: 'patchTest' as const,    anchor: '#patchTest' },
  { key: 'articles' as const,     anchor: '#articles' },
  { key: 'news' as const,         anchor: '#news' },
  { key: 'highlights' as const,   anchor: '#highlights' },
  { key: 'researchGroup' as const,anchor: '#research' },
  { key: 'access' as const,       anchor: '#access' },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Nav');
  const locale = useLocale();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className={styles.mobileMenuWrapper}>
      <button
        className={`${styles.hamburger} ${isOpen ? styles.isActive : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`${styles.menuOverlay} ${isOpen ? styles.isOpen : ''}`}>
        <nav className={styles.mobileNav}>
          <ul className={styles.navList}>
            {navKeys.map(({ key, anchor }) => (
              <li key={key} className={styles.navItem}>
                <Link
                  href={anchor ?? '/allergy'}
                  className={styles.navLink}
                  onClick={closeMenu}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
