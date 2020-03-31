/**
 * TODO: find a way to apply an unknown generic here, similar to:
 * @see https://stackoverflow.com/questions/60725621/react-context-with-generics
 */
import React from 'react'

import { ICatalog } from '../catalog'
import { CatalogComponents } from '../types'

const CatalogContext = React.createContext<
  ICatalog<CatalogComponents> | undefined
>(undefined)

export default CatalogContext
