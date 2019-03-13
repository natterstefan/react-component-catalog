class Catalog {
  constructor(catalog) {
    this._components = (catalog && catalog.components) || {}
  }

  // get a component by id, if not available we return null
  getComponent = id => this._components[id] || null
}

export default Catalog
