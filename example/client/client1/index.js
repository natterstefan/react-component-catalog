/* eslint-disable import/order */
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

import { App, catalog, innerCatalog } from './catalog'
import CatalogComponent, { CatalogProvider } from 'react-component-catalog'

/**
 * Showcase use of CatalogProvider, even nested ones that consume the previous
 * context (and merge their catalog with the outer catalog)
 *
 * NOTE: InnerComponent will throw a 404, because it is not part of catalog, but
 * of innerCatalog
 */
ReactDOM.render(
  <CatalogProvider catalog={catalog}>
    <Fragment>
      <CatalogComponent component="Title">Outer Title</CatalogComponent>
      <CatalogComponent component="InnerComponent" />
      <CatalogProvider catalog={innerCatalog}>
        <App />
      </CatalogProvider>
    </Fragment>
  </CatalogProvider>,
  document.getElementById('_root'),
)
