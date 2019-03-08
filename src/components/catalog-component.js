import React from 'react'
import withCatalog from './with-catalog'

/**
 * CatalogComponent is wrapped withCatalog by default and is capable of
 *
 * - rendering requested component from the catalog
 * - passing props to the requested component
 * - returns null (does not throw an error) when component does not exist in
 *   the catalog
 *
 * Example:
 *
 * <CatalogComponent component="Button" hello="world" />
 *
 * CatalogComponent will now render the `<Button />` component (if it is part of
 * the catalog and pass `hello` as a prop to the Button).
 */
export class CatalogComponent extends React.Component {
  render() {
    const { catalog, component, ...others } = this.props

    if (catalog && catalog.getComponent) {
      const Component = catalog.getComponent(component)

      if (Component) {
        return <Component {...others} />
      }
    }

    return null
  }
}

export default withCatalog(CatalogComponent)
