import { get } from '../utils'

class Catalog {
  constructor(catalog) {
    this._components = (catalog && catalog.components) || {}
  }

  // get a component by id, if not available we return null
  getComponent = component => get(this._components, component) || null

  // returns a boolean value after checking if the component exists in the catalog
  hasComponent = component => !!get(this._components, component)
}

export default Catalog
