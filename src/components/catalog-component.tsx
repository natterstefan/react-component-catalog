// only disabled for now, until we eg. use 'warning' (https://www.npmjs.com/package/warning)
/* eslint-disable no-console */
import React, { ReactNode, ComponentType, ComponentPropsWithRef } from 'react'

import useCatalog from './use-catalog'

interface IProps {
  children?: ReactNode
  component: string
  fallbackComponent?: ComponentType<ComponentPropsWithRef<any>>
  // any other component property is just taken as is
  [property: string]: any
}

/**
 * `CatalogComponent` is wrapped `withCatalog` by default and is capable of
 *
 * - rendering requested component from the catalog
 * - passing props to the requested component
 * - render a fallback component when `props.fallback` (node) is defined
 * - returns null (does not throw an error) when component does not exist in
 *   the catalog
 *
 * Example:
 * ```jsx
 * <CatalogComponent component="Button" hello="world" fallback={() => <div>not found</div>} />
 * ```
 *
 * `CatalogComponent` will now render the `<Button />` component (if it is part
 * of the catalog and pass `hello` as a prop to the Button). If the component
 * would not exist it will render the fallback.
 */
const CatalogComponent = React.forwardRef((props: IProps, ref) => {
  const {
    // catalog props
    component,
    fallbackComponent,
    // other props passed to component
    ...others
  } = props

  // get catalog from the context
  const { catalog } = useCatalog() || {}
  if (!catalog || !catalog._components) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    if (__DEV__) {
      console.error(
        'catalog is not defined. Please, use <CatalogComponent /> in the context of a <CatalogProvider /> with an existing catalog.',
      )
    }
    return null
  }

  const Component = catalog.getComponent(component)
  if (Component) {
    return <Component {...others} ref={ref} />
  }

  if (fallbackComponent) {
    let FallbackComponent = null

    if (typeof fallbackComponent === 'string') {
      FallbackComponent = catalog.getComponent(fallbackComponent)
    } else {
      FallbackComponent = fallbackComponent
    }

    if (FallbackComponent) {
      return <FallbackComponent {...others} ref={ref} />
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  if (__DEV__) {
    // if no component was found, warn the user, but only when NODE_ENV equals
    // "development"
    const isClient = typeof window !== 'undefined'
    const errorMsg = `CatalogComponent: "${component}" not found in component catalog.`

    if (isClient) {
      console.error(errorMsg, 'The catalog contains only:', catalog._components)
    } else {
      console.error(errorMsg)
    }
  }

  return null
})

CatalogComponent.displayName = 'CatalogComponent'

export default CatalogComponent