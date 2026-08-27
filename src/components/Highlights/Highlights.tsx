import { getTranslations, setRequestLocale } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { highlightsQuery } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import styles from "./Highlights.module.css";
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { extractYouTubeId } from '@/utils/youtube';

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: {
    asset: any;
    alt?: string;
  };
  youtubeUrl?: string;
};
import HighlightsCarousel from './HighlightsCarousel';

export default async function Highlights({ params }: { params: Promise<{ locale: string }> }) {
    const t = await getTranslations('Highlights');
    const { locale } = await params;
    setRequestLocale(locale);

    const posts: Post[] = await client.fetch(highlightsQuery, { locale });
    return (
        <section id="highlights" className={styles.sectionAlt}>
          <div className={styles.sectionAltContainer}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>{t('highlightsTitle')}</h3>
              <Link href={'/allergy/highlights'} className={styles.viewAll}>
                {t('viewAll')} &rarr;
              </Link>
            </div>
            
            <div className={styles.highlightsLayout}>
              <div className={styles.leftColumn}>
                {posts.length > 0 ? (
                  posts.slice(0, 4).map((post) => (
                    <Link key={post._id} href={`/allergy/highlights/${post.slug.current}`} className={styles.leftCardLink}>
                      <article className={styles.leftCard}>
                         <div className={styles.leftCardImageWrapper}>
                           {post.mainImage?.asset ? (
                             <Image
                               src={urlForImage(post.mainImage).width(150).height(100).url()}
                               alt={post.mainImage.alt || post.title}
                               width={150}
                               height={100}
                               className={styles.leftCardImage}
                             />
                           ) : post.youtubeUrl ? (
                             <div className={styles.youtubeWrapper}>
                               <iframe
                                 src={`https://www.youtube.com/embed/${extractYouTubeId(post.youtubeUrl)}`}
                                 title={post.title}
                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                 allowFullScreen
                               />
                             </div>
                           ) : (
                             <div className={styles.placeholder}></div>
                           )}
                         </div>
                        <div className={styles.leftCardBody}>
                          <h4>{post.title}</h4>
                          <span className={styles.leftCardDate}>
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString(locale, {
                                  year: 'numeric',
                                })
                              : ''}
                          </span>
                        </div>
                        <div className={styles.leftCardArrow}>
                           →
                        </div>
                      </article>
                    </Link>
                  ))
                ) : (
                  <p className={styles.noPosts}>まだ投稿がありません</p>
                )}
              </div>
              <div className={styles.rightColumn}>
                <HighlightsCarousel posts={posts} locale={locale} />
              </div>
            </div>

          </div>
        </section>
    );
}