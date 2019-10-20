import React, { ReactNode } from 'react'

import Catalog, { ICatalog } from '../catalog'

import CatalogContext from './catalog-context'
import useCatalog from './use-catalog'

// https://flow.org/en/docs/react/types/
interface IProps {
  catalog: ICatalog
  catalogPrefix?: string
  children: ReactNode
}

/**
 * Provide the `catalog` to an entire react component tree. Read more about
 * React context here: https://reactjs.org/docs/context.html
 */
const CatalogProvider = (props: IProps): JSX.Element => {
  const { catalog, catalogPrefix, children } = props
  const { catalog: outerCatalog } = useCatalog() || {}

  let prefixedCatalog: ICatalog = null
  if (catalogPrefix && catalog._components) {
    const components: { [key: string]: any } = {}

    Object.keys(catalog._components).forEach(c => {
      components[`${catalogPrefix}${c}`] = catalog._components[c]
    })

    prefixedCatalog = new Catalog({
      components,
    })
  }

  let prepCatalog =
    prefixedCatalog || catalog || new Catalog({ components: {} })

  /**
   * if an outerCatalog (from another parent CatalogProvider) exists already, we
   * are going to merge them together and create a new Catalog context object.
   *
   * Attention: the innerCatalog will overwrite the outerCatalog
   *
   * either append the prefixed catalog, or the provided one
   */
  if (outerCatalog) {
    prepCatalog = new Catalog({
      components: {
        ...(outerCatalog && outerCatalog._components),
        ...(prepCatalog && prepCatalog._components),
      },
    })
  }

  return (
    <CatalogContext.Provider value={{ catalog: prepCatalog }}>
      {React.Children.only(children)}
    </CatalogContext.Provider>
  )
}

export default CatalogProvider
