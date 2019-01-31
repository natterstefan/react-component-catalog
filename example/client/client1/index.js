import React from 'react'
import ReactDOM from 'react-dom'

import { CatalogProvider } from 'react-component-catalog'
import catalog, { App } from './components'

ReactDOM.render(
  <CatalogProvider catalog={catalog}>
    <App />
  </CatalogProvider>,
  document.getElementById('_root'),
)
