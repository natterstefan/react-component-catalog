import React from 'react'
import ReactDOM from 'react-dom'
import { CatalogProvider } from 'react-component-catalog'

import App from './components/app'
import { catalog } from './catalog'

ReactDOM.render(
  <CatalogProvider<typeof catalog> catalog={catalog}>
    <App />
  </CatalogProvider>,
  document.getElementById('_root'),
)
