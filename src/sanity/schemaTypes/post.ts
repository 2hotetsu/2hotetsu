import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: '活動報告 (Allergy main page)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '内部管理用タイトル (Internal Title)',
      type: 'string',
      description: '日本語のタイトルと同じにしてください',
    }),
    defineField({
      name: 'title_ja',
      title: 'タイトル (日本語)',
      type: 'string',
    }),
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      description: '「生成」ボタンを押してください',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: () => {
          const date = new Date()
          const randomString = Math.random().toString(36).substring(2, 8)
          return `post-${date.toISOString().slice(0, 10)}-${randomString}`
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: '公開日',
      type: 'datetime',
    }),
    defineField({
      name: 'mainImage',
      title: 'メイン画像',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'ギャラリー',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: '代替テキスト',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDFファイル',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
    }),
    defineField({
      name: 'body',
      title: "Don't write here",
      type: 'array',
      of: [{ type: 'block' }],
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
  ],
})

