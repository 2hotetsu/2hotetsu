import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './Nav/MobileMenu';
import styles from './Header.module.css';
import Image from 'next/image';
import logoNav from '@/img/logo-nav.png';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function Header() {
  const t = await getTranslations('Header');
  const locale = await getLocale();
  return (
    <div className={styles.headerTop}>
      <div className={styles.headerContainer}>
        <div className={styles.logoArea}>
          <Link href={'/allergy'} className={styles.logoLink}>
            <Image src={logoNav} alt="Logo" width={280} height={62} className={styles.logoImage} />
          </Link>
          <span className={styles.divider}>|</span>
          <div className={styles.department}>
            <span>{t('department')}</span>
            <span>{t('division')}</span>
          </div>
        </div>
        <div className={styles.right}>
          <Link href="https://maps.app.goo.gl/FDX5VoK2dsA1Wc9T9" target="_blank" className={styles.address}>
            <span>{t('address1')}</span>
            <span>{t('address2')}</span>
            <span>{t('address3')}</span>
          </Link>
          <div className={styles.actions}>
            <LanguageSwitcher className={styles.select} />
            <MobileMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
