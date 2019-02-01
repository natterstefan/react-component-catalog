import React, { Component } from 'react'
import { mount } from 'enzyme'

import Catalog from '../lib/catalog'
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
  let testContext

  beforeEach(() => {
    testCatalog = new Catalog({
      components: {
        TestClassComponent,
        TestComponent,
      },
    })

    testContext = {
      context: { catalog: testCatalog },
    }
  })

  it('renders a wrapped functional component properly', () => {
    const wrapper = mount(<TestComponent hello="world" />, testContext)

    // with proper displayName
    expect(wrapper.name()).toEqual('withCatalog(withCatalogChild)')

    // passed props and the context as a new prop
    expect(wrapper.childAt(0).props()).toEqual({
      catalog: testCatalog,
      hello: 'world',
    })

    // and the component itself
    expect(wrapper.find(TestComponent).prop('hello')).toEqual('world')
    expect(wrapper.find(TestComponent).text()).toEqual('Hello World')
  })

  it('renders a wrapped react class component properly', () => {
    const wrapper = mount(<TestClassComponent hello="world" />, testContext)

    // with proper displayName
    expect(wrapper.name()).toEqual('withCatalog(TestClassComponent)')

    // passed props and the context as a new prop
    expect(wrapper.childAt(0).props()).toEqual({
      catalog: testCatalog,
      hello: 'world',
    })

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

  it('returns Unknown for an anonymous function component', () => {
    expect(getDisplayName(() => {})).toEqual('Unknown')
  })
})
