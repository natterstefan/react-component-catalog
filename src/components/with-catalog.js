import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import useCatalog from './use-catalog'

export const getDisplayName = Component => {
  return Component.displayName || Component.name || 'Component'
}

/**
 * withCatalog will connect to the CatalogProvider (Context) and pass the
 * current catalog to the Component
 *
 * TODO: forwardRef (https://reactjs.org/docs/forwarding-refs.html#note-for-component-library-maintainers)
 */
export const withCatalog = Component => {
  const WithCatalog = props => {
    const catalog = useCatalog()
    return <Component {...props} catalog={catalog && catalog.catalog} />
  }

  WithCatalog.displayName = `WithCatalog(${getDisplayName(Component)})`

  hoistNonReactStatics(WithCatalog, Component)

  return WithCatalog
}

export default withCatalog
