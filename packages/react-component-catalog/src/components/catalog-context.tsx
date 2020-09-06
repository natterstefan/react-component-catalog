/**
 * TODO: find a way to apply an unknown generic here, similar to:
 * @see https://stackoverflow.com/questions/60725621/react-context-with-generics
 */
import React from 'react'

import { Catalog } from '../catalog'

const CatalogContext = React.createContext<Catalog<any> | undefined>(undefined)

export default CatalogContext
