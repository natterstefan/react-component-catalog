import React from 'react'
import { mount } from 'enzyme'

import Catalog from '../lib/catalog'
import CatalogProvider from './catalog-provider'
import CatalogComponent from './catalog-component'

const TestComponent = () => <div>Hello World</div>

describe('CatalogProvider', () => {
  let testCatalog

  beforeEach(() => {
    testCatalog = new Catalog({
      components: {
        TestComponent,
      },
    })
  })

  it('provides the catalog context to consumers of the context', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="TestComponent" hello="world" />
      </CatalogProvider>,
    )

    expect(wrapper.find(CatalogComponent).instance().context).toEqual({
      catalog: testCatalog,
    })
  })

  it('enables CatalogComponents to render Components from the catalog', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="TestComponent" hello="world" />
      </CatalogProvider>,
    )

    expect(wrapper.find(TestComponent).prop('hello')).toEqual('world')
    expect(wrapper.find(TestComponent).text()).toEqual('Hello World')
  })
})
