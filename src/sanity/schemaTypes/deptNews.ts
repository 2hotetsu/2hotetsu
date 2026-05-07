import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'deptNews',
  title: '新着情報（学科）',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: '日付',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: '内容',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'リンク先URL（任意）',
      type: 'url',
    }),
  ],
  orderings: [
    {
      title: '日付（新しい順）',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'body',
      subtitle: 'date',
    },
  },
})
