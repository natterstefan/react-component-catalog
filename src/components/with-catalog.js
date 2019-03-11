import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import CatalogContext from './catalog-context'

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
  const WithCatalog = props => (
    <CatalogContext.Consumer>
      {context => <Component {...props} catalog={context && context.catalog} />}
    </CatalogContext.Consumer>
  )

  WithCatalog.displayName = `WithCatalog(${getDisplayName(Component)})`

  hoistNonReactStatics(WithCatalog, Component)

  return WithCatalog
}

export default withCatalog
