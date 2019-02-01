import React from 'react'
import PropTypes from 'prop-types'
import withCatalog from './with-catalog'

class CatalogComponent extends React.Component {
  static propTypes = {
    catalog: PropTypes.object.isRequired,
    component: PropTypes.string.isRequired,
  }

  render() {
    const { catalog, component, ...others } = this.props

    if (!catalog) {
      return null
    }
    const Component = catalog.getComponent(component)

    if (!Component) {
      return null
    }
    return <Component {...others} />
  }
}

export default withCatalog(CatalogComponent)
