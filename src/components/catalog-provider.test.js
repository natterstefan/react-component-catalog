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

  const expectedTestCatalog = {
    catalog: {
      _components: {
        TestComponent,
      },
      getComponent: expect.any(Function),
    },
  }

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

    expect(verifyCatalog).toHaveBeenCalledWith(expectedTestCatalog)
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

  it('can be nested within another CatalogProvider', () => {
    const Consumer = () => {
      const catalog = useCatalog()
      verifyCatalog(catalog)

      return <div>Catalog</div>
    }

    mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogProvider>
          <Consumer />
        </CatalogProvider>
      </CatalogProvider>,
    )

    expect(verifyCatalog).toHaveBeenCalledWith(expectedTestCatalog)
  })

  it('can be nested within another CatalogProvider, which overwrites existing components in Catalog and extends it', () => {
    const TestComponentTwo = () => <div>Different</div>
    const Title = () => <h2>Hello</h2>

    const innerCatalog = new Catalog({
      components: {
        TestComponent: TestComponentTwo,
        Title,
      },
    })

    const expected = {
      _components: {
        TestComponent: TestComponentTwo,
        Title,
      },
      getComponent: expect.any(Function),
    }

    const Consumer = () => {
      const catalog = useCatalog()
      verifyCatalog(catalog)

      return <div>Catalog</div>
    }

    mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogProvider catalog={innerCatalog}>
          <Consumer />
        </CatalogProvider>
      </CatalogProvider>,
    )

    expect(verifyCatalog).toHaveBeenCalledWith({ catalog: expected })
  })
})
