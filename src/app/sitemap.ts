import type { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { allSlugsQuery } from '@/sanity/lib/queries';
import { SITE_URL } from '@/lib/siteConfig';

export const revalidate = 86400; // regenerate once per day

const LOCALES = ['ja', 'en'] as const;

type SlugEntry = { slug: string; publishedAt?: string };
type AllSlugs = { posts: SlugEntry[]; highlights: SlugEntry[]; researchNews: SlugEntry[] };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, highlights, researchNews }: AllSlugs = await client.fetch(allSlugsQuery);

  const toDate = (s?: string) => (s ? new Date(s) : new Date());

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...LOCALES.flatMap((locale) => [
      { url: `${SITE_URL}/allergy/${locale}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
      { url: `${SITE_URL}/allergy/${locale}/news`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
      { url: `${SITE_URL}/allergy/${locale}/highlights`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
      { url: `${SITE_URL}/allergy/${locale}/asmi`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
      { url: `${SITE_URL}/allergy/${locale}/asmi/news`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    ]),
  ];

  const dynamicPages: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    ...posts.map((p) => ({
      url: `${SITE_URL}/allergy/${locale}/news/${p.slug}`,
      lastModified: toDate(p.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...highlights.map((h) => ({
      url: `${SITE_URL}/allergy/${locale}/highlights/${h.slug}`,
      lastModified: toDate(h.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...researchNews.map((r) => ({
      url: `${SITE_URL}/allergy/${locale}/asmi/news/${r.slug}`,
      lastModified: toDate(r.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]);

  return [...staticPages, ...dynamicPages];
}
