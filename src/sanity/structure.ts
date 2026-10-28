import type { StructureBuilder, StructureResolver } from 'sanity/structure'

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
 * type left out here becomes unreachable in the sidebar.
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
              S.divider(),
              ...staffItems(S),
            ])
        ),
    ])

// Members whose id no section of the staff page references, i.e. people who
// are kept in the dataset but not shown. Both forms of each reference are
// compared, so a member with unpublished edits (id "drafts.…") is not
// mistaken for an unlisted one.
const UNLISTED_STAFF_FILTER = `_type == "staffMember"
  && !(_id in *[_type == "staffPage"].sections[].members[]._ref)
  && !(_id in *[_type == "staffPage"].sections[].members[]{"id": "drafts." + _ref}.id)`

const staffItems = (S: StructureBuilder) => [
  S.listItem()
    .id('staffPage')
    .title('スタッフページ（掲載順）')
    .child(S.document().schemaType('staffPage').documentId('staffPage')),
  S.documentTypeListItem('staffMember').title('スタッフ'),
  S.listItem()
    .id('staff-unlisted')
    .title('未掲載のスタッフ')
    .child(
      S.documentList()
        .id('staff-unlisted-list')
        .title('未掲載のスタッフ')
        .schemaType('staffMember')
        .apiVersion('2024-03-18')
        .filter(UNLISTED_STAFF_FILTER)
    ),
  S.documentTypeListItem('staffQualification').title('資格・専門分野'),
]
