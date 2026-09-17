import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'achievement',
  title: '業績（Department page）',
  type: 'document',
  // New publications are added here instead of by editing
  // src/data/dept/achievements.html, which stays as the frozen archive. The
  // page prepends these entries to the 学術論文 list, so the newest work shows
  // first without a deploy.
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
