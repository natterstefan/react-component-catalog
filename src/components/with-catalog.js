import React from 'react'
import PropTypes from 'prop-types'

export const getDisplayName = (WrappedComponent, defaultName = 'Unknown') => {
  return WrappedComponent.displayName || WrappedComponent.name || defaultName
}

const withCatalog = Child => {
  class withCatalog extends React.Component {
    static contextTypes = {
      catalog: PropTypes.object.isRequired,
    }

    static displayName = `withCatalog(${getDisplayName(
      Child,
      'withCatalogChild',
    )})`

    render() {
      return <Child {...this.props} catalog={this.context.catalog} />
    }
  }
  return withCatalog
}

export default withCatalog
