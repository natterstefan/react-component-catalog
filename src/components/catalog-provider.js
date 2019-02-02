import React, { createContext, Component } from 'react'

export const CatalogContext = createContext()
export const CatalogConsumer = CatalogContext.Consumer

/**
 * Provide the catalog to an entire react component tree via context
 */
export class CatalogProvider extends Component {
  render() {
    const { catalog = {}, children } = this.props

    return (
      <CatalogContext.Provider value={{ catalog }}>
        {React.Children.only(children)}
      </CatalogContext.Provider>
    )
  }
}

export default CatalogProvider
