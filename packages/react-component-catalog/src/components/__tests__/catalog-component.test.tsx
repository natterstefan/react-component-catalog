/* eslint-disable react/no-multi-comp */
import React, { FunctionComponent } from 'react'
import { mount } from 'enzyme'

import Catalog from '../../catalog'
import CatalogComponent from '../catalog-component'
import CatalogProvider from '../catalog-provider'
import { withCatalog } from '../with-catalog'

const TestComponent: FunctionComponent = () => <div>Hello World</div>
const BaseArticle: FunctionComponent = () => <div>Hello BaseArticle</div>

const FallbackComponent: FunctionComponent = () => <div>Fallback</div>
const FallbackFromCatalog: FunctionComponent = () => (
  <div>FallbackFromCatalog</div>
)

// TestCatalog can be nested too
type TestCatalog = {
  [name: string]: JSX.Element | FunctionComponent | TestCatalog
}

describe('CatalogComponent', () => {
  let testCatalog: TestCatalog = null
  let emptyTestCatalog: TestCatalog = null

  const components: TestCatalog = {
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
    testCatalog = components
    emptyTestCatalog = {}

    jest.spyOn(console, 'error')
    ;(console as any).error.mockImplementation(jest.fn())
  })

  afterEach(() => {
    ;(console as any).error.mockRestore()
  })

  it('has a a proper displayName for easier debugging etc.', () => {
    expect(CatalogComponent.displayName).toStrictEqual(
      'CatalogComponentWrapper',
    )
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
          <CatalogProvider catalog={new Catalog({ TestRef })}>
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
          <CatalogProvider catalog={{ TestRef }}>
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

  it('renders nothing, when the requested component and the fallbackComponent does not exist', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent
          component="NotAvailableComponent"
          fallbackComponent="NotAvailableFallback"
        />
      </CatalogProvider>,
    )

    expect(wrapper.find(CatalogComponent).html()).toStrictEqual('')
  })

  it('renders nothing, when the requested component does not exist and no fallbackComponent was provided', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="NotAvailableComponent" />
      </CatalogProvider>,
    )

    expect(wrapper.find(CatalogComponent).html()).toStrictEqual('')
  })

  it('renders nothing, when the catalog context does not exist', () => {
    const wrapper = mount(
      <CatalogComponent component="NotAvailableComponent" />,
    )

    expect(wrapper.find(CatalogComponent).html()).toStrictEqual('')
  })

  describe('debugging on DEV', () => {
    it('tells the developer, when CatalogComponent was used outside a CatalogProvider', () => {
      mount(<CatalogComponent component="NotAvailableComponent" />)

      // test if the developer was notified
      expect(console.error).toHaveBeenCalledTimes(1)
      expect(console.error).toHaveBeenLastCalledWith(
        '[CatalogComponent] You are not using CatalogComponent in the context of a CatalogProvider with a proper catalog.',
      )
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
        '[CatalogComponent] "NotAvailableComponent" not found in component catalog.',
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
        '[CatalogComponent] "NotAvailableComponent" not found in component catalog.',
        'The catalog contains only:',
        {},
      )
    })
  })

  describe('debugging on PRODUCTION', () => {
    beforeAll(() => {
      ;(global as any).__DEV__ = false
    })

    afterAll(() => {
      ;(global as any).__DEV__ = true
    })

    it('does not tell the developer, when CatalogComponent was used outside a CatalogProvider and __DEV__ is false', () => {
      mount(<CatalogComponent component="NotAvailableComponent" />)
      expect(console.error).toHaveBeenCalledTimes(0)
    })

    it('does not tell the developer, component is not available and __DEV__ is false', () => {
      mount(
        <CatalogProvider catalog={testCatalog}>
          <CatalogComponent component="NotAvailableComponent" />
        </CatalogProvider>,
      )
      expect(console.error).toHaveBeenCalledTimes(0)
    })

    it('does not tell the developer, when catalog is null and __DEV__ is false', () => {
      mount(
        <CatalogProvider catalog={null}>
          <div />
        </CatalogProvider>,
      )
      expect(console.error).toHaveBeenCalledTimes(0)
    })
  })
})
