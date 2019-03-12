import React from 'react'

import CatalogContext from './catalog-context'

export default function useCatalog() {
  return React.useContext(CatalogContext)
}
