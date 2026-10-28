import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import highlight from './highlight'
import researchNews from './researchNews'
import deptNews from './deptNews'
import articleTab from './articleTab'
import achievement from './achievement'
import staffPage from './staffPage'
import staffMember from './staffMember'
import staffQualification from './staffQualification'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    highlight,
    researchNews,
    deptNews,
    articleTab,
    achievement,
    staffPage,
    staffMember,
    staffQualification,
  ],
}

/** Types with exactly one document, whose id equals the type name. */
export const singletonTypes = new Set(['staffPage'])
