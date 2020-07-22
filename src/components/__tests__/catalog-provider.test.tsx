import React from 'react'
import { mount } from 'enzyme'

import CatalogProvider from '../catalog-provider'
import CatalogComponent from '../catalog-component'
import { useCatalog } from '../use-catalog'

const TestComponent = () => <div>Hello World</div>

const DEFAULT_CATALOG = { TestComponent }

describe('CatalogProvider', () => {
  let testCatalog = DEFAULT_CATALOG
  const verifyCatalog = jest.fn()

  const expectedTestCatalog = {
    _catalog: {
      TestComponent,
    },
    getComponent: expect.any(Function),
    hasComponent: expect.any(Function),
  }

  beforeEach(() => {
    testCatalog = DEFAULT_CATALOG

    verifyCatalog.mockReset()

    jest.spyOn(console, 'error')
    ;(console as any).error.mockImplementation(jest.fn())
  })

  afterEach(() => {
    ;(console as any).error.mockRestore()
  })

  it.each([null, undefined])(
    'rendes null, when the catalog was not provided',
    type => {
      const wrapper = mount(
        <CatalogProvider catalog={type}>
          <CatalogComponent component="NotAvailableComponent" />
        </CatalogProvider>,
      )

      expect(wrapper.html()).toBeNull()
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

  describe('nesting', () => {
    it('can be nested within another CatalogProvider', () => {
      const Consumer = () => {
        const catalog = useCatalog()
        verifyCatalog(catalog)

        return <div>Catalog</div>
      }

      mount(
        <CatalogProvider catalog={testCatalog}>
          {/* empty catalog can be used, but is not recommended though */}
          <CatalogProvider catalog={{}}>
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

  describe('debugging', () => {
    describe('on DEV', () => {
      it('tells the developer, when no catalog was provided', () => {
        mount(<CatalogProvider catalog={null} />)
        expect(console.error).toHaveBeenCalledTimes(1)
        expect(console.error).toHaveBeenLastCalledWith(
          '[CatalogProvider] must be rendered with a valid catalog property',
        )
      })

      it('tells the developer, when no child was provided', () => {
        mount(<CatalogProvider catalog={testCatalog} />)
        expect(console.error).toHaveBeenCalledTimes(1)
        expect(console.error).toHaveBeenLastCalledWith(
          '[CatalogProvider] must contain at least one child',
        )
      })
    })

    describe('on PRODUCTION', () => {
      beforeAll(() => {
        ;(global as any).__DEV__ = false
      })

      afterAll(() => {
        ;(global as any).__DEV__ = true
      })

      it('does not tell the developer, when no catalog was provided', () => {
        mount(<CatalogProvider catalog={null} />)
        expect(console.error).toHaveBeenCalledTimes(0)
      })

      it('does not tell the developer, when no child was provided', () => {
        mount(<CatalogProvider catalog={testCatalog} />)
        expect(console.error).toHaveBeenCalledTimes(0)
      })
    })
  })
})
