import get from 'lodash.get'

class Catalog {
  constructor(catalog = {}) {
    this._catalog = catalog
  }

  // get a component by id, if not available we return null
  getComponent = id => get(this._catalog, `components.${id}`, null)
}

export default Catalog
