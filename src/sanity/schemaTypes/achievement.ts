import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'achievement',
  title: '業績（Department page）',
  type: 'document',
  // The page used to split entries into 学術論文 and 科学研究費等; the second
  // section was dropped, so every entry is a paper and there is no category to
  // choose. The field was removed rather than reduced to a single option — the
  // dataset had no documents yet, so nothing was stranded by taking it out.
  fields: [
    defineField({
      name: 'title',
      title: '内容（論文の記載をそのまま入力）',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  // newest entries first, matching how the page prepends them to the archive
  orderings: [
    {
      title: '登録順（新しい順）',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title' },
  },
})
