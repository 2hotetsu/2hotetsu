import { defineCliConfig } from 'sanity/cli'

// Lets the Sanity CLI find the project when run from this folder — needed by
// `sanity exec` (scripts/seed-staff.ts) and `sanity login`. The Studio itself
// is served by Next at /studio and reads sanity.config.ts, not this file.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
})
