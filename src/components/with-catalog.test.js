import React from 'react'
import { mount } from 'enzyme'

import Catalog from '../lib/catalog'

import CatalogProvider from './catalog-provider'
import { getDisplayName, withCatalog } from './with-catalog'

const TestComponent = withCatalog(() => <div>Hello World</div>)

const TestButton = () => <button type="button">Hello</button>
const TestButtonComponent = withCatalog(TestButton)

describe('withCatalog', () => {
  let testCatalog

  beforeEach(() => {
    testCatalog = new Catalog({
      components: {
        TestComponent,
        TestButtonComponent,
      },
    })
  })

  it('has a proper default displayName for easier debugging etc.', () => {
    expect(TestComponent.displayName).toStrictEqual('WithCatalog(Component)')
  })

  it('has a proper displayName for react components for easier debugging etc.', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <TestButtonComponent />
      </CatalogProvider>,
    )

    const elem = wrapper.find(TestButtonComponent)
    expect(elem.name()).toStrictEqual('WithCatalog(TestButton)')
  })

  it('renders a wrapped functional component properly', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <TestComponent hello="world" />
      </CatalogProvider>,
    )

    // and the component itself
    expect(wrapper.find(TestComponent).prop('hello')).toStrictEqual('world')
    expect(wrapper.find(TestComponent).text()).toStrictEqual('Hello World')
  })

  it('renders a wrapped functional component properly, when no catalog is provided', () => {
    const wrapper = mount(
      <CatalogProvider>
        <TestComponent hello="world" />
      </CatalogProvider>,
    )

    // and the component itself
    expect(wrapper.find(TestComponent).prop('catalog')).toBeUndefined()
    expect(wrapper.find(TestComponent).text()).toStrictEqual('Hello World')
  })
})

describe('getDisplayName', () => {
  it('returns the components displayName', () => {
    const TestComp = () => {}
    TestComp.displayName = 'TestComp'

    expect(getDisplayName(TestComp)).toStrictEqual('TestComp')
  })

  it('returns the components name if displayName is not present', () => {
    const TestComp = () => {}
    TestComp.displayName = null

    expect(getDisplayName(TestComp)).toStrictEqual('TestComp')
  })

  it('returns Component for an anonymous function component', () => {
    expect(getDisplayName(() => {})).toStrictEqual('Component')
  })
})
