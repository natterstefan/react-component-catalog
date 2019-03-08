import React from 'react'
import withCatalog from './with-catalog'

/**
 * CatalogComponent is wrapped withCatalog by default and is capable of
 *
 * - rendering requested component from the catalog
 * - passing props to the requested component
 * - render a fallback component when `props.fallback` (node) is defined
 * - returns null (does not throw an error) when component does not exist in
 *   the catalog
 *
 * Example:
 *
 * <CatalogComponent component="Button" hello="world" fallback={() => <div>not found</div>} />
 *
 * CatalogComponent will now render the `<Button />` component (if it is part of
 * the catalog and pass `hello` as a prop to the Button). If the component would
 * not exist it will render the fallback.
 */
export class CatalogComponent extends React.Component {
  render() {
    const {
      // catalog props
      catalog,
      component,
      fallback: Fallback,
      // other props passed to component
      ...others
    } = this.props

    if (!catalog || !catalog.getComponent) {
      throw new ReferenceError(
        'catalog is not defined. Please use <CatalogComponent /> in the context of a <CatalogProvider />',
      )
    }

    const Component = catalog.getComponent(component)
    if (Component) {
      return <Component {...others} />
    }

    if (Fallback) {
      return <Fallback {...others} />
    }

    // if no component was found, tell the developer and fail gracefully
    console.warn(
      `No component for "${component}" was found in the component catalog. The catalog contains the following components:`,
      (catalog._catalog && catalog._catalog.components) || [],
    )

    return null
  }
}

export default withCatalog(CatalogComponent)
