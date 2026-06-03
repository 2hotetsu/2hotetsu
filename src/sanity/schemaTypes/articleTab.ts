import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'articleTab',
  title: 'コラム (Allergy page)',
  type: 'document',
  orderings: [
    {
      title: '表示順',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: '内部管理用タイトル',
      type: 'string',
      description: '日本語のタブ名と同じにしてください',
    }),
    defineField({
      name: 'title_ja',
      title: 'タブ名 (日本語)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title_en',
      title: 'Tab Label (English)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: '表示順',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1),
    }),
    defineField({
      name: 'contentTitle_ja',
      title: '本文タイトル (日本語)',
      type: 'string',
    }),
    defineField({
      name: 'contentTitle_en',
      title: 'Content Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'body_ja',
      title: '本文 (日本語)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'body_en',
      title: 'Body (English)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'images',
      title: '画像 (日英共通)',
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
    }),
  ],
})
