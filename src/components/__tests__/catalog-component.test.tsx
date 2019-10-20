/* eslint-disable react/no-multi-comp */
import React from 'react'
import { mount } from 'enzyme'

import Catalog, { ICatalog } from '../../catalog'
import CatalogComponent from '../catalog-component'
import CatalogProvider from '../catalog-provider'
import { withCatalog } from '../with-catalog'

const TestComponent = () => <div>Hello World</div>
const BaseArticle = () => <div>Hello BaseArticle</div>

const FallbackComponent = () => <div>Fallback</div>
const FallbackFromCatalog = () => <div>FallbackFromCatalog</div>

describe('CatalogComponent', () => {
  let backupError: () => void
  let testCatalog: ICatalog
  let emptyTestCatalog: ICatalog

  const components = {
    FallbackFromCatalog,
    TestComponent,
    ArticlePage: {
      BaseArticle,
    },
    Pages: {
      NestedPage: (): null => null,
      AnotherNestedPage: {
        OtherPage: (): null => null,
      },
    },
  }

  beforeEach(() => {
    testCatalog = new Catalog({
      components,
    })

    emptyTestCatalog = new Catalog({
      components: {},
    })

    backupError = console.error
    console.error = jest.fn()
  })

  afterEach(() => {
    console.error = backupError
  })

  it('has a a proper displayName for easier debugging etc.', () => {
    expect(CatalogComponent.displayName).toStrictEqual('CatalogComponent')
  })

  it('renders a requested component fully functional', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="TestComponent" />
      </CatalogProvider>,
    )

    expect(wrapper.find(TestComponent).text()).toStrictEqual('Hello World')
  })

  it('renders a requested nested component fully functional', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="ArticlePage.BaseArticle" />
      </CatalogProvider>,
    )

    expect(wrapper.find(BaseArticle).text()).toStrictEqual('Hello BaseArticle')
  })

  it('renders a requested component with additional props', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="TestComponent" hello="world" />
      </CatalogProvider>,
    )

    expect(wrapper.find(TestComponent).text()).toStrictEqual('Hello World')
    expect(wrapper.find(TestComponent).prop('hello')).toStrictEqual('world')
  })

  it('renders a requested component with ref using withCatalog', () => {
    const TestRef = withCatalog(props => (
      <button {...props} type="button">
        Hello Button
      </button>
    ))

    class App extends React.Component {
      public setRef: any

      constructor(props: any) {
        super(props)
        this.setRef = React.createRef()
      }

      render() {
        return (
          <CatalogProvider catalog={new Catalog({ components: { TestRef } })}>
            <TestRef ref={this.setRef} />
          </CatalogProvider>
        )
      }
    }

    const wrapper = mount<App>(<App />)

    const element = wrapper.find(TestRef).instance()
    expect(wrapper.instance().setRef).toHaveProperty('current', element)
  })

  it('renders a requested component with ref using CatalogComponent', () => {
    const TestRef = (props: any) => (
      <button {...props} type="button">
        Hello Button
      </button>
    )

    class App extends React.Component {
      public setRef: any

      constructor(props: any) {
        super(props)
        this.setRef = React.createRef()
      }

      render() {
        return (
          <CatalogProvider catalog={new Catalog({ components: { TestRef } })}>
            <CatalogComponent component="TestRef" ref={this.setRef} />
          </CatalogProvider>
        )
      }
    }

    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26039#issuecomment-399517293
    const wrapper = mount<App>(<App />)

    const element = wrapper.find(TestRef).instance()
    expect(wrapper.instance().setRef).toHaveProperty('current', element)
  })

  it('renders the fallbackComponent, when the requested component does not exist', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent
          component="NotAvailableComponent"
          fallbackComponent={FallbackComponent}
        />
      </CatalogProvider>,
    )

    expect(wrapper.find(FallbackComponent)).toHaveLength(1)
  })

  it('renders a FallbackComponent from the catalog, when the requested component does not exist', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent
          component="NotAvailableComponent"
          fallbackComponent="FallbackFromCatalog"
        />
      </CatalogProvider>,
    )

    expect(wrapper.find(FallbackFromCatalog)).toHaveLength(1)
  })

  it('renders null, when the requested component and the fallbackComponent does not exist', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent
          component="NotAvailableComponent"
          fallbackComponent="NotAvailableFallback"
        />
      </CatalogProvider>,
    )

    expect(wrapper.find(CatalogComponent).html()).toBeNull()
  })

  it('renders null, when the requested component does not exist and no fallbackComponent was provided', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="NotAvailableComponent" />
      </CatalogProvider>,
    )

    expect(wrapper.find(CatalogComponent).html()).toBeNull()
  })

  it('tells the developer, when the requested component does not exist and no fallbackComponent was provided', () => {
    mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="NotAvailableComponent" />
      </CatalogProvider>,
    )

    // test if the developer was notified
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenLastCalledWith(
      'CatalogComponent: "NotAvailableComponent" not found in component catalog.',
      'The catalog contains only:',
      components,
    )
  })

  it('tells the developer, when the requested component does not exist and no fallbackComponent was provided even when catalog is empty', () => {
    mount(
      <CatalogProvider catalog={emptyTestCatalog}>
        <CatalogComponent component="NotAvailableComponent" />
      </CatalogProvider>,
    )

    // test if the developer was notified
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenLastCalledWith(
      'CatalogComponent: "NotAvailableComponent" not found in component catalog.',
      'The catalog contains only:',
      {},
    )
  })

  it('renders null, when the catalog context does not exist', () => {
    const wrapper = mount(
      <CatalogComponent component="NotAvailableComponent" />,
    )

    expect(wrapper.find(CatalogComponent).html()).toBeNull()

    // test if the developer was notified
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenLastCalledWith(
      'catalog is not defined. Please, use <CatalogComponent /> in the context of a <CatalogProvider /> with an existing catalog.',
    )
  })
})
