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
export const useCatalog = <
  T extends Record<string, any> = CatalogComponents
>(): ICatalog<T> | null => {
  const catalog = React.useContext<ICatalog<T>>(CatalogContext)

  if (!isValidCatalog(catalog)) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error(
        '[useCatalog] You are not using useCatalog in the context of a CatalogProvider with a proper catalog.',
      )
    }

    // NOTE: evaluate if we should return an empty catalog instead, or apps must
    // always check for null too
    return null
  }

  return catalog
}

/**
 * ATTENTION: only use _internally_, do not export for users of this lib!
 *
 * We do not use `CatalogComponents` here, because this hook is used when the
 * types of the `ICatalog` components are not relevant.
 *
 * NOTE: internally we do not care about the type of T, that is why it can have
 * any object shape
 */
export const useUNSAFECatalog = <T extends Record<string, any>>():
  | ICatalog<T>
  | undefined => React.useContext(CatalogContext)
