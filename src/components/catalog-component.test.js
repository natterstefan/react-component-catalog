import React from 'react'
import { mount } from 'enzyme'

import Catalog from '../lib/catalog'
import CatalogComponent from './catalog-component'

const TestComponent = () => <div>Hello World</div>

describe('CatalogComponent', () => {
  let testCatalog
  let testContext

  beforeEach(() => {
    testCatalog = new Catalog({
      components: {
        TestComponent,
      },
    })

    testContext = {
      context: { catalog: testCatalog },
    }
  })

  it('renders a requested component fully functional', () => {
    const wrapper = mount(
      <CatalogComponent component="TestComponent" />,
      testContext,
    )

    expect(wrapper.find(TestComponent).text()).toEqual('Hello World')
  })

  it('renders a requested component with additional props', () => {
    const wrapper = mount(
      <CatalogComponent component="TestComponent" hello="world" />,
      testContext,
    )

    expect(wrapper.find(TestComponent).text()).toEqual('Hello World')
    expect(wrapper.find(TestComponent).prop('hello')).toEqual('world')
  })

  it('renders null, when the requested component does not exist', () => {
    const wrapper = mount(
      <CatalogComponent component="NotAvailableComponent" />,
      testContext,
    )

    expect(wrapper.find(CatalogComponent).html()).toBeNull()
  })

  it('renders null, when the catalog context does not exist', () => {
    const backupConsole = console.error
    console.error = () => {} // to prevent prop-types error from displaying
    const wrapper = mount(
      <CatalogComponent component="NotAvailableComponent" />,
    )

    expect(wrapper.find(CatalogComponent).html()).toBeNull()
    console.error = backupConsole
  })
})
