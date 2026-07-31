"use client";

import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import { extractYouTubeId } from '@/utils/youtube';
import PdfCardPreviewNoSSR from '@/components/PdfPreview/PdfCardPreviewNoSSR';
import styles from './PostList.module.css';
import { useTranslations } from 'next-intl';
import { formatDate } from '@/lib/formatDate';




interface PostListProps {
  title: string;
  items: any[];
  basePath: string;
}

export default function PostList({ title, items, basePath }: PostListProps) {

  const t = useTranslations('Read');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>No entries found.</div>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <Link key={item._id} href={`${basePath}/${item.slug?.current}`} className={styles.card}>
              {item.mainImage ? (
                <div className={styles.imageWrapper}>
                  <Image
                    src={urlForImage(item.mainImage).url()}
                    alt={item.mainImage.alt || item.title}
                    fill
                    className={styles.image}
                  />
                </div>
              ) : item.youtubeUrl ? (
                <div className={styles.youtubeWrapper}>
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(item.youtubeUrl)}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : item.pdfFile?.url ? (
                <div className={styles.pdfWrapper}>
                  <PdfCardPreviewNoSSR file={item.pdfFile.url} />
                </div>
              ) : (
                <div className={styles.placeholder} />
              )}
              <div className={styles.content}>
                <div className={styles.date}>
                  {formatDate(item.publishedAt)}
                </div>
                <h2 className={styles.postTitle}>{item.title}</h2>
                <div className={styles.readMore}>{t('readMore')} &rarr;</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
