import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema, singletonTypes } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'
import { dataset, projectId } from './src/sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    ...schema,
    // singletons are opened from the sidebar, never created from the menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(
            ({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action ?? '')
          )
        : actions,
  },
  plugins: [
    structureTool({ structure }),
  ],
})
