import { type SchemaTypeDefinition } from 'sanity'
import post from './post'
import highlight from './highlight'
import researchNews from './researchNews'
import deptNews from './deptNews'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, highlight, researchNews, deptNews],
}
