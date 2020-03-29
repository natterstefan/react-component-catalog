import React from 'react'

import { ICatalog } from '../catalog'
import { CatalogComponents } from '../types'

import CatalogContext from './catalog-context'

/**
 * `useCatalog` (react-hook) returns the `catalog` provided to `CatalogProvider`
 */
const useCatalog = <
  T extends CatalogComponents = CatalogComponents
>(): ICatalog<T> => React.useContext(CatalogContext as any)

export default useCatalog
