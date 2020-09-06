// only disabled for now, until we eg. use 'warning' (https://www.npmjs.com/package/warning)
/* eslint-disable no-console */
import React, {
  ComponentType,
  ComponentPropsWithRef,
  PropsWithRef,
} from 'react'

import { isValidCatalog } from '../utils'
import { CatalogComponents } from '../types'

import { useUNSAFECatalog } from './use-catalog'

const LOG_PREFIX = '[CatalogComponent]'

interface IProps<T> {
  /**
   * Path to the required component in the catalog. component can take any
   * value supported by `catalog.getComponent`.
   *
   * ### Note
   * The `CatalogComponents` interface matches last, because until its
   * augmented it matches everything.
   * @see https://stackoverflow.com/a/58512513/1238150
   */
  component: T extends Record<string, any>
    ? keyof T
    : T extends (infer R)[]
    ? R
    : T extends string
    ? string
    : T extends CatalogComponents
    ? keyof CatalogComponents
    : unknown
  /**
   * when no component is found, a fallbackComponent is rendered instead
   */
  fallbackComponent?: ComponentType<ComponentPropsWithRef<any>> | string
  /**
   * any other component property is just taken as is
   */
  [property: string]: any
}

/**
 * see comment of CatalogComponentRef, it represents the actual comment of
 * CatalogComponent
 */
const CatalogComponent = React.forwardRef<any, IProps<any>>((props, ref) => {
  const {
    // catalog props
    component,
    fallbackComponent,
    // other props passed to component
    ...others
  } = props

  /**
   * get catalog from the context
   * ATTENTION: similar to CatalogProvider, we use the internal method to access
   * the context
   */
  const catalog = useUNSAFECatalog()
  if (!isValidCatalog(catalog)) {
    if (__DEV__) {
      console.error(
        `${LOG_PREFIX} You are not using CatalogComponent in the context of a CatalogProvider with a proper catalog.`,
      )
    }
    return null
  }

  // or catalog.getComponent<ComponentType<PropsWithRef<any>>>(component)
  const Component = catalog.getComponent(component)
  if (Component) {
    return <Component {...others} ref={ref} />
  }

  if (fallbackComponent) {
    let FallbackComponent: typeof props['fallbackComponent'] = null

    if (typeof fallbackComponent === 'string') {
      FallbackComponent = catalog.getComponent(fallbackComponent)
    } else {
      FallbackComponent = fallbackComponent
    }

    if (FallbackComponent) {
      return <FallbackComponent {...others} ref={ref} />
    }
  }

  if (__DEV__) {
    // if no component was found, warn the user, but only when NODE_ENV equals
    // "development"
    const isClient = typeof window !== 'undefined'
    const errorMsg = `${LOG_PREFIX} "${String(
      component,
    )}" not found in component catalog.`

    if (isClient) {
      console.error(errorMsg, 'The catalog contains only:', catalog._catalog)
    } else {
      console.error(errorMsg)
    }
  }

  return null
})

CatalogComponent.displayName = 'CatalogComponent'

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
const CatalogComponentRef = <T extends any>({
  ref,
  ...rest
}: PropsWithRef<IProps<T>>) => <CatalogComponent {...rest} ref={ref} />

CatalogComponentRef.displayName = 'CatalogComponentRef'

/**
 * CatalogComponentRef is used to type React.forwardRef properly
 *
 * inspired by:
 * @see https://stackoverflow.com/a/58473012/1238150
 */
export default CatalogComponentRef
