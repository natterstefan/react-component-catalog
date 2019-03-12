/* eslint-disable import/order */
import React from 'react'
import ReactDOM from 'react-dom'

import catalog, { App } from './catalog'
import { CatalogProvider } from 'react-component-catalog'

/**
 * Showcase use of CatalogProvider, even nested ones that consume the previous
 * context (and merge their catalog with the outer catalog)
 */
ReactDOM.render(
  <CatalogProvider catalog={catalog}>
    <CatalogProvider>
      <App />
    </CatalogProvider>
  </CatalogProvider>,
  document.getElementById('_root'),
)
