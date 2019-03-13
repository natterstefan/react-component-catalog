class Catalog {
  constructor(catalog) {
    this._catalog = catalog || {}
    this._components = (catalog && catalog.components) || {}
  }
}

export default Catalog
