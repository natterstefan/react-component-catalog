import React from 'react'

import { ICatalog } from '../catalog'
import { CatalogComponents } from '../types'

import CatalogContext from './catalog-context'

/**
 * `useCatalog` (react-hook) returns the `catalog` provided to `CatalogProvider`
 *
 * @example
 * ```
 * const catalog = useCatalog()
 * const Button = catalog.getComponent("button")
 * ```
 */
const useCatalog = <T extends CatalogComponents>(): ICatalog<T> =>
  React.useContext(CatalogContext as any)

export default useCatalog
