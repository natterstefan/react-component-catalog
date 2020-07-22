import React, { FunctionComponent } from 'react'
import CatalogComponent, { useCatalog } from 'react-component-catalog'

import { catalog as outerCatalog, innerCatalog } from '../../catalog'

type Catalog = typeof innerCatalog & typeof outerCatalog

const FallbackComponent: FunctionComponent = () => (
  <div>Component not found</div>
)

const App: FunctionComponent = () => {
  const catalog = useCatalog<Catalog>()
  const hasButton = catalog.hasComponent('Button')

  let Button
  if (hasButton) {
    Button = catalog.getComponent('Button')
    // this would work too:
    // const Button = catalog.getComponent(['Button'])
  }

  // or you use them with the <CatalogComponent /> component
  return (
    <div>
      <CatalogComponent component="Title">Hello Client1</CatalogComponent>
      <CatalogComponent component="Card" fallbackComponent={FallbackComponent}>
        Hello Card
      </CatalogComponent>
      {Button && <Button />}
      <p>
        <a href="/">Open Base</a>
      </p>
    </div>
  )
}

export default App
