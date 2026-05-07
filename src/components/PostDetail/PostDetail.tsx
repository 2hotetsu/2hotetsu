import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from 'next-sanity';
import { urlForImage } from '@/sanity/lib/image';
import PdfPreviewNoSSR from '@/components/PdfPreview/PdfPreviewNoSSR';
import styles from './PostDetail.module.css';

interface PostDetailProps {
  post: any;
  backLink: string;
  backText: string;
}

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function PostDetail({ post, backLink, backText }: PostDetailProps) {
  if (!post) {
    return (
      <div className={styles.container}>
        <Link href={backLink} className={styles.backLink}>&larr; {backText}</Link>
        <h1>Post not found</h1>
      </div>
    );
  }

  const ytId = post.youtubeUrl ? getYouTubeId(post.youtubeUrl) : null;

  return (
    <div className={styles.container}>
      <Link href={backLink} className={styles.backLink}>&larr; {backText}</Link>
      
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        {post.publishedAt && (
          <div className={styles.date}>{new Date(post.publishedAt).toLocaleDateString()}</div>
        )}
      </header>

      {post.mainImage && (
        <Image
          src={urlForImage(post.mainImage).url()}
          alt={post.mainImage.alt || post.title}
          width={900}
          height={500}
          className={styles.mainImage}
        />
      )}

      {post.body && (
        <div className={styles.body}>
          <PortableText value={post.body} />
        </div>
      )}
      
      {post.gallery && post.gallery.length > 0 && (
        <div className={styles.gallery}>
          {post.gallery.map((image: any, index: number) => (
            <div key={index} className={styles.galleryItem}>
              <Image
                src={urlForImage(image).width(800).url()}
                alt={image.alt || `Gallery image ${index + 1}`}
                width={800}
                height={500}
                className={styles.galleryImage}
              />
              {image.alt && <p className={styles.galleryCaption}>{image.alt}</p>}
            </div>
          ))}
        </div>
      )}

      {(post.pdfFile || post.youtubeUrl) && (
        <div className={styles.attachments}>
          {ytId && (
            <div className={styles.youtubeWrapper}>
              <iframe
                src={`https://www.youtube.com/embed/${ytId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video"
              />
            </div>
          )}

          {post.pdfFile?.url && (
            <div className={styles.pdfSection}>
              <PdfPreviewNoSSR file={post.pdfFile.url} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
