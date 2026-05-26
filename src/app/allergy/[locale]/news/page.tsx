import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { postsQuery } from '@/sanity/lib/queries';
import PostList from '@/components/PostList/PostList';
import FadeIn from '@/components/FadeIn/FadeIn';
import { SITE_URL } from '@/lib/siteConfig';

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
      canonical: `${SITE_URL}/allergy/${locale}/news`,
      languages: {
        ja: `${SITE_URL}/allergy/ja/news`,
        en: `${SITE_URL}/allergy/en/news`,
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
        basePath={`/allergy/${locale}/news`}
      />
    </FadeIn>
  );
}
