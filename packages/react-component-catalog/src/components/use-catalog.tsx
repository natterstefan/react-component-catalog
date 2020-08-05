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
export const useCatalog = <T extends {} = CatalogComponents>(): ICatalog<
  T
> | null => {
  const catalog = React.useContext<ICatalog<T>>(CatalogContext)

  if (!isValidCatalog(catalog)) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error(
        '[useCatalog] You are not using useCatalog in the context of a CatalogProvider with a proper catalog.',
      )
    }
    return null
  }

  return catalog
}

/**
 * ATTENTION: only use _internally_, do not export for users of this lib!
 *
 * We do not use `CatalogComponents` here, because this hook is used when the
 * types of the `ICatalog` components are not relevant.
 */
export const useUNSAFECatalog = <T extends {}>(): ICatalog<T> | undefined =>
  React.useContext(CatalogContext)
