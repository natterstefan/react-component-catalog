import React from 'react'

import CatalogContext from './catalog-context'

/**
 * Provide the catalog to an entire react component tree via context
 */
const CatalogProvider = props => {
  const { catalog = {}, children } = props

  return (
    <CatalogContext.Provider value={{ catalog: { ...catalog } }}>
      {React.Children.only(children)}
    </CatalogContext.Provider>
  )
}

export default CatalogProvider
