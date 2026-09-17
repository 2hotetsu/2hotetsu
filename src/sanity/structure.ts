import type { StructureResolver } from 'sanity/structure'

/**
 * Custom sidebar for the Studio.
 *
 * The project serves two separate sites from one dataset, so the flat list of
 * document types forced every schema title to carry a "(Allergy page)" or
 * "(Department page)" suffix to say where it belonged. Grouping them here makes
 * that explicit in the navigation instead, so the list items can use short
 * titles. The schema titles themselves are left alone — they still label the
 * type elsewhere in the Studio, such as in the create menu.
 *
 * Every document type in src/sanity/schemaTypes must appear in one of the
 * groups below: a custom structure replaces the default list entirely, so a
 * type left out here becomes unreachable in the sidebar, and one listed here
 * but missing from the schema breaks the Studio.
 *
 * Both branches now carry the same document types, so this file matches the one
 * on dev apart from the routes each branch serves.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('コンテンツ')
    .items([
      S.listItem()
        .id('allergy')
        .title('Allergy page')
        .child(
          S.list()
            .id('allergy-page')
            .title('Allergy page')
            .items([
              S.documentTypeListItem('post').title('活動報告'),
              S.documentTypeListItem('highlight').title('ハイライト'),
              S.documentTypeListItem('articleTab').title('コラム'),
              S.divider(),
              S.documentTypeListItem('researchNews').title('研究会の活動報告'),
            ])
        ),

      S.divider(),

      S.listItem()
        .id('department')
        .title('Department page')
        .child(
          S.list()
            .id('department-page')
            .title('Department page')
            .items([
              S.documentTypeListItem('deptNews').title('新着情報'),
              S.documentTypeListItem('achievement').title('業績'),
            ])
        ),
    ])
