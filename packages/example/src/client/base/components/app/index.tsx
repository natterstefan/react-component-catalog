import React from 'react'
import CatalogComponent from 'react-component-catalog'

import { CLIENTS } from '../../config'

const App = () => (
  <div>
    <CatalogComponent component="Title">Hello Base</CatalogComponent>
    <CatalogComponent component="Button" />
    {CLIENTS.map(client => (
      <p key={client}>
        <a href={`/${client}`}>Open {client}</a>
      </p>
    ))}
  </div>
)

export default App
