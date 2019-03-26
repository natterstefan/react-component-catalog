import React from 'react'

import Catalog from '../lib/catalog'

import CatalogContext from './catalog-context'
import useCatalog from './use-catalog'

/**
 * Provide the catalog to an entire react component tree via context
 */
const CatalogProvider = props => {
  const { catalog = {}, catalogPrefix = '', children } = props
  const { catalog: outerCatalog } = useCatalog() || {}

  let prefixedCatalog = null
  if (catalogPrefix && catalog._components) {
    const components = {}

    // eslint-disable-next-line
    Object.keys(catalog._components).map(c => {
      components[`${catalogPrefix}${c}`] = catalog._components[c]
    })

    prefixedCatalog = new Catalog({
      components,
    })
  }

  /**
   * if an outerCatalog (from another parent CatalogProvider) exists already, we
   * are going to merge them together and create a new Catalog context object.
   *
   * Attention: the innerCatalog will overwrite the outerCatalog
   *
   * either append the prefixed catalog, or the provided one
   */
  let prepCatalog = prefixedCatalog || catalog
  if (outerCatalog) {
    prepCatalog = new Catalog({
      components: {
        ...(outerCatalog && outerCatalog._components),
        ...(prepCatalog && prepCatalog._components),
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
