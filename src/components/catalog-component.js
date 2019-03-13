// only disabled for now, until we eg. use 'warning' (https://www.npmjs.com/package/warning)
/* eslint-disable no-console */
import React from 'react'

import useCatalog from './use-catalog'

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
const CatalogComponent = props => {
  const {
    // catalog props
    component,
    fallbackComponent: FallbackComponent,
    // other props passed to component
    ...others
  } = props

  // get catalog from the context
  const { catalog } = useCatalog() || {}

  if (!catalog || !catalog._components) {
    console.error(
      'catalog is not defined. Please use <CatalogComponent /> in the context of a <CatalogProvider /> with an existing catalog.',
    )
    return null
  }

  const Component = catalog._components[component]
  if (Component) {
    return <Component {...others} />
  }

  if (FallbackComponent) {
    return <FallbackComponent {...others} />
  }

  // if no component was found, tell the developer and fail gracefully
  console.warn(
    `No component for "${component}" was found in the component catalog. The catalog contains the following components:`,
    catalog._components && Object.keys(catalog._components),
  )

  return null
}

export default CatalogComponent
