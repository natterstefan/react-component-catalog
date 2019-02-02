import React, { Component } from 'react'
import { mount } from 'enzyme'

import Catalog from '../lib/catalog'
import CatalogProvider from './catalog-provider'
import withCatalog, { getDisplayName } from './with-catalog'

const TestComponent = withCatalog(() => <div>Hello World</div>)

const TestClassComponent = withCatalog(
  class TestClassComponent extends Component {
    render() {
      return <div>Hello Class</div>
    }
  },
)

describe('withCatalog', () => {
  let testCatalog

  beforeEach(() => {
    testCatalog = new Catalog({
      components: {
        TestClassComponent,
        TestComponent,
      },
    })
  })

  it('renders a wrapped functional component properly', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <TestComponent hello="world" />
      </CatalogProvider>,
    )

    // and the component itself
    expect(wrapper.find(TestComponent).prop('hello')).toEqual('world')
    expect(wrapper.find(TestComponent).text()).toEqual('Hello World')
  })

  it('renders a wrapped react class component properly', () => {
    const wrapper = mount(
      <CatalogProvider catalog={testCatalog}>
        <TestClassComponent hello="world" />
      </CatalogProvider>,
    )

    // and the component itself
    expect(wrapper.find(TestClassComponent).prop('hello')).toEqual('world')
    expect(wrapper.find(TestClassComponent).text()).toEqual('Hello Class')
  })
})

describe('getDisplayName', () => {
  it('returns the components displayName', () => {
    const TestComponent = () => {}
    TestComponent.displayName = 'TestComponent'

    expect(getDisplayName(TestComponent)).toEqual('TestComponent')
  })

  it('returns the components name if displayName is not present', () => {
    const TestComponent = () => {}
    TestComponent.displayName = null

    expect(getDisplayName(TestComponent)).toEqual('TestComponent')
  })

  it('returns Component for an anonymous function component', () => {
    expect(getDisplayName(() => {})).toEqual('Component')
  })
})
