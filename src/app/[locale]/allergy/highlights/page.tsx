import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { highlightsQuery } from '@/sanity/lib/queries';
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
    title: isJa ? 'ハイライト' : 'Highlights',
    description: isJa
      ? '歯科用金属アレルギー外来のハイライト・注目トピックス一覧です。'
      : 'Highlights and featured topics from the Dental Metal Allergy Clinic.',
    alternates: {
      canonical: localeUrl(locale, '/allergy/highlights'),
      languages: {
        ja: localeUrl('ja', '/allergy/highlights'),
        en: localeUrl('en', '/allergy/highlights'),
      },
    },
  };
}

export default async function HighlightsListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Highlights');
  const highlights = await client.fetch(highlightsQuery, { locale });

  return (
    <FadeIn>
      <PostList
        title={`${t('highlightsTitle')}`}
        items={highlights}
        basePath={'/allergy/highlights'}
      />
    </FadeIn>
  );
}
