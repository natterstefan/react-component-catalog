import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { CatalogConsumer } from './catalog-provider'

export const getDisplayName = Component => {
  return Component.displayName || Component.name || 'Component'
}

/**
 * withCatalog will connect to the CatalogProvider (Context) and pass the
 * current catalog to the Component
 */
export const withCatalog = Component => {
  class WithCatalog extends React.Component {
    static displayName = `WithCatalog(${getDisplayName(Component)})`

    render() {
      return (
        <CatalogConsumer>
          {context => (
            <Component {...this.props} catalog={context && context.catalog} />
          )}
        </CatalogConsumer>
      )
    }
  }

  hoistNonReactStatics(WithCatalog, Component)

  return WithCatalog
}

export default withCatalog
