import { groq } from 'next-sanity'

// All slugs with publish dates — used by sitemap
export const allSlugsQuery = groq`{
  "posts": *[_type == "post" && defined(slug.current)] { "slug": slug.current, publishedAt },
  "highlights": *[_type == "highlight" && defined(slug.current)] { "slug": slug.current, publishedAt },
  "researchNews": *[_type == "researchNews" && defined(slug.current)] { "slug": slug.current, publishedAt }
}`

// Lean metadata queries for generateMetadata (title only)
export const postMetaBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    "title": coalesce(select($locale == "en" => title_en, title_ja), title),
    mainImage { asset->{ url } }
  }
`

export const highlightMetaBySlugQuery = groq`
  *[_type == "highlight" && slug.current == $slug][0] {
    "title": coalesce(select($locale == "en" => title_en, title_ja), title),
    mainImage { asset->{ url } }
  }
`

export const researchNewsMetaBySlugQuery = groq`
  *[_type == "researchNews" && slug.current == $slug][0] {
    "title": coalesce(select($locale == "en" => title_en, title_ja), title),
    mainImage { asset->{ url } }
  }
`

// Get all posts, ordered by publish date
export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)]
  | order(publishedAt desc)
  {
    _id,
    "title": coalesce(select($locale == "en" => title_en, title_ja), title),
    slug,
    publishedAt,
    mainImage {
      asset->,
      alt
    },
    pdfFile { "url": asset->url },
    youtubeUrl
  }
`

// Get a single post by its slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ...,
    "title": coalesce(select($locale == "en" => title_en, title_ja), title),
    "body": coalesce(select($locale == "en" => body_en, body_ja), body),
    mainImage {
      asset->,
      alt
    },
    gallery[] {
      asset->,
      alt
    },
    pdfFile { "url": asset->url }
  }
`

// Get all highlights, ordered by publish date
export const highlightsQuery = groq`
  *[_type == "highlight" && defined(slug.current)]
  | order(publishedAt desc)
  {
    _id,
    "title": coalesce(select($locale == "en" => title_en, title_ja), title),
    slug,
    publishedAt,
    mainImage {
      asset->,
      alt
    },
    pdfFile { "url": asset->url },
    youtubeUrl
  }
`

// Get a single highlight by its slug
export const highlightBySlugQuery = groq`
  *[_type == "highlight" && slug.current == $slug][0] {
    ...,
    "title": coalesce(select($locale == "en" => title_en, title_ja), title),
    "body": coalesce(select($locale == "en" => body_en, body_ja), body),
    mainImage {
      asset->,
      alt
    },
    gallery[] {
      asset->,
      alt
    },
    pdfFile { "url": asset->url }
  }
`

// Get all research news, ordered by publish date
export const researchNewsQuery = groq`
  *[_type == "researchNews" && defined(slug.current)]
  | order(publishedAt desc)
  {
    _id,
    "title": coalesce(select($locale == "en" => title_en, title_ja), title),
    slug,
    publishedAt,
    mainImage {
      asset->,
      alt
    },
    pdfFile { "url": asset->url },
    youtubeUrl
  }
`

// Get the latest department news entries (used on the dept home page and topics page)
export const deptNewsQuery = groq`
  *[_type == "deptNews"] | order(date desc)[0...$limit] {
    _id,
    date,
    body,
    images[] {
      asset->{ url, metadata { dimensions } },
      alt
    }
  }
`

// Get all article tabs, ordered by the order field
export const articleTabsQuery = groq`
  *[_type == "articleTab"]
  | order(order asc)
  {
    _id,
    "title": coalesce(select($locale == "en" => title_en, title_ja), title_ja),
    "contentTitle": coalesce(select($locale == "en" => contentTitle_en, contentTitle_ja), contentTitle_ja),
    "body": coalesce(select($locale == "en" => body_en, body_ja), body_ja),
    images[] { asset->, alt },
  }
`

// Get a single research news by its slug
export const researchNewsBySlugQuery = groq`
  *[_type == "researchNews" && slug.current == $slug][0] {
    ...,
    "title": coalesce(select($locale == "en" => title_en, title_ja), title),
    "body": coalesce(select($locale == "en" => body_en, body_ja), body),
    mainImage {
      asset->,
      alt
    },
    gallery[] {
      asset->,
      alt
    },
    pdfFile { "url": asset->url }
  }
`
