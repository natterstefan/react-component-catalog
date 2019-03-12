import React from 'react'
import ReactDOM from 'react-dom'
import { CatalogProvider } from 'react-component-catalog'

import catalog, { App } from './catalog'

ReactDOM.render(
  <CatalogProvider catalog={catalog}>
    <App />
  </CatalogProvider>,
  document.getElementById('_root'),
)
