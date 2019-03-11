import React from 'react'
import { mount } from 'enzyme'

import Catalog from '../lib/catalog'
import CatalogComponent from './catalog-component'
import CatalogProvider from './catalog-provider'

const TestComponent = () => <div>Hello World</div>

const FallbackComponent = () => <div>Fallback</div>

describe('CatalogComponent', () => {
  let backupError
  let backupWarn
  let testCatalog
  let emptyTestCatalog

  beforeEach(() => {
    testCatalog = new Catalog({
      components: {
        TestComponent,
      },
    })

    emptyTestCatalog = new Catalog({
      components: {},
    })

    backupError = console.error
    backupWarn = console.warn
    console.error = jest.fn()
    console.warn = jest.fn()
  })

  afterEach(() => {
    console.error = backupError
    console.warn = backupWarn
  })

  it('renders a requested component fully functional', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="TestComponent" />
      </CatalogProvider>,
    )

    expect(wrapper.find(TestComponent).text()).toEqual('Hello World')
  })

  it('renders a requested component with additional props', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="TestComponent" hello="world" />
      </CatalogProvider>,
    )

    expect(wrapper.find(TestComponent).text()).toEqual('Hello World')
    expect(wrapper.find(TestComponent).prop('hello')).toEqual('world')
  })

  it('renders the fallbackComponent, when the requested component does not exist', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent
          component="NotAvailableComponent"
          fallbackComponent={FallbackComponent}
        />
      </CatalogProvider>,
    )

    expect(wrapper.find(FallbackComponent)).toHaveLength(1)
  })

  it('renders null, when the requested component does not exist and no fallbackComponent was provided', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="NotAvailableComponent" />
      </CatalogProvider>,
    )

    expect(wrapper.find(CatalogComponent).html()).toBeNull()
  })

  it('tells the developer, when the requested component does not exist and no fallbackComponent was provided', () => {
    mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="NotAvailableComponent" />
      </CatalogProvider>,
    )

    // test if the developer was notified
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(console.warn).toHaveBeenLastCalledWith(
      'No component for "NotAvailableComponent" was found in the component catalog. The catalog contains the following components:',
      { TestComponent },
    )
  })

  it('tells the developer, when the requested component does not exist and no fallbackComponent was provided', () => {
    mount(
      <CatalogProvider catalog={emptyTestCatalog}>
        <CatalogComponent component="NotAvailableComponent" />
      </CatalogProvider>,
    )

    // test if the developer was notified
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(console.warn).toHaveBeenLastCalledWith(
      'No component for "NotAvailableComponent" was found in the component catalog. The catalog contains the following components:',
      {},
    )
  })

  it('renders null, when the catalog context does not exist', () => {
    const wrapper = mount(
      <CatalogComponent component="NotAvailableComponent" />,
    )

    expect(wrapper.find(CatalogComponent).html()).toBeNull()

    // test if the developer was notified
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenLastCalledWith(
      'catalog is not defined. Please use <CatalogComponent /> in the context of a <CatalogProvider /> with an existing catalog.',
    )
  })
})
