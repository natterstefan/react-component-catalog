/**
 * @jest-environment node
 */
import React from 'react'
import { render } from 'enzyme'

import Catalog, { ICatalog } from '../../catalog'
import CatalogComponent from '../catalog-component'
import CatalogProvider from '../catalog-provider'

const TestComponent = () => <div>Hello World</div>
const BaseArticle = () => <div>Hello BaseArticle</div>

describe('CatalogComponent', () => {
  let backupError: () => void
  let testCatalog: ICatalog<any>

  const components = {
    TestComponent,
    ArticlePage: {
      BaseArticle,
    },
    Pages: {
      NestedPage: () => <div />,
      AnotherNestedPage: {
        OtherPage: () => <div />,
      },
    },
  }

  beforeEach(() => {
    testCatalog = new Catalog(components)

    backupError = console.error
    console.error = jest.fn()
  })

  afterEach(() => {
    console.error = backupError
  })

  it('shows a minimized log error on the server', () => {
    render(
      <CatalogProvider catalog={testCatalog}>
        <CatalogComponent component="NotAvailableComponent" />
      </CatalogProvider>,
    )

    // test if the developer was notified
    expect(console.error).toHaveBeenCalledTimes(1)
    expect(console.error).toHaveBeenLastCalledWith(
      '[CatalogComponent] "NotAvailableComponent" not found in component catalog.',
    )
  })
})
