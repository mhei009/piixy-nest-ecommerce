import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'

import { productType } from './productType'
import { orderType } from './orderType'
import { salesType } from './salesType'
import { seriesType } from './seriesType'



// acts as a "table of contents" for the schemas. When Sanity initializes, it looks at this schema object to know:

// What types of documents (like products, orders, or categories) you want to manage.
// How these types are structured.
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType,  productType, orderType, salesType, seriesType],
}
