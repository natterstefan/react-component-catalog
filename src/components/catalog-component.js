import React from 'react'
import withCatalog from './with-catalog'

class CatalogComponent extends React.Component {
  render() {
    const { catalog, name, ...others } = this.props
    const Component = catalog.getComponent(name)
    return <Component {...others} />
  }
}

export default withCatalog(CatalogComponent)
