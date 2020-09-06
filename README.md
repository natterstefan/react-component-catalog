# React-Component-Catalog

[![npm version](https://badge.fury.io/js/react-component-catalog.svg)](https://badge.fury.io/js/react-component-catalog)
[![Build Status](https://travis-ci.com/natterstefan/react-component-catalog.svg?branch=master)](https://travis-ci.com/natterstefan/react-component-catalog)
[![Coverage Status](https://coveralls.io/repos/github/natterstefan/react-component-catalog/badge.svg?branch=master)](https://coveralls.io/github/natterstefan/react-component-catalog?branch=master) [![GitHub license](https://img.shields.io/github/license/natterstefan/react-component-catalog.svg)](https://github.com/natterstefan/react-component-catalog/blob/master/LICENCE)

[![Dependencies](https://img.shields.io/david/natterstefan/react-component-catalog.svg)](https://github.com/natterstefan/react-component-catalog/blob/master/package.json)
[![Known Vulnerabilities](https://snyk.io/test/github/natterstefan/react-component-catalog/badge.svg)](https://snyk.io/test/github/natterstefan/react-component-catalog)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

[React-Component-Catalog](https://github.com/natterstefan/react-component-catalog)
is a library for individually registering, retrieving, and rendering React
components based on your own conditions (eg. different component for various
clients, sites, ...).

## Getting started

```sh
npm i react-component-catalog --save

# or
yarn add react-component-catalog
```

Then install the correct versions of each peerDependency package, which are
listed by the command:

```sh
npm info "react-component-catalog@latest" peerDependencies
```

If using npm 5+, use this shortcut:

```sh
npx install-peerdeps --dev react-component-catalog

# or
yarn add react-component-catalog -D --peer
```

## Upgrade from 1.x.x to 2.0.0

### Catalog Data Structure changes

When upgrading to 2.0.0, one needs to change the `Catalog`'s data structure.

```diff
// catalog.js
- import { Catalog } from 'react-component-catalog'
import Button from './button'

-const catalog = new Catalog({
-  components: {
-    Button,
-  },
-})
+const catalog = {
+  Button,
+)

export default catalog
```

### `CatalogProvider` changes

Previously, `CatalogProvider` rendered it's children with an empty catalog, when
none was provided. In 2.x it renders `null` instead. Same happens, when no
child component is provided.

```diff
import { CatalogProvider } from 'react-component-catalog'
import catalog from './catalog' // your apps catalog

const App = () => (
- <CatalogProvider catalog={new Catalog({ components: catalog })}>
+ <CatalogProvider catalog={catalog}>
    <div>Hello</div>
  </CatalogProvider>
)
```

`CatalogProvider` accepts an object and no instance of `Catalog` anymore.

### `useCatalog` and `catalog` changes

`getComponent` does not return `null` anymore when a component is not found,
instead it returns `undefined`.

```diff
import React from 'react'
import CatalogComponent, { useCatalog } from 'react-component-catalog'

const App = () => {
- const { catalog } = useCatalog()
+ const catalog = useCatalog()

- console.log('available components', catalog._components)
+ console.log('available components', catalog._catalog)

  const Button = catalog.getComponent('Button')

  // ...
}
```

### `Catalog` changes

`Catalog` is not exported anymore, so code like does not work anymore:

```diff
- import { Catalog } from 'react-catalog-component'
```

### `CatalogComponent` and Module Augmentation

The `CatalogComponents` interface can be augmented to add more typing support.

```tsx
// react-component-catalog.d.ts
declare module 'react-component-catalog' {
  export interface CatalogComponents {
    Title: React.FunctionComponent<{}>
  }
}
```

Whenever you use the `CatalogComponent` now you can do the following to get full
typing support (_opt-in feature_). When you do not provide the interface, any
`string`, `string[]` or `Record<string, any>` value for `component` is allowed.

```tsx
const App = () => (
  <CatalogComponent<CatalogComponents> component="Title">
    Hello World
  </CatalogComponent>
)

// this works too, but `component` has no typing support
const App = () => (
  <CatalogComponent component="Title">Hello Base</CatalogComponent>
)
```

_Attention:_ it is recommended to use `CatalogComponents` only when it was
augmented. Because it represents an empty interface and without adding your own
custom properties it will [match everything](https://stackoverflow.com/a/58512513/1238150).

## Basic Usage

### Create a Catalog

```jsx
// button.js
import React from 'react'

const Button = props => <button>{props.children}</button>

export default Button
```

```jsx
// catalog.js
import Button from './button'

const catalog = {
  Button,
}

export default catalog
```

#### Create a nested Catalog

It is also possible to add a nested `components`-object to the `Catalog`. This
allows registering variations of a component. Take an article for instance.
You might want to register different types of the component. There might be a
`AudioArticle`, `VideoArticle` and a `BaseArticle` component you want to use.
You can add them to the catalog like this:

```jsx
// catalog.js
// different types of articles
import AudioArticle from './audio-article'
import BaseArticle from './base-article'
import VideoArticle from './video-article'

const catalog = {
  ArticlePage: {
    AudioArticle,
    BaseArticle,
    VideoArticle,
  },
}

export default catalog
```

And you could later use it like this:

```jsx
// app.js
import React from 'react'
import CatalogComponent, { useCatalog } from 'react-component-catalog'

const App = props => {
  const { isAudioArticle, isVideoArticle } = props
  const catalog = useCatalog()

  // get the ArticlePage object from the catalog
  const ArticlePage = catalog.getComponent('ArticlePage')

  // or get them one by one with one of the following methods
  // const BaseArticle = catalog.getComponent('ArticlePage.BaseArticle')
  // <CatalogComponent component="ArticlePage.BaseArticle" />

  if (isAudioArticle) {
    return <ArticlePage.AudioArticle {...props} />
  }

  if (isVideoArticle) {
    return <ArticlePage.VideoArticle {...props} />
  }

  return <ArticlePage.BaseArticle {...props} />
}

export default App
```

### Create a CatalogProvider

```jsx
// index.js
import React from 'react'
import ReactDOM from 'react-dom'

import { CatalogProvider } from 'react-component-catalog'
import catalog from './catalog'
import App from './app'

ReactDOM.render(
  <CatalogProvider catalog={catalog}>
    <App />
  </CatalogProvider>,
  document.getElementById('_root'),
)
```

#### Nesting CatalogProvider

`<CatalogProvider />` can be nested, whereas the inner provider will extend and
overwrite the parent provider.

```js
// setup catalogs
const catalog = {
  OuterComponent: () => <div>OuterComponent</div>,
  Title: ({ children }) => <h1>OuterTitle - {children}</h1>,
}

const innerCatalog = {
  InnerComponent: () => <div>InnerComponent</div>,
  Title: ({ children }) => <h2>InnerTitle - {children}</h2>, // inner CatalogProvider overwrites Title of the outer catalog
}

// usage
const App = () => (
  <CatalogProvider catalog={catalog}>
    <CatalogProvider catalog={innerCatalog}>
      <Content />
    </CatalogProvider>
  </CatalogProvider>
)
```

`<Content />` can access components inside the `catalog` and `innerCatalog`. If
the `innerCatalog` contains a component with the same name than in the `catalog`
it will overwrite it. In this case `<Title />` gets overwritten in the inner
provider.

### Import and use the catalog (with react-hooks)

```jsx
// app.js
import React from 'react'
// useCatalog is a react-hook
import CatalogComponent, { useCatalog } from 'react-component-catalog'

const App = () => {
  const catalog = useCatalog()
  const Button = catalog.getComponent('Button')

  // you can also first check if it exists
  const hasButton = catalog.hasComponent('Button')

  // or you use them with the <CatalogComponent /> component
  return (
    <div>
      <CatalogComponent component="Title">Hello Client1</CatalogComponent>
      <CatalogComponent
        component="Card"
        {/* the fallbackComponent can either be a new component, or a component
          from the catalog */}
        fallbackComponent={() => <div>Component not found</div>}
        { /* fallbackComponent="FallbackComponent" */ }
      >
        Hello Card
      </CatalogComponent>
      {Button && <Button />}
    </div>
  )
}

export default App
```

### Use catalog with `ref`

> Refs provide a way to access DOM nodes or React elements created in the render
> method. ([Source: reactjs.org](https://reactjs.org/docs/refs-and-the-dom.html))

It is possible to use `react-component-catalog` with `ref` as well. It would
look similar to (works also with `<CatalogComponent />`):

```js
const TestComponent = withCatalog(props => (
  <button {...props} type="button">
    Hello Button
  </button>
))

/* eslint-disable react/no-multi-comp */
class App extends React.Component {
  constructor(props) {
    super(props)
    this.setRef = React.createRef()
  }

  render() {
    // or <CatalogComponent component="TestComponent" ref={this.setRef} />
    return (
      <CatalogProvider catalog={{ TestComponent }}>
        <TestComponent ref={this.setRef} />
      </CatalogProvider>
    )
  }
}
```

## How to build and test this package

```sh
# -- build the package --
yarn
yarn build
```

```sh
# -- test the package in an example app --
# run the example in watch-mode
yarn watch

# or run the example in production mode
cd packages/example
yarn build
yarn start
```

## How to release and publish the package

This package uses [standard-version](https://github.com/conventional-changelog/standard-version)
and [commitizen](https://github.com/commitizen/cz-cli) for standardizing commit
messages, release tags and the changelog.

When you're ready to release, execute the following commands in the given order:

1. `git checkout master`
2. `git pull origin master`
3. `yarn release --release-as major|minor|patch` (or for eg. beta releases:
   `yarn release -- --prerelease beta --release-as major`)
4. `git push --tags`
5. `yarn publish`

### Links

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)
  - [Modules Important to Conventional Changelog Ecosystem](https://github.com/conventional-changelog/conventional-changelog#modules-important-to-conventional-changelog-ecosystem)
- [semantic-release](https://github.com/semantic-release/semantic-release)
  (standard-version alternative, with extended CI support)
- [commitlint](https://github.com/conventional-changelog/commitlint)
- [npm-dedupe when eg. multiple @types/\* versions are installed](https://docs.npmjs.com/cli/dedupe.html)
- [React Type Reference](https://flow.org/en/docs/react/types/)
- [Generics while using React.forwardRef](https://stackoverflow.com/a/58473012/1238150)

## Credits

Inspired by [Building a Component Registry in React by Erasmo Marín](https://medium.com/smartboxtv-engineering/building-a-component-registry-in-react-4504ca271e56).
I did not find a package implementing his thoughts and ideas in such a
straightforward way. That is why, I decided to create it.

## Licence

[Apache 2.0](LICENCE)

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/natterstefan">
          <img width="150" height="150" src="https://github.com/natterstefan.png?v=3&s=150">
          </br>
          Stefan Natter
        </a>
        <div>
          <a href="https://twitter.com/natterstefan">
            <img src="https://img.shields.io/twitter/follow/natterstefan.svg?style=social&label=Follow" />
          </a>
        </div>
      </td>
    </tr>
  <tbody>
</table>
