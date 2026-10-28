import { defineField, defineType } from 'sanity'

// A qualification or field of expertise shown as a tag on a staff card
// (補綴歯科専門医, 歯科補綴学, …). Kept as its own document and referenced from
// each member, so a society's certification is typed once and its English
// wording stays identical on every card that carries it.
export default defineType({
  name: 'staffQualification',
  title: '資格・専門分野（Department page）',
  type: 'document',
  fields: [
    defineField({
      name: 'ja',
      title: '名称（日本語）',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'Name (English)',
      type: 'string',
      description: '空欄の場合、英語ページでも日本語で表示されます',
    }),
  ],
  orderings: [
    {
      title: '名称順',
      name: 'jaAsc',
      by: [{ field: 'ja', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'ja', subtitle: 'en' },
  },
})
