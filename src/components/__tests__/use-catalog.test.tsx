import React from 'react'
import { mount } from 'enzyme'

import CatalogProvider from '../catalog-provider'
import { useCatalog } from '../use-catalog'

const TestComponent = () => <div>Hello World</div>

const DEFAULT_CATALOG = { TestComponent }

describe('useCatalog', () => {
  const testCatalog = DEFAULT_CATALOG
  const verifyCatalog = jest.fn()

  const expectedTestCatalog = {
    _catalog: {
      TestComponent,
    },
    getComponent: expect.any(Function),
    hasComponent: expect.any(Function),
  }

  const Consumer = () => {
    const catalog = useCatalog()
    verifyCatalog(catalog)
    return <div>Catalog</div>
  }

  beforeEach(() => {
    verifyCatalog.mockReset()

    jest.spyOn(console, 'error')
    ;(console as any).error.mockImplementation(jest.fn())
  })

  afterEach(() => {
    ;(console as any).error.mockRestore()
  })

  it('provides the catalog context', () => {
    mount(
      <CatalogProvider catalog={testCatalog}>
        <Consumer />
      </CatalogProvider>,
    )
    expect(verifyCatalog).toHaveBeenCalledWith(expectedTestCatalog)
  })

  it('returns null, when used outside of a CatalogProvider', () => {
    mount(<Consumer />)
    expect(verifyCatalog).toHaveBeenCalledWith(null)
  })

  describe('debugging', () => {
    describe('on DEV', () => {
      it('tells the developer, when no catalog was provided', () => {
        mount(<Consumer />)
        expect(console.error).toHaveBeenCalledTimes(1)
        expect(console.error).toHaveBeenLastCalledWith(
          '[useCatalog] You are not using useCatalog in the context of a CatalogProvider with a proper catalog.',
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
        mount(<Consumer />)
        expect(console.error).toHaveBeenCalledTimes(0)
      })
    })
  })
})
