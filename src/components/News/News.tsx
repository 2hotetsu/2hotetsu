import { getTranslations, setRequestLocale } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { postsQuery } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import styles from "./News.module.css";
import Image from 'next/image';
import newsImg from '@/img/news/news.png';
import Link from 'next/link';
import { extractYouTubeId } from '@/utils/youtube';
import PdfCardPreviewNoSSR from '@/components/PdfPreview/PdfCardPreviewNoSSR';
import pdfDownload from '@/img/icons/pdf.png'

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
  pdfFile?: {
    url: string;
  };
};

export default async function News({ params }: { params: Promise<{ locale: string }> }) {
    const t = await getTranslations('News');
    const { locale } = await params;
    setRequestLocale(locale);

    const posts: Post[] = await client.fetch(postsQuery, { locale });
    return (
        <section id="news" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>{t('newsTitle')}</h3>
            <Link href={`/allergy/${locale}/news`} className={styles.viewAll}>{t('viewAll')} &rarr;</Link>
          </div>
          <div className={styles.newsGrid}>
            {posts.length > 0 ? (
              posts.slice(0, 3).map((post) => (
                <Link key={post._id} href={`/allergy/${locale}/news/${post.slug.current}`} className={styles.newsCardLink}>
                  <article className={styles.newsCard}>
                    <div className={styles.newsImageWrapper}>
                      {post.mainImage?.asset ? (
                        <Image
                          src={urlForImage(post.mainImage).width(600).height(400).url()}
                          alt={post.mainImage.alt || post.title}
                          width={600}
                          height={400}
                          className={styles.newsImage}
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
                      ) : post.pdfFile?.url ? (
                        <div className={styles.pdfWrapper}>
                          <PdfCardPreviewNoSSR file={post.pdfFile.url} />
                        </div>
                      ) : (
                        <div className={styles.placeholder}></div>
                      )}
                    </div>
                    <div className={styles.newsCardBody}>
                      <span className={styles.newsDate}>
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString(locale, {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                            })
                          : ''}
                      </span>
                      <h4>{post.title}</h4>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <p className={styles.noPosts}>まだ投稿がありません</p>
            )}
          </div>
        </section>
    );
}