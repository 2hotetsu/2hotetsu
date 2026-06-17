import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'achievement',
  title: '業績（Department page）',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '内容（論文・研究費の記載をそのまま入力）',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '種別',
      type: 'string',
      options: {
        list: [
          { title: '学術論文', value: 'paper' },
          { title: '科学研究費等', value: 'grant' },
        ],
        layout: 'radio',
      },
      initialValue: 'paper',
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
    select: { title: 'title', category: 'category' },
    prepare({ title, category }) {
      return {
        title,
        subtitle: category === 'grant' ? '科学研究費等' : '学術論文',
      }
    },
  },
})
