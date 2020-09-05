import React, { FunctionComponent, ReactNode } from 'react'
import CatalogComponent, { CatalogComponents } from 'react-component-catalog'

import { CLIENTS } from '../../config'

const App: FunctionComponent = () => (
  <div>
    <CatalogComponent<CatalogComponents> component="Title">
      Hello Base
    </CatalogComponent>
    <CatalogComponent component="Title">Hello Base 2</CatalogComponent>
    <CatalogComponent<{ Test: ReactNode }> component="Test" />
    {CLIENTS.map(client => (
      <p key={client}>
        <a href={`/${client}`}>Open {client}</a>
      </p>
    ))}
  </div>
)

export default App
