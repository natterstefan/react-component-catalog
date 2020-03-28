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
    expect(ReactComponentCatalog).toStrictEqual(CatalogComponent)
  })

  it('exports other parts as well', () => {
    expect(Catalog).toStrictEqual(CatalogPart)
    expect(CatalogComponent).toStrictEqual(CatalogComponentPart)
    expect(CatalogProvider).toStrictEqual(CatalogProviderPart)
    expect(withCatalog).toStrictEqual(withCatalogPart)
  })
})