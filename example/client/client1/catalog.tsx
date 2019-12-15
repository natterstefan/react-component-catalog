/* eslint-disable import/order */
import React from 'react'
import { Catalog } from 'react-component-catalog'

import App from './components/app'

// base components (or from other clients if you like)
import Button from '../base/components/button'
/**
 * client specific components
 *
 * eg. Title: exists also in the base component, but client wants to have a
 * custom implementation
 */
const Title = ({ children }) => <h2>OuterTitle - {children}</h2>

const catalog = new Catalog({
  components: {
    App,
    Button,
    OuterComponent: () => <div>OuterComponent</div>,
    Title,
  },
})

// used in a nested CatalogProvider
const innerCatalog = new Catalog({
  components: {
    InnerComponent: () => <div>InnerComponent</div>,
    Title: ({ children }) => <h2>InnerTitle - {children}</h2>, // inner CatalogProvider overwrites Title
  },
})

export { App, catalog, innerCatalog }
