import React, { Component } from 'react'
import CatalogComponent, { withCatalog } from 'react-component-catalog'

let Button

class App extends Component {
  constructor(props) {
    super(props)

    // you can import and use registered components with catalog.getComponent
    const { catalog } = props
    Button = catalog.getComponent('Button')
  }

  render() {
    // or you use them with the <CatalogComponent /> component
    return (
      <div>
        <CatalogComponent name="Title">Hello Client1</CatalogComponent>
        <Button />
      </div>
    )
  }
}

export default withCatalog(App)
