import React from 'react'
import { mount } from 'enzyme'

import Catalog from '../lib/catalog'

import CatalogProvider from './catalog-provider'
import CatalogComponent from './catalog-component'
import useCatalog from './use-catalog'

const TestComponent = () => <div>Hello World</div>

describe('CatalogProvider', () => {
  let backupConsole
  let testCatalog
  const verifyCatalog = jest.fn()

  beforeEach(() => {
    testCatalog = new Catalog({
      components: {
        TestComponent,
      },
    })

    backupConsole = console.error
    console.error = jest.fn()
    verifyCatalog.mockReset()
  })

  afterEach(() => {
    console.error = backupConsole
  })

  it('provides an empty catalog context if not rendered with one', () => {
    const Consumer = () => {
      const catalog = useCatalog()
      verifyCatalog(catalog)

      return <div>Catalog</div>
    }

    mount(
      <CatalogProvider>
        <Consumer />
      </CatalogProvider>,
    )

    expect(verifyCatalog).toHaveBeenCalledWith({ catalog: {} })
  })

  it('provides the catalog context to consumers of the context', () => {
    const Consumer = () => {
      const catalog = useCatalog()
      verifyCatalog(catalog)

      return <div>Catalog</div>
    }

    mount(
      <CatalogProvider catalog={testCatalog}>
        <Consumer />
      </CatalogProvider>,
    )

    expect(verifyCatalog).toHaveBeenCalledWith({
      catalog: {
        _catalog: {
          components: {
            TestComponent,
          },
        },
        _components: {
          TestComponent,
        },
      },
    })
  })

  it('enables CatalogComponents to render Components from the catalog', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="TestComponent" hello="world" />
      </CatalogProvider>,
    )

    expect(wrapper.find(TestComponent).prop('hello')).toStrictEqual('world')
    expect(wrapper.find(TestComponent).text()).toStrictEqual('Hello World')
  })
})
