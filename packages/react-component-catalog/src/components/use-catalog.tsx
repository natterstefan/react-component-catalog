import React from 'react'

import { ICatalog } from '../catalog'
import { CatalogComponents } from '../types'
import { isValidCatalog } from '../utils'

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
export const useCatalog = <T extends CatalogComponents>(): ICatalog<
  T
> | null => {
  const catalog = React.useContext(CatalogContext)

  if (!isValidCatalog(catalog)) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error(
        '[useCatalog] You are not using useCatalog in the context of a CatalogProvider with a proper catalog.',
      )
    }
    return null
  }

  return catalog as ICatalog<T>
}

/**
 * ATTENTION: only use internally, do not export for users of this lib!
 */
export const useUNSAFECatalog = <T extends CatalogComponents>():
  | ICatalog<T>
  | undefined => React.useContext(CatalogContext as any)
