import React from 'react'

import { ICatalogContext } from '../catalog'

import CatalogContext from './catalog-context'

/**
 * `useCatalog` (react-hook) returns a `catalog` provided to `CatalogProvider`
 */
const useCatalog = (): ICatalogContext => {
  return React.useContext(CatalogContext)
}

export default useCatalog
