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
 * inspired by:
 * - https://github.com/styled-components/styled-components/blob/df2c947e0a2a61e739b391cd8a47a787a56f6f5b/packages/styled-components/src/hoc/withTheme.js
 */
export const withCatalog = Component => {
  const WithCatalog = React.forwardRef((props, ref) => {
    const catalog = useCatalog()

    return (
      <Component {...props} catalog={catalog && catalog.catalog} ref={ref} />
    )
  })

  WithCatalog.displayName = `WithCatalog(${getDisplayName(Component)})`

  hoistNonReactStatics(WithCatalog, Component)

  return WithCatalog
}

export default withCatalog
