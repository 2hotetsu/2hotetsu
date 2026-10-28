import { defineArrayMember, defineField, defineType } from 'sanity'

// The staff page's layout: its sections (教授, 准教授, …) in page order, each
// holding its members in display order. A single document (id "staffPage"),
// opened directly from the sidebar — sanity.config.ts keeps it out of the
// create menu and removes delete/duplicate, so there is never a second one.
//
// Order lives here as array order, so both sections and members are
// rearranged by dragging instead of by typing sort numbers.
export default defineType({
  name: 'staffPage',
  title: 'スタッフページ（Department page）',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: '職位（ページの表示順）',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'staffSection',
          title: '職位',
          type: 'object',
          fields: [
            defineField({
              name: 'title_ja',
              title: '職位名（日本語）',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title_en',
              title: 'Position (English)',
              type: 'string',
              description: '日本語ページでも見出しの上に小さく表示されます',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'anchor',
              title: 'アンカーID',
              type: 'string',
              description:
                'ページ内リンク用（例：staff01）。既存の値は外部からのリンクに使われているため変更しないでください。新しい職位では空欄で構いません',
              validation: (Rule) =>
                Rule.regex(/^[a-z0-9-]+$/, { name: '半角英小文字・数字・ハイフン' }),
            }),
            defineField({
              name: 'members',
              title: 'メンバー（表示順）',
              type: 'array',
              description: 'メンバーがいない職位はページに表示されません',
              of: [{ type: 'reference', to: [{ type: 'staffMember' }] }],
              validation: (Rule) => Rule.unique(),
            }),
          ],
          preview: {
            select: { title: 'title_ja', subtitle: 'title_en', members: 'members' },
            prepare: ({ title, subtitle, members }) => ({
              title,
              subtitle: `${subtitle ?? ''} · ${members?.length ?? 0}名`,
            }),
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((sections: { anchor?: string }[] | undefined) => {
          const anchors = (sections ?? []).map((s) => s.anchor).filter(Boolean)
          return new Set(anchors).size === anchors.length
            ? true
            : 'アンカーIDが重複しています'
        }),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'スタッフページ' }),
  },
})
