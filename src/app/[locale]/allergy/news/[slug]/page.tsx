import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { postBySlugQuery, postMetaBySlugQuery } from '@/sanity/lib/queries';
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
  const post = await client.fetch(postMetaBySlugQuery, { slug, locale });
  if (!post) return {};

  const isJa = locale !== 'en';
  const suffix = isJa ? '| 歯科用金属アレルギー外来' : '| Dental Metal Allergy Clinic';

  return {
    title: post.title,
    openGraph: {
      title: `${post.title} ${suffix}`,
      type: 'article',
      url: localeUrl(locale, `/allergy/news/${slug}`),
      ...(post.mainImage?.asset?.url && { images: [{ url: post.mainImage.asset.url }] }),
    },
    alternates: {
      canonical: localeUrl(locale, `/allergy/news/${slug}`),
      languages: {
        ja: localeUrl('ja', `/allergy/news/${slug}`),
        en: localeUrl('en', `/allergy/news/${slug}`),
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
        backLink={'/allergy/news'}
        backText={`${t("backNews")} `}
      />
    </FadeIn>
  );
}
