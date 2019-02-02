import React from 'react'
import { mount } from 'enzyme'

import Catalog from '../lib/catalog'
import CatalogComponent from './catalog-component'
import CatalogProvider from './catalog-provider'

const TestComponent = () => <div>Hello World</div>

describe('CatalogComponent', () => {
  let testCatalog

  beforeEach(() => {
    testCatalog = new Catalog({
      components: {
        TestComponent,
      },
    })
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

  it('renders null, when the requested component does not exist', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="NotAvailableComponent" />
      </CatalogProvider>,
    )

    expect(wrapper.find(CatalogComponent).html()).toBeNull()
  })

  it('renders null, when the catalog context does not exist', () => {
    const wrapper = mount(
      <CatalogComponent component="NotAvailableComponent" />,
    )

    expect(wrapper.find(CatalogComponent).html()).toBeNull()
  })
})
