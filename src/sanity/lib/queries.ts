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

// Publications added through the Studio; the page prepends them to the frozen
// archive in src/data/dept/achievements.html
export const achievementsQuery = groq`
  *[_type == "achievement"] | order(_createdAt desc) {
    _id,
    title
  }
`

// Get the latest department news entries (used on the dept home page and topics page)
export const deptNewsQuery = groq`
  *[_type == "deptNews"] | order(date desc)[0...$limit] {
    _id,
    date,
    body,
    images[] {
      asset->{ _id, url, metadata { dimensions } },
      crop,
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

// The staff page: its sections in page order, each with its members in
// display order. English fields fall back to Japanese when left empty.
// `members[]->` yields null for a reference to a member that was never
// published, so those are filtered out before rendering.
export const staffPageQuery = groq`
  *[_id == "staffPage"][0].sections[] {
    _key,
    "title": coalesce(select($locale == "en" => title_en), title_ja),
    "en": title_en,
    anchor,
    "members": members[]-> {
      _id,
      "name": coalesce(select($locale == "en" => name_en), name_ja),
      photo,
      "note": coalesce(select($locale == "en" => note_en), note_ja),
      "specialties": qualifications[]->{
        "label": coalesce(select($locale == "en" => en), ja)
      }.label,
      email
    }
  }
`
