import React, { FunctionComponent } from 'react'
import CatalogComponent, { useCatalog } from 'react-component-catalog'

const FallbackComponent: FunctionComponent = () => (
  <div>Component not found</div>
)

const App: FunctionComponent = () => {
  /**
   * CatalogComponents was customized thanks to Module Augmentation.
   * @see packages/example/src/react-component-catalog.d.ts
   *
   * You can also provide a custom interface or type:
   * ```
   * const catalog = useCatalog<{ Button: FunctionComponent }>()
   * ```
   *
   * Docs:
   * @see https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
   */
  const catalog = useCatalog()
  const hasButton = catalog.hasComponent('Button')

  /**
   * The type for Button is infered and is `React.FunctionComponent<ButtonProps>`
   *
   * This would work too:
   * const Button = catalog.getComponent(['Button'])
   */
  const Button = hasButton ? catalog.getComponent('Button') : null

  // or you use them with the <CatalogComponent /> component
  return (
    <div>
      <CatalogComponent component="Title">Hello Client1</CatalogComponent>
      <CatalogComponent
        component={['Card']}
        fallbackComponent={FallbackComponent}
      >
        Hello Card
      </CatalogComponent>
      {Button && <Button text="Click Me!" />}
      <p>
        <a href="/">Open Base</a>
      </p>
    </div>
  )
}

export default App
