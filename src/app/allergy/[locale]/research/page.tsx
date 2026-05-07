import { getTranslations, setRequestLocale } from 'next-intl/server';
import FadeIn from "@/components/FadeIn/FadeIn";
import Image from 'next/image';
import styles from "./page.module.css";
import heroImg from '@/img/research/hero.png';
import PdfPreview from '@/components/PdfPreview/PdfPreviewNoSSR';
import Link from 'next/link';
import Access from '@/components/Access/Access';
import joinImg from '@/img/research/qr-code.png';
import { client } from '@/sanity/lib/client';
import { researchNewsQuery } from '@/sanity/lib/queries';

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ResearchPage');

  const news = await client.fetch(researchNewsQuery, { locale });

  const groupedNews = news.slice(0, 10).reduce((acc: any, post: any) => {
    const year = post.publishedAt ? new Date(post.publishedAt).getFullYear() : 'Unknown';
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  // Sort years descending
  const years = Object.keys(groupedNews).sort((a, b) => {
    if (a === 'Unknown') return 1;
    if (b === 'Unknown') return -1;
    return Number(b) - Number(a);
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>

        {/* hero */}
        <div className={styles.heroWrapper}>
            <Image
            src={heroImg}
            alt="Hero Image"
            width={1440}
            height={500}
            className={styles.heroImage}
            />
          <div className={styles.heroContent}>
            <h2 className={styles.heroTitle}>{t('heroTitle')}</h2>
          </div>
          <div className={styles.heroOverlay}/>
        </div>
        
        {/* section purpose */}
        <FadeIn>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{t('introTitle')}</h3>
            </div>
            <div className={styles.intro}>
              <div className={styles.introText}>
                <p>{t('introText1')}</p>
                <p>{t('introText2')}</p>
                <p>{t('introText3')}</p>
                <p>{t('introText4')}</p>
                <Link href="/documents/設立趣意書.pdf" target="_blank" rel="noopener noreferrer">{t('introText5')}</Link>
              </div>
              <div className={styles.introPdf}>
                <PdfPreview file="/documents/金属アレルギー予防の取組.pdf" />
              </div>
            </div>
          </section>
        </FadeIn>

        {/* section activities */}
        <FadeIn>
          <section className={`${styles.section} ${styles.paddingTop}`}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{t('activitiesTitle')}</h3>
            </div>
            <div className={styles.activities}>
              <div className={styles.activitiesTop}>
                <div className={styles.activitiesText}>
                  <p>{t('activitiesText1')}</p>
                  <ol>
                    <li>
                      <p>{t('activitiesText2')}</p>
                    </li>
                    <li>
                      <p>{t('activitiesText3')}</p>
                    </li>
                    <li>
                      <p>{t('activitiesText4')}</p>
                    </li>
                    <li>
                      <p>{t('activitiesText5')}</p>
                    </li>
                    <li>
                      <p>{t('activitiesText6')}</p>
                    </li>
                  </ol>
                  <Link href="/documents/設立趣意書.pdf" target="_blank" rel="noopener noreferrer">{t('activitiesText7')}</Link>
                </div>
                <div className={styles.activitiesRight}>
                  <h3>{t('established')}</h3>
                  <p>{t('establishedDate')}</p>
                </div>
              </div>
              <div className={styles.activitiesBottom}>
                <h3>{t('membersTitle')}</h3>
                <p>{t('membersText')}</p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* section news */}
        <FadeIn>
          <section className={styles.sectionAlt}>
            <div className={styles.sectionAltContainer}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>{t('newsTitle')}</h3>
                <Link href={`/allergy/${locale}/research/news`} className={styles.viewAll}>
                  {t('viewAll')} &rarr;
                </Link>
              </div>
              <div className={styles.newsContainer}>
                {years.length > 0 ? (
                  years.map(year => (
                    <div key={year} className={styles.yearSection}>
                      <h2 className={styles.yearTitle}>{year}</h2>
                      <ul className={styles.newsList}>
                        {groupedNews[year].map((post: any) => (
                          <li key={post._id} className={styles.newsItem}>
                            <span className={styles.newsDate}>
                              {post.publishedAt 
                                ? new Date(post.publishedAt).toLocaleDateString(locale, { 
                                    month: '2-digit', 
                                    day: '2-digit' 
                                  }) 
                                : '--/--'}
                            </span>
                            <Link href={`/allergy/${locale}/research/news/${post.slug.current}`} className={styles.newsLink}>
                              {post.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className={styles.noNews}>{t('noNews') || 'No news available'}</p>
                )}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* section join */}
        <FadeIn>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{t('joinTitle')}</h3>
            </div>
            <div className={styles.joinContainer}>
              <div className={styles.joinTop}>
                <div className={styles.joinText}>
                  <p>{t('joinText1')}</p>
                  <p>{t('joinText2')}</p>
                  <ul>
                    <li>
                      <p>{t('joinMember1')}</p>
                    </li>
                    <li>
                      <p>{t('joinMember2')}</p>
                    </li>
                  </ul>
                </div>
                <div className={styles.joinRight}>
                  <Image
                    src={joinImg}
                    alt="join Image"
                    width={400}
                    height={400}
                    className={styles.joinImage}
                  />
                  <Link className={styles.joinLink} href="https://forms.office.com/pages/responsepage.aspx?id=pMNxhjhF9keHFxah1rDKmFlSAvvliT5HuQXZjSEtNc1UNVJKM0dZU1lFTFBVUEs0V0hTUzg4T1BJMi4u&route=shorturl" target="_blank" rel="noopener noreferrer">{t('button')}</Link>
                </div>
              </div>
              <div className={styles.joinBottom}>
                <h4>{t('joinFee1')}</h4>
                <p className={styles.joinFee2}>{t('joinFee2')}</p>
              </div>
              <div className={styles.contact}>
                <h3>{t('officeTitle')}</h3>
                <p>{t('officeName1')}</p>
                <p>{t('officeName2')}</p>
                <p>{t('officeAddress')}</p>
                <div className={styles.contactEmail}>
                  <p>{t('officeContact')}</p>
                  <Link href="mailto:tokushima.metal.allergy@gmail.com" className={styles.mailTo}>tokushima.metal.allergy@gmail.com</Link>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>


        <FadeIn>
          <Access />
        </FadeIn>
      </main>
    </div>
  );
}
