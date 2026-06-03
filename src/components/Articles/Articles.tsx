import { getTranslations, setRequestLocale } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { articleTabsQuery } from '@/sanity/lib/queries';
import styles from './Articles.module.css';
import Link from 'next/link';
import Image from 'next/image';
import pdfDownload from '@/img/icons/pdf.png';
import ArticlesTabs from './ArticlesTabs';
import type { ArticleTab } from './ArticlesTabs';

export default async function Articles({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Articles');

  const tabs: ArticleTab[] = await client.fetch(articleTabsQuery, { locale });

  return (
    <section className={styles.sectionAlt} id="articles">
      <div className={styles.sectionAltContainer}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>{t('articlesTitle')}</h3>
        </div>

        <ArticlesTabs tabs={tabs} />

        <div className={styles.moreInfo}>
          <Link href="/documents/アクセサリーをいつまでも楽しむために.pdf" target="_blank" rel="noopener noreferrer">
            <p>{t('moreInfo')}</p>
            <Image src={pdfDownload} alt="PDF Download" width={20} height={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
