import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { postsQuery } from '@/sanity/lib/queries';
import PostList from '@/components/PostList/PostList';
import FadeIn from '@/components/FadeIn/FadeIn';
import { localeUrl } from '@/lib/siteConfig';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale !== 'en';
  return {
    title: isJa ? 'お知らせ一覧' : 'News',
    description: isJa
      ? '歯科用金属アレルギー外来の活動報告・お知らせ一覧です。'
      : 'News and activity reports from the Dental Metal Allergy Clinic.',
    alternates: {
      canonical: localeUrl(locale, '/allergy/news'),
      languages: {
        ja: localeUrl('ja', '/allergy/news'),
        en: localeUrl('en', '/allergy/news'),
      },
    },
  };
}

export default async function NewsListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('News');
  const posts = await client.fetch(postsQuery, { locale });

  return (
    <FadeIn>
      <PostList
        title={`${t('newsTitle')}`}
        items={posts}
        basePath={'/allergy/news'}
      />
    </FadeIn>
  );
}
