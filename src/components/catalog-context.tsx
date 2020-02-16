import React from 'react'

import { ICatalog } from '../catalog'
import { CatalogComponents } from '../types'

const CatalogContext = React.createContext<ICatalog<CatalogComponents>>(null)

export default CatalogContext
