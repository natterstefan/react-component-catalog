import React from 'react'
import { shallow } from 'enzyme'

import Catalog from './catalog'

const TestComponent = () => <div>Hello World</div>

describe('Catalog', () => {
  let testCatalog

  beforeEach(() => {
    testCatalog = new Catalog({
      components: {
        TestComponent,
      },
    })
  })

  it('exports CatalogComponent as default', () => {
    expect(testCatalog).toEqual({
      _catalog: { components: { TestComponent: TestComponent } },
      getComponent: expect.any(Function),
    })
  })

  it('returns requested component fully functional', () => {
    const TestComponentFromCatalog = testCatalog.getComponent('TestComponent')
    const wrapper = shallow(<TestComponentFromCatalog />)
    expect(wrapper.text()).toEqual('Hello World')
  })

  it('does not manipulate props of returned component', () => {
    const clickSpy = jest.fn()
    const TestButton = () => <button onClick={clickSpy}>Hello Button</button>

    testCatalog = new Catalog({
      components: {
        TestButton,
      },
    })

    const TestButtonFromCatalog = testCatalog.getComponent('TestButton')
    const wrapper = shallow(<TestButtonFromCatalog />)
    expect(wrapper.text()).toEqual('Hello Button')

    wrapper.simulate('click')
    expect(clickSpy).toHaveBeenCalledTimes(1)
  })
})
