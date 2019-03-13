import React from 'react'

import Catalog from '../lib/catalog'

import CatalogContext from './catalog-context'
import useCatalog from './use-catalog'

/**
 * Provide the catalog to an entire react component tree via context
 */
const CatalogProvider = props => {
  const { catalog = {}, children } = props
  const { catalog: outerCatalog } = useCatalog() || {}

  /**
   * if an outerCatalog (from another parent CatalogProvider) exists already, we
   * are going to merge them together and create a new Catalog context object.
   *
   * Attention: the innerCatalog will overwrite the outerCatalog
   */
  let prepCatalog = catalog
  if (outerCatalog) {
    prepCatalog = new Catalog({
      components: {
        ...(outerCatalog && outerCatalog._components),
        ...(catalog && catalog._components),
      },
    })
  }

  return (
    <CatalogContext.Provider value={{ catalog: prepCatalog }}>
      {React.Children.only(children)}
    </CatalogContext.Provider>
  )
}

export default CatalogProvider
