import React from 'react'
import ReactDOM from 'react-dom'
import CatalogComponent, { CatalogProvider } from 'react-component-catalog'

import App from './components/app'
import { catalog, innerCatalog } from './catalog'

/**
 * Showcase use of CatalogProvider, even nested ones that consume the previous
 * context (and merge their catalog with the outer catalog)
 *
 * NOTE: InnerComponent will throw a 404, because it is not part of catalog, but
 * of innerCatalog
 *
 * ATTENTION: `as any` is only required, because we use two (nested)
 * CatalogProvider. When only one is used typing `CatalogComponents` is
 * sufficient.
 */
ReactDOM.render(
  <CatalogProvider<typeof catalog> catalog={catalog}>
    <>
      <CatalogComponent component="Title">Outer Title</CatalogComponent>
      <CatalogComponent component="InnerComponent" />
      <CatalogProvider<typeof innerCatalog> catalog={innerCatalog}>
        <App />
      </CatalogProvider>
    </>
  </CatalogProvider>,
  document.getElementById('_root'),
)
