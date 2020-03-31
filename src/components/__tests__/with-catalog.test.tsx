import React, { FunctionComponent } from 'react'
import { mount } from 'enzyme'

import Catalog, { ICatalog } from '../../catalog'
import CatalogProvider from '../catalog-provider'
import { getDisplayName, withCatalog } from '../with-catalog'

const TestComponent = withCatalog(() => <div>Hello World</div>)

const TestButton = () => <button type="button">Hello</button>
const TestButtonComponent = withCatalog(TestButton)

type TestCatalog = {
  [name: string]: FunctionComponent
}

describe('withCatalog', () => {
  let testCatalog: ICatalog<TestCatalog> = null

  beforeEach(() => {
    testCatalog = new Catalog({
      TestComponent,
      TestButtonComponent,
    })

    jest.spyOn(console, 'error')
    ;(console as any).error.mockImplementation(jest.fn())
  })

  afterEach(() => {
    ;(console as any).error.mockRestore()
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

  it('renders a wrapped component properly', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <TestComponent hello="world" />
      </CatalogProvider>,
    )

    // and the component itself
    expect(wrapper.find(TestComponent).prop('hello')).toStrictEqual('world')
    expect(wrapper.find(TestComponent).text()).toStrictEqual('Hello World')
  })

  it('renders wrapped component properly, even when withCatalog is no child of a CatalogProvider', () => {
    const wrapper = mount(<TestComponent hello="world" />)

    // and the component itself
    expect(wrapper.find(TestComponent).prop('catalog')).toBeUndefined()
    expect(wrapper.find(TestComponent).text()).toStrictEqual('Hello World')
  })

  describe('debugging', () => {
    describe('on DEV', () => {
      it('tells the developer, when no child was provided', () => {
        mount(<TestComponent hello="world" />)
        expect(console.error).toHaveBeenCalledTimes(1)
        expect(console.error).toHaveBeenLastCalledWith(
          '[withCatalog] You are not using withCatalog in the context of a CatalogProvider with a proper catalog.',
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

      it('does not tell the developer, when no child was provided', () => {
        mount(<TestComponent hello="world" />)
        expect(console.error).toHaveBeenCalledTimes(0)
      })
    })
  })
})

describe('getDisplayName', () => {
  it('returns the components displayName', () => {
    const TestComp = (): null => null
    TestComp.displayName = 'TestComp'

    expect(getDisplayName(TestComp)).toStrictEqual('TestComp')
  })

  it('returns the components name if displayName is not present', () => {
    const TestComp = (): null => null
    TestComp.displayName = null

    expect(getDisplayName(TestComp)).toStrictEqual('TestComp')
  })

  it('returns Component for an anonymous function component', () => {
    expect(getDisplayName(() => null)).toStrictEqual('Component')
  })
})
