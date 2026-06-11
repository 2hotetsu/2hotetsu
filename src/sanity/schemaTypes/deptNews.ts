import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'deptNews',
  title: '新着情報（Department page）',
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
      name: 'images',
      title: '画像（任意・最大2枚）',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: '代替テキスト / Alt Text',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(2),
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
