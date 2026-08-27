import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { researchNewsBySlugQuery, researchNewsMetaBySlugQuery } from '@/sanity/lib/queries';
import PostDetail from '@/components/PostDetail/PostDetail';
import FadeIn from '@/components/FadeIn/FadeIn';
import { notFound } from 'next/navigation';
import { localeUrl } from '@/lib/siteConfig';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await client.fetch(researchNewsMetaBySlugQuery, { slug, locale });
  if (!post) return {};

  const isJa = locale !== 'en';
  const suffix = isJa ? '| 歯科用金属アレルギー研究会' : '| Dental Metal Allergy Research Group';

  return {
    title: post.title,
    openGraph: {
      title: `${post.title} ${suffix}`,
      type: 'article',
      url: localeUrl(locale, `/allergy/research/news/${slug}`),
      ...(post.mainImage?.asset?.url && { images: [{ url: post.mainImage.asset.url }] }),
    },
    alternates: {
      canonical: localeUrl(locale, `/allergy/research/news/${slug}`),
      languages: {
        ja: localeUrl('ja', `/allergy/research/news/${slug}`),
        en: localeUrl('en', `/allergy/research/news/${slug}`),
      },
    },
  };
}

export default async function ResearchNewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Back');

  const post = await client.fetch(researchNewsBySlugQuery, { slug, locale });

  if (!post) {
    notFound();
  }

  return (
    <FadeIn>
      <PostDetail
        post={post}
        backLink={'/allergy/research/news'}
        backText={`${t('backNews')}`}
      />
    </FadeIn>
  );
}
