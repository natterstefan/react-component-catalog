import React, { ComponentType } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { isValidCatalog } from '../utils'
import { useUNSAFECatalog } from './use-catalog'

export const getDisplayName = (Component: ComponentType): string => {
  return Component.displayName || Component.name || 'Component'
}

/**
 * withCatalog will connect to the CatalogProvider (Context) and pass the
 * current catalog to the Component
 *
 * inspired by:
 * - https://github.com/styled-components/styled-components/blob/df2c947e0a2a61e739b391cd8a47a787a56f6f5b/packages/styled-components/src/hoc/withTheme.js
 */
export const withCatalog = (Component: ComponentType<any>) => {
  const WithCatalog = React.forwardRef((props: any, ref) => {
    const catalog = useUNSAFECatalog()

    if (!isValidCatalog(catalog)) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.error(
          '[withCatalog] You are not using withCatalog in the context of a CatalogProvider with a proper catalog.',
        )
      }
      // return null
    }

    return <Component {...props} catalog={catalog} ref={ref} />
  })

  WithCatalog.displayName = `WithCatalog(${getDisplayName(Component)})`

  hoistNonReactStatics(WithCatalog, Component, undefined)

  return WithCatalog
}

export default withCatalog
