import CatalogPart from './lib/catalog'
import CatalogComponentPart from './components/catalog-component'
import CatalogProviderPart from './components/catalog-provider'
import withCatalogPart from './components/with-catalog'

import ReactComponentCatalog, {
  Catalog,
  CatalogComponent,
  CatalogProvider,
  withCatalog,
} from '.'

describe('react-component-catalog', () => {
  it('exports CatalogComponent as default', () => {
    expect(ReactComponentCatalog).toEqual(CatalogComponent)
  })

  it('exports other parts as well', () => {
    expect(Catalog).toEqual(CatalogPart)
    expect(CatalogComponent).toEqual(CatalogComponentPart)
    expect(CatalogProvider).toEqual(CatalogProviderPart)
    expect(withCatalog).toEqual(withCatalogPart)
  })
})
