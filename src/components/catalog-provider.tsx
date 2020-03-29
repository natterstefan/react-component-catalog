import React, { ReactNode } from 'react'

import Catalog, { ICatalog } from '../catalog'
import { CatalogComponents } from '../types'

import CatalogContext from './catalog-context'
import useCatalog from './use-catalog'

// https://flow.org/en/docs/react/types/
interface IProps<T extends CatalogComponents> {
  // the catalog you want to provided with the CatalogProvider
  catalog: T
  // prefix the given catalog allows nesting multiple catalogs within one app
  catalogPrefix?: string
  children: ReactNode
}

/**
 * Provide the `catalog` to an entire react component tree. Read more about
 * React context here: https://reactjs.org/docs/context.html
 */
const CatalogProvider = <T extends CatalogComponents>(
  props: IProps<T>,
): JSX.Element => {
  const { catalog, catalogPrefix, children } = props
  const outerCatalog = useCatalog()

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
  catalog: {},
} as Partial<IProps<{}>>

export default CatalogProvider
