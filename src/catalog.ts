import { get } from './utils'

type PropertyTypes = string | number

export interface ICatalog {
  _components: ICatalogProperty
  getComponent(component: PropertyTypes): any
  hasComponent(component: PropertyTypes): boolean
}

export interface ICatalogType {
  components: ICatalogProperty
}

export interface ICatalogContext {
  catalog: ICatalog
}

export type ICatalogProperty = { [K in PropertyTypes]: any }

export class Catalog implements ICatalog {
  public _components: ICatalog['_components']

  constructor(catalog: ICatalogType) {
    this._components = (catalog && catalog.components) || {}
  }

  // get a component by id, if not available we return null
  public getComponent: ICatalog['getComponent'] = component =>
    get(this._components, component) || null

  // returns a boolean value after checking if the component exists in the catalog
  public hasComponent: ICatalog['hasComponent'] = component =>
    !!get(this._components, component)
}

export default Catalog
