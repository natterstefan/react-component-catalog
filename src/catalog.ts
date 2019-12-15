import { get } from './utils'

type PropertyTypes = string | number

type ICatalogProperty = { [K in PropertyTypes]: any }

export interface ICatalog {
  // contains the raw catalog
  _components: ICatalogProperty
  // get a component by id, if not available it will return null
  getComponent: (component: PropertyTypes) => any | null
  // validates if the given component exists in the catalog
  hasComponent: (component: PropertyTypes) => boolean
}

export interface ICatalogType {
  components: ICatalogProperty
}

export interface ICatalogContext {
  catalog: ICatalog
}

export class Catalog implements ICatalog {
  public _components: ICatalog['_components']

  constructor(catalog: ICatalogType) {
    this._components = (catalog && catalog.components) || {}
  }

  public getComponent: ICatalog['getComponent'] = component =>
    get(this._components, component) || null

  public hasComponent: ICatalog['hasComponent'] = component =>
    !!get(this._components, component)
}

export default Catalog
