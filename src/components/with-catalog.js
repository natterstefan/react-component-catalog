import React from 'react'
import { CatalogConsumer } from './catalog-provider'

export const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

/**
 * withCatalog will connect to the CatalogProvider (Context) and pass the
 * current catalog to the WrappedComponent
 */
const withCatalog = WrappedComponent => {
  class WithCatalog extends React.Component {
    static displayName = `WithCatalog(${getDisplayName(WrappedComponent)})`

    render() {
      return (
        <CatalogConsumer>
          {context => (
            <WrappedComponent
              {...this.props}
              catalog={context && context.catalog}
            />
          )}
        </CatalogConsumer>
      )
    }
  }
  return WithCatalog
}

export default withCatalog
