import { setRequestLocale, getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';
import { highlightBySlugQuery } from '@/sanity/lib/queries';
import PostDetail from '@/components/PostDetail/PostDetail';
import FadeIn from '@/components/FadeIn/FadeIn';
import { notFound } from 'next/navigation';

export default async function HighlightDetailPage({ 
  params 
}: { 
  params: Promise<{ locale: string, slug: string }> 
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
