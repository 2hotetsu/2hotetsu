import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { postsQuery } from '@/sanity/lib/queries';
import PostList from '@/components/PostList/PostList';
import FadeIn from '@/components/FadeIn/FadeIn';

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
