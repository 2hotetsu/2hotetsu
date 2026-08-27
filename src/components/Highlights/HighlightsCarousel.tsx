"use client";

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { urlForImage } from '@/sanity/lib/image';
import styles from './Highlights.module.css';
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

export default function HighlightsCarousel({ posts, locale }: { posts: Post[], locale: string }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className={styles.carouselContainer}>
      <Splide
        options={{
          type: 'loop',
          autoplay: true,
          interval: 3500,
          arrows: false,
          pagination: true,
          pauseOnHover: true,
          perPage: 1,
        }}
        aria-label="Highlights Carousel"
      >
        {posts.map((post) => (
          <SplideSlide key={post._id}>
            <Link href={`/${locale}/highlights/${post.slug.current}`} className={styles.carouselLink}>
                 <div className={styles.carouselImageWrapper}>
                   {post.mainImage?.asset ? (
                     <Image
                       src={urlForImage(post.mainImage).width(800).height(600).url()}
                       alt={post.mainImage.alt || post.title}
                       width={800}
                       height={600}
                       className={styles.carouselImage}
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
              <div className={styles.carouselCaption}>
                <p>{post.title}</p>
              </div>
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
