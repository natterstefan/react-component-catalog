/* eslint-disable import/order */
import React from 'react'
import CatalogComponent, { useCatalog } from 'react-component-catalog'

const App = () => {
  const { catalog } = useCatalog()
  const Button = catalog && catalog._components && catalog._components.Button

  // or you use them with the <CatalogComponent /> component
  return (
    <div>
      <CatalogComponent component="Title">Hello Client1</CatalogComponent>
      <CatalogComponent
        component="Card"
        fallbackComponent={() => <div>Component not found</div>}
      >
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
