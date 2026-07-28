import styles from './Footer.module.css';
import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/img/logo-nav.png';

export default async function Footer() {
  const t = await getTranslations('Footer');
  const locale = await getLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <Image src={logo} alt="Logo" width={280} height={62} />
        </div>
        <div className={styles.footerSection}>
          <h3>{t('division')}</h3>
          <h3>{t('advanced')}</h3>
          <Link href="https://maps.app.goo.gl/FDX5VoK2dsA1Wc9T9" target="_blank" className={styles.address}>
            <p>{t('address')}</p>
          </Link>
          <Link href="tel:+81886337371" className={styles.phone}>
            <p>{t('phone')}</p>
          </Link>
        </div>
        
        <div className={styles.footerSection}>
          <h4>{t('quickLinks')}</h4>
          <ul>
            <div className={styles.firstColumn}>
              <li><Link href={`/allergy/${locale}/`}>{t('home')}</Link></li>
              <li><Link href={`/allergy/${locale}/#symptoms`}>{t('symptoms')}</Link></li>
              <li><Link href={`/allergy/${locale}/#patchTest`}>{t('patchTest')}</Link></li>
              <li><Link href={`/allergy/${locale}/#articles`}>{t('articles')}</Link></li>
            </div>
            <div className={styles.secondColumn}>
              <li><Link href={`/allergy/${locale}/#news`}>{t('news')}</Link></li>
              <li><Link href={`/allergy/${locale}/#highlights`}>{t('highlights')}</Link></li>
              <li><Link href={`/allergy/${locale}/asmi`}>{t('researchGroup')}</Link></li>
              <li><Link href={`/allergy/${locale}/#access`}>{t('access')}</Link></li>
            </div>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {currentYear} {t('copyright')}</p>
      </div>
    </footer>
  );
}
