# React-Component-Catalog Changelog

All notable changes to this project will be documented here. The format is based
on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project
adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased

### Fixed

- fixed `build` script and `main` field issue, causing usage issues

## 2019/03/26 0.6.0

### Added

- `catalog` can be prefixed to prevent overwriting during nesting providers
- added `"sideEffects": false` to package.json
- added `"module": "lib/index.js"` to package.json (including `lib` output)

## 2019/03/13 0.5.0

### Added

- Dev: eslint support
- `CatalogProvider` can be nested and they consume their parent's `catalog`
- react-hooks support with new `useCatalog`. It is recommended to not use
  `withCatalog` anymore but `useCatalog` whenever possible.

### Changed

As this package depends on [`react-hooks`](https://reactjs.org/docs/hooks-overview.html),
`"react": "^16.8.0"` and `"react-dom": "^16.8.0"` are required (see
`peerDependencies` in [package.json](./package.json)) from now on.

## 2019/03/11 0.4.0

### Added

- `fallbackComponent` (node) property can be used to render alternative component
  when the requested `component` does not exist
- log error when `<CatalogComponent />` is used without a `<CatalogProvider />`
  context

## 2019/02/02 0.3.0

### Changed

- moved from old react Context API to latest [Context API](https://reactjs.org/docs/context.html)

### Removed

- `prop-types` dependency

## 2019/02/01 0.2.0

### Added

- `jest` test setup

### Changed

- renamed `name` property to `component`
  - eg. `<CatalogComponent name="Button">` is now `<CatalogComponent component="Button">`

## 2019/01/31 0.1.0

### Added

- Initial project setup with example app
