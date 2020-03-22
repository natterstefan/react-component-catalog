import { get } from './utils'
import { CatalogComponents } from './types'

export interface ICatalog<T extends CatalogComponents = CatalogComponents> {
  // contains the raw catalog
  _catalog: T | Record<string, any>
  // get a component by id, if not available it will return null
  getComponent: (component: string) => any
  // validates if the given component exists in the catalog
  hasComponent: (component: string) => boolean
}

export class Catalog<T extends CatalogComponents = CatalogComponents>
  implements ICatalog<T> {
  public _catalog: T

  constructor(catalog: T) {
    this._catalog = catalog
  }

  public getComponent: ICatalog<T>['getComponent'] = component =>
    get(this._catalog, component)

  public hasComponent: ICatalog<T>['hasComponent'] = component =>
    !!get(this._catalog, component)
}

export default Catalog
