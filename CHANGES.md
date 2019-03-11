# React-Component-Catalog Changelog

All notable changes to this project will be documented here. The format is based
on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project
adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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
