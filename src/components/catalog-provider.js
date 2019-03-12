import React from 'react'

import CatalogContext from './catalog-context'
import useCatalog from './use-catalog'

/**
 * Provide the catalog to an entire react component tree via context
 */
const CatalogProvider = props => {
  const { catalog = {}, children } = props
  const outerCatalog = useCatalog() || {}

  return (
    <CatalogContext.Provider
      value={{ catalog: { ...outerCatalog.catalog, ...catalog } }}
    >
      {React.Children.only(children)}
    </CatalogContext.Provider>
  )
}

export default CatalogProvider
