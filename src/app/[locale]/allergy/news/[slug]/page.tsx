import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { postBySlugQuery, postMetaBySlugQuery } from '@/sanity/lib/queries';
import PostDetail from '@/components/PostDetail/PostDetail';
import FadeIn from '@/components/FadeIn/FadeIn';
import { notFound } from 'next/navigation';
import { SITE_URL } from '@/lib/siteConfig';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await client.fetch(postMetaBySlugQuery, { slug, locale });
  if (!post) return {};

  const isJa = locale !== 'en';
  const suffix = isJa ? '| 歯科用金属アレルギー外来' : '| Dental Metal Allergy Clinic';

  return {
    title: post.title,
    openGraph: {
      title: `${post.title} ${suffix}`,
      type: 'article',
      url: `${SITE_URL}/allergy/${locale}/news/${slug}`,
      ...(post.mainImage?.asset?.url && { images: [{ url: post.mainImage.asset.url }] }),
    },
    alternates: {
      canonical: `${SITE_URL}/allergy/${locale}/news/${slug}`,
      languages: {
        ja: `${SITE_URL}/allergy/ja/news/${slug}`,
        en: `${SITE_URL}/allergy/en/news/${slug}`,
      },
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Back');

  const post = await client.fetch(postBySlugQuery, { slug, locale });

  if (!post) {
    notFound();
  }

  return (
    <FadeIn>
      <PostDetail
        post={post}
        backLink={`/allergy/${locale}/news`}
        backText={`${t("backNews")} `}
      />
    </FadeIn>
  );
}
