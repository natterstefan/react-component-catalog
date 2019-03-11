import React, { Component } from 'react'
import CatalogComponent, { withCatalog } from 'react-component-catalog'

class App extends Component {
  constructor(props) {
    super(props)

    // you can import and use registered components with catalog.getComponent
    const { catalog } = props
    this.Button = catalog.getComponent('Button')
  }

  render() {
    const Button = this.Button
    // or you use them with the <CatalogComponent /> component
    return (
      <div>
        <CatalogComponent component="Title">Hello Client1</CatalogComponent>
        <CatalogComponent
          component="Card"
          fallbackComponent={() => <div>Component not found</div>}
        >
          Hello 404
        </CatalogComponent>
        <Button />
        <p>
          <a href="/">Open Base</a>
        </p>
      </div>
    )
  }
}

export default withCatalog(App)
