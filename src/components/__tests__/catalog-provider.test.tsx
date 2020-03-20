import React from 'react'
import { mount } from 'enzyme'

import CatalogProvider from '../catalog-provider'
import CatalogComponent from '../catalog-component'
import useCatalog from '../use-catalog'

const TestComponent = () => <div>Hello World</div>

describe('CatalogProvider', () => {
  let backupConsole: () => void
  let testCatalog: {}
  const verifyCatalog = jest.fn()

  const expectedTestCatalog = {
    _catalog: {
      TestComponent,
    },
    getComponent: expect.any(Function),
    hasComponent: expect.any(Function),
  }

  const expectedEmptyCatalog = {
    _catalog: {},
    getComponent: expect.any(Function),
    hasComponent: expect.any(Function),
  }

  beforeEach(() => {
    testCatalog = { TestComponent }

    backupConsole = console.error
    console.error = jest.fn()
    verifyCatalog.mockReset()
  })

  afterEach(() => {
    console.error = backupConsole
  })

  it.each([null, undefined])(
    'provides an empty catalog context if not rendered with one',
    type => {
      const Consumer = () => {
        const catalog = useCatalog()
        verifyCatalog(catalog)

        return <div>Catalog</div>
      }

      mount(
        <CatalogProvider catalog={type}>
          <Consumer />
        </CatalogProvider>,
      )

      expect(verifyCatalog).toHaveBeenCalledWith(expectedEmptyCatalog)
    },
  )

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
        <CatalogProvider catalog={null}>
          <Consumer />
        </CatalogProvider>
      </CatalogProvider>,
    )

    expect(verifyCatalog).toHaveBeenCalledWith(expectedTestCatalog)
  })

  it('can be nested within another CatalogProvider, which overwrites existing components in Catalog and extends it', () => {
    const TestComponentTwo = () => <div>Different</div>
    const Title = () => <h2>Hello</h2>

    const innerCatalog = {
      TestComponent: TestComponentTwo,
      Title,
    }

    const expected = {
      _catalog: {
        TestComponent: TestComponentTwo,
        Title,
      },
      getComponent: expect.any(Function),
      hasComponent: expect.any(Function),
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

    expect(verifyCatalog).toHaveBeenCalledWith(expected)
  })

  it('can prefix all cataloged components with the catalogPrefix', () => {
    const Consumer = () => {
      const catalog = useCatalog()
      verifyCatalog(catalog)

      return <div>Catalog</div>
    }

    const expected = {
      _catalog: {
        _TestComponent: TestComponent,
      },
      getComponent: expect.any(Function),
      hasComponent: expect.any(Function),
    }

    mount(
      <CatalogProvider catalog={testCatalog} catalogPrefix="_">
        <Consumer />
      </CatalogProvider>,
    )

    expect(verifyCatalog).toHaveBeenCalledWith(expected)
  })

  it('can be nested within another CatalogProvider, and protected by prefixing cataloged components', () => {
    const TestComponentTwo = () => <div>Different</div>
    const Title = () => <h2>Hello</h2>

    const innerCatalog = {
      TestComponent: TestComponentTwo,
      Title,
    }

    const expected = {
      _catalog: {
        // outer catalog has a prefix
        _TestComponent: TestComponent,
        // inner catalog has no prefix
        TestComponent: TestComponentTwo,
        Title,
      },
      getComponent: expect.any(Function),
      hasComponent: expect.any(Function),
    }

    const Consumer = () => {
      const catalog = useCatalog()
      verifyCatalog(catalog)

      return <div>Catalog</div>
    }

    mount(
      <CatalogProvider catalog={testCatalog} catalogPrefix="_">
        <CatalogProvider catalog={innerCatalog}>
          <Consumer />
        </CatalogProvider>
      </CatalogProvider>,
    )

    expect(verifyCatalog).toHaveBeenCalledWith(expected)
  })
})
