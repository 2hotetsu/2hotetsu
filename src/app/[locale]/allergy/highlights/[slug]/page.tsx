import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { highlightBySlugQuery, highlightMetaBySlugQuery } from '@/sanity/lib/queries';
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
  const post = await client.fetch(highlightMetaBySlugQuery, { slug, locale });
  if (!post) return {};

  const isJa = locale !== 'en';
  const suffix = isJa ? '| 歯科用金属アレルギー外来' : '| Dental Metal Allergy Clinic';

  return {
    title: post.title,
    openGraph: {
      title: `${post.title} ${suffix}`,
      type: 'article',
      url: `${SITE_URL}/allergy/${locale}/highlights/${slug}`,
      ...(post.mainImage?.asset?.url && { images: [{ url: post.mainImage.asset.url }] }),
    },
    alternates: {
      canonical: `${SITE_URL}/allergy/${locale}/highlights/${slug}`,
      languages: {
        ja: `${SITE_URL}/allergy/ja/highlights/${slug}`,
        en: `${SITE_URL}/allergy/en/highlights/${slug}`,
      },
    },
  };
}

export default async function HighlightDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Back');

  const post = await client.fetch(highlightBySlugQuery, { slug, locale });

  if (!post) {
    notFound();
  }

  return (
    <FadeIn>
      <PostDetail
        post={post}
        backLink={`/allergy/${locale}/highlights`}
        backText={`${t("backHighlights")}`}
      />
    </FadeIn>
  );
}
