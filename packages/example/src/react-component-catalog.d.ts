import 'react-component-catalog'

import { catalog as outerCatalog, innerCatalog } from './client/client1/catalog'

type CustomCatalog = typeof innerCatalog & typeof outerCatalog

/**
 * Customize and extend `CatalogComponents` interface with Module Augmentation.
 * @see https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 */
declare module 'react-component-catalog' {
  export interface CatalogComponents extends CustomCatalog {}
}
