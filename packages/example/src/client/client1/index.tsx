import React from 'react'
import ReactDOM from 'react-dom'
import CatalogComponent, { CatalogProvider } from 'react-component-catalog'

import { App, catalog, innerCatalog } from './catalog'

/**
 * Showcase use of CatalogProvider, even nested ones that consume the previous
 * context (and merge their catalog with the outer catalog)
 *
 * NOTE: InnerComponent will throw a 404, because it is not part of catalog, but
 * of innerCatalog
 */
ReactDOM.render(
  <CatalogProvider catalog={catalog}>
    <>
      <CatalogComponent component="Title">Outer Title</CatalogComponent>
      <CatalogComponent component="InnerComponent" />
      <CatalogProvider catalog={innerCatalog}>
        <App />
      </CatalogProvider>
    </>
  </CatalogProvider>,
  document.getElementById('_root'),
)
