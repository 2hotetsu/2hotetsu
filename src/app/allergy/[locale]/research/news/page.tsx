import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { researchNewsQuery } from '@/sanity/lib/queries';
import PostList from '@/components/PostList/PostList';
import FadeIn from '@/components/FadeIn/FadeIn';

export default async function ResearchNewsListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('ResearchPage');

  const news = await client.fetch(researchNewsQuery, { locale });

  return (
    <FadeIn>
      <PostList 
        title={t('newsTitle')} 
        items={news} 
        basePath={`/allergy/${locale}/research/news`}
      />
    </FadeIn>
  );
}
