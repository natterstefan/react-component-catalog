# React-Component-Catalog Changelog

All notable changes to this project will be documented here. The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.0.0](https://github.com/natterstefan/react-component-catalog/compare/v2.0.0-beta.0...v2.0.0) (2020-07-22)

### ⚠ BREAKING CHANGES

- flat catalog (no extra components prop anymore) ([#49](https://github.com/natterstefan/react-component-catalog/issues/49)) ([ae69468](https://github.com/natterstefan/react-component-catalog/commit/ae694680b3cb326034513a6a22d5d912d0e38abe))

### Features

- unified handling of undefined catalog in all components ([#53](https://github.com/natterstefan/react-component-catalog/issues/53)) ([26bed89](https://github.com/natterstefan/react-component-catalog/commit/26bed894d5c585d4da7f0a6b94162d21d425f49c))
- **ts:** properly type getComponent and hasComponent of ICatalog ([#52](https://github.com/natterstefan/react-component-catalog/issues/52)) ([4584408](https://github.com/natterstefan/react-component-catalog/commit/458440888f9f995e53dd15d21a266f8d41c3bfbb))

## [2.0.0-beta.0](https://github.com/natterstefan/react-component-catalog/compare/v1.3.0...v2.0.0-beta.0) (2019-12-15)

### Features

- js -> ts ([#47](https://github.com/natterstefan/react-component-catalog/issues/47)) ([a57e291](https://github.com/natterstefan/react-component-catalog/commit/a57e291e86e0d273bc168fafad584839bad77d61))

## [1.3.0](https://github.com/natterstefan/react-component-catalog/compare/v1.2.0...v1.3.0) (2019-11-18)

### Features

- fallbackComponent can also be selected from catalog now ([#48](https://github.com/natterstefan/react-component-catalog/issues/48)) ([6be75b1](https://github.com/natterstefan/react-component-catalog/commit/6be75b1512a3fb217b47b04517e575023a66cdc2))

## [1.2.0](https://github.com/natterstefan/react-component-catalog/compare/v1.1.1...v1.2.0) (2019-07-21)

### Features

- disable/remove renovate (for now) ([319725e](https://github.com/natterstefan/react-component-catalog/commit/319725e))
- **logging:** use babel-plugin-dev-expression for logging errors ([#41](https://github.com/natterstefan/react-component-catalog/issues/41)) ([6fdd918](https://github.com/natterstefan/react-component-catalog/commit/6fdd918))

### [1.1.1](https://github.com/natterstefan/react-component-catalog/compare/v1.1.0...v1.1.1) (2019-05-15)

### Bug Fixes

- **utils:** return null when flattenObjectKeys receives invalid obj ([06081e5](https://github.com/natterstefan/react-component-catalog/commit/06081e5))

## [1.1.0](https://github.com/natterstefan/react-component-catalog/compare/v1.0.1...v1.1.0) (2019-05-14)

### Bug Fixes

- **CatalogComponent:** Fix missing displayName ([fa3e14f](https://github.com/natterstefan/react-component-catalog/commit/fa3e14f))

### Features

- **catalog:** Add new catalog.hasComponent function ([c4c10a2](https://github.com/natterstefan/react-component-catalog/commit/c4c10a2))
- **catalog:** Allow nested components object in catalog ([ca236ad](https://github.com/natterstefan/react-component-catalog/commit/ca236ad))
- **CatalogComponent:** CatalogComponent supports nested components ([369375b](https://github.com/natterstefan/react-component-catalog/commit/369375b))

## [1.0.1](https://github.com/natterstefan/react-component-catalog/compare/v1.0.0...v1.0.1) (2019/04/29)

### Added

- `esm` support (build `esm` module and add id as `module` in `package.json`)

## 2019/04/06 1.0.0

### Added

- _Breaking_: `ref` support, thanks to [`React.forwardRef`](https://reactjs.org/docs/forwarding-refs.html)

## 2019/03/28 0.6.1

### Changed

- build `es` version of the package as well (see [babel.config.js](./babel.config.js))

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
