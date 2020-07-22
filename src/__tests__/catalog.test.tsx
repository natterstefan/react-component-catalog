import React from 'react'
import { shallow } from 'enzyme'

import Catalog, { ICatalog } from '../catalog'

const TestComponent = () => <div>Hello World</div>

const AudioArticle = () => <div>AudioArticle</div>
const BaseArticle = () => <div>BaseArticle</div>
const VideoArticle = () => <div>VideoArticle</div>

describe('Catalog', () => {
  let testCatalog: ICatalog<any>

  beforeEach(() => {
    testCatalog = new Catalog({
      ArticlePage: {
        AudioArticle,
        BaseArticle,
        VideoArticle,
      },
      TestComponent,
    })
  })

  it('can be created', () => {
    testCatalog = new Catalog({
      TestComponent,
    })

    expect(testCatalog._catalog).toStrictEqual({
      TestComponent,
    })
  })

  it('creates proper catalog with getComponent function', () => {
    // eslint-disable-next-line jest/prefer-strict-equal
    expect(testCatalog).toEqual({
      _catalog: {
        ArticlePage: {
          AudioArticle,
          BaseArticle,
          VideoArticle,
        },
        TestComponent,
      },
      getComponent: expect.any(Function),
      hasComponent: expect.any(Function),
    })
  })

  describe('getComponent', () => {
    it('returns undefined for a requested component, when it was created with an empty component catalog', () => {
      // first we create an empty registry
      testCatalog = new Catalog({})

      // eslint-disable-next-line jest/prefer-strict-equal
      expect(testCatalog).toEqual({
        _catalog: {},
        getComponent: expect.any(Function),
        hasComponent: expect.any(Function),
      })

      // now request a component from the catalog
      const TestComponentFromCatalog = testCatalog.getComponent('TestComponent')
      expect(TestComponentFromCatalog).toBeUndefined()
    })

    it('returns requested component fully functional', () => {
      const TestComponentFromCatalog = testCatalog.getComponent('TestComponent')
      const wrapper = shallow(<TestComponentFromCatalog />)
      expect(wrapper.text()).toStrictEqual('Hello World')
    })

    it('does not manipulate props of returned component', () => {
      const clickSpy = jest.fn()
      const TestButton = () => (
        <button type="button" onClick={clickSpy}>
          Hello Button
        </button>
      )

      testCatalog = new Catalog({
        TestButton,
      })

      const TestButtonFromCatalog = testCatalog.getComponent('TestButton')
      const wrapper = shallow(<TestButtonFromCatalog />)
      expect(wrapper.text()).toStrictEqual('Hello Button')

      wrapper.simulate('click')
      expect(clickSpy).toHaveBeenCalledTimes(1)
    })

    it('returns nested requested component fully functional', () => {
      const TestComponentFromCatalog = testCatalog.getComponent(
        'ArticlePage.AudioArticle',
      )
      const wrapper = shallow(<TestComponentFromCatalog />)
      expect(wrapper.text()).toStrictEqual('AudioArticle')
    })

    it('returns undefined when nested requested component is not available', () => {
      const TestComponentFromCatalog = testCatalog.getComponent(
        'ArticlePage.OtherArticle',
      )
      expect(TestComponentFromCatalog).toBeUndefined()
    })
  })

  describe('hasComponent', () => {
    it('returns true when component exists', () => {
      const hasAudioArticle = testCatalog.hasComponent(
        'ArticlePage.AudioArticle',
      )
      expect(hasAudioArticle).toBeTruthy()
    })

    it('returns false when component exists', () => {
      const hasOtherArticle = testCatalog.hasComponent(
        'ArticlePage.OtherArticle',
      )
      expect(hasOtherArticle).toBeFalsy()
    })
  })
})
