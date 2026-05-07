import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { highlightsQuery } from '@/sanity/lib/queries';
import PostList from '@/components/PostList/PostList';
import FadeIn from '@/components/FadeIn/FadeIn';

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
        basePath={`/allergy/${locale}/highlights`}
      />
    </FadeIn>
  );
}
