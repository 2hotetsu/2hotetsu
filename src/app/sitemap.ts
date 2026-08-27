import type { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { allSlugsQuery } from '@/sanity/lib/queries';
import { localeUrl } from '@/lib/siteConfig';

export const revalidate = 86400; // regenerate once per day

const LOCALES = ['ja', 'en'] as const;

type SlugEntry = { slug: string; publishedAt?: string };
type AllSlugs = { posts: SlugEntry[]; highlights: SlugEntry[]; researchNews: SlugEntry[] };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, highlights, researchNews }: AllSlugs = await client.fetch(allSlugsQuery);

  const toDate = (s?: string) => (s ? new Date(s) : new Date());

  // department pages (Japanese at the root, English under /en)
  const DEPT_PATHS = [
    '/', '/staff', '/topics', '/clinic', '/research',
    '/education', '/recruit', '/history', '/achievements',
  ];

  const staticPages: MetadataRoute.Sitemap = [
    ...LOCALES.flatMap((locale) =>
      DEPT_PATHS.map((path) => ({
        url: localeUrl(locale, path),
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: path === '/' ? 0.9 : 0.5,
      }))
    ),
    ...LOCALES.flatMap((locale) => [
      { url: localeUrl(locale, '/allergy'), lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
      { url: localeUrl(locale, '/allergy/news'), lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
      { url: localeUrl(locale, '/allergy/highlights'), lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
      { url: localeUrl(locale, '/allergy/research'), lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
      { url: localeUrl(locale, '/allergy/research/news'), lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    ]),
  ];

  const dynamicPages: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    ...posts.map((p) => ({
      url: localeUrl(locale, `/allergy/news/${p.slug}`),
      lastModified: toDate(p.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...highlights.map((h) => ({
      url: localeUrl(locale, `/allergy/highlights/${h.slug}`),
      lastModified: toDate(h.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...researchNews.map((r) => ({
      url: localeUrl(locale, `/allergy/research/news/${r.slug}`),
      lastModified: toDate(r.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]);

  return [...staticPages, ...dynamicPages];
}
