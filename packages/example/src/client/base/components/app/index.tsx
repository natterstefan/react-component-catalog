import React, { FunctionComponent, ReactNode } from 'react'
import CatalogComponent, { CatalogComponents } from 'react-component-catalog'

import { CLIENTS } from '../../config'

const App: FunctionComponent = () => (
  <div>
    <CatalogComponent component="Title">Hello Base</CatalogComponent>
    {/* use CatalogComponents _only_ when you have augmented CatalogComponents in
     * your app! See packages/example/src/react-component-catalog.d.ts */}
    <CatalogComponent<CatalogComponents> component="Title">
      Hello Base 2
    </CatalogComponent>
    <CatalogComponent<{ Test: ReactNode }> component="Test" />
    {/* `any` is not necessary, but for the sake of completeness it is also shown. */}
    <CatalogComponent<any> component="Something" />
    {CLIENTS.map(client => (
      <p key={client}>
        <a href={`/${client}`}>Open {client}</a>
      </p>
    ))}
  </div>
)

export default App
