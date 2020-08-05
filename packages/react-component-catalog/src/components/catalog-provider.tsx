import React, { ReactNode } from 'react'

import Catalog, { ICatalog } from '../catalog'
import { CatalogComponents } from '../types'

import CatalogContext from './catalog-context'
import { useUNSAFECatalog } from './use-catalog'

interface IProps<T extends {} = CatalogComponents> {
  // the catalog you want to provided with the CatalogProvider
  catalog: T
  // prefix the given catalog allows nesting multiple catalogs within one app
  catalogPrefix?: string
  /**
   * ReactNode
   * @see https://flow.org/en/docs/react/types/
   */
  children: ReactNode
}

/**
 * Provide the `catalog` to an entire react component tree. Read more about
 * React context here: https://reactjs.org/docs/context.html
 */
const CatalogProvider = <T extends {} = CatalogComponents>(
  props: IProps<T>,
): JSX.Element => {
  const { catalog, catalogPrefix, children } = props

  /**
   * ATTENTION: we cannot use `useCatalog` here, as we cannot be sure that a
   * CatalogContext exists already. This is especially true, when this is the
   * first (outer) CatalogProvider and not a nested one.
   */
  const outerCatalog = useUNSAFECatalog()

  // when no children are provided, render nothing but null
  if (!catalog) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error(
        '[CatalogProvider] must be rendered with a valid catalog property',
      )
    }
    return null
  }
  if (!children) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('[CatalogProvider] must contain at least one child')
    }
    return null
  }

  const prefixedCatalog: { [prop: string]: unknown } = {}
  if (catalog && catalogPrefix) {
    Object.keys(catalog).forEach(c => {
      const cE = c as keyof typeof catalog
      prefixedCatalog[`${catalogPrefix}${cE}`] = catalog[cE]
    })
  }

  /**
   * if an outerCatalog (from another parent CatalogProvider) exists already, we
   * are going to merge them together and create a new Catalog context object.
   *
   * Attention: the innerCatalog will overwrite the outerCatalog!
   */
  const prepCatalog = new Catalog({
    ...(outerCatalog && outerCatalog._catalog),
    // either use the prefixed or the raw catalog
    ...((catalogPrefix && prefixedCatalog) || catalog),
  }) as ICatalog<T>

  return (
    <CatalogContext.Provider value={prepCatalog}>
      {React.Children.only(children)}
    </CatalogContext.Provider>
  )
}

CatalogProvider.defaultProps = {
  catalogPrefix: '',
  catalog: undefined,
} as Partial<IProps>

export default CatalogProvider
