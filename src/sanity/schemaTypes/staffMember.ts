import { defineField, defineType } from 'sanity'

// One person on the staff page. Which section they appear in, and in what
// order, is not stored here: it is set on the スタッフページ document (see
// staffPage.ts), where members are dragged into place. A member that no
// section lists is kept but not shown — the Studio sidebar lists those under
// 未掲載のスタッフ.
export default defineType({
  name: 'staffMember',
  title: 'スタッフ（Department page）',
  type: 'document',
  fields: [
    defineField({
      name: 'name_ja',
      title: '氏名（日本語）',
      type: 'string',
      description: '姓と名の間に半角スペース（例：松香 芳三）',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name_en',
      title: 'Name (English)',
      type: 'string',
      description: 'Given name first (e.g. Yoshizo Matsuka). 空欄の場合は日本語名を表示',
    }),
    defineField({
      name: 'photo',
      title: '写真',
      type: 'image',
      description: '正方形に切り抜いて表示されます。ホットスポットで顔の位置を指定してください',
      options: { hotspot: true },
    }),
    defineField({
      name: 'note_ja',
      title: '補足（日本語）',
      type: 'text',
      rows: 2,
      description: '資格の上に表示する一行（例：前所属）。通常は空欄',
    }),
    defineField({
      name: 'note_en',
      title: 'Note (English)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'qualifications',
      title: '資格・専門分野',
      type: 'array',
      description: '表示順に並べてください。一覧にない項目は「Create new」で追加できます',
      of: [{ type: 'reference', to: [{ type: 'staffQualification' }] }],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'email',
      title: 'メールアドレス',
      type: 'string',
      description: '通常の「@」で入力してください。ページ上では全角「＠」で表示されます',
      validation: (Rule) =>
        Rule.custom((value) =>
          !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? true
            : 'メールアドレスの形式が正しくありません'
        ),
    }),
  ],
  orderings: [
    {
      title: '氏名順',
      name: 'nameAsc',
      by: [{ field: 'name_ja', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name_ja', subtitle: 'name_en', media: 'photo' },
  },
})
