/* eslint-disable import/order */
import React, { FunctionComponent } from 'react'

import App from './components/app'

// base components (or from other clients if you like)
import Button from '../base/components/button'
/**
 * client specific components
 *
 * eg. Title: exists also in the base component, but client wants to have a
 * custom implementation
 */
const OuterTitle: FunctionComponent = ({ children }) => (
  <h2>OuterTitle - {children}</h2>
)

const OuterComponent: FunctionComponent = () => <div>OuterComponent</div>

const InnerComponent: FunctionComponent = () => <div>InnerComponent</div>

// inner CatalogProvider overwrites Title
const InnerTitle: FunctionComponent = ({ children }) => (
  <h2>InnerTitle - {children}</h2>
)

const catalog = {
  App,
  Button,
  OuterComponent,
  Title: OuterTitle,
}

// used in a nested CatalogProvider
const innerCatalog = {
  InnerComponent,
  Title: InnerTitle,
}

export { App, catalog, innerCatalog }
