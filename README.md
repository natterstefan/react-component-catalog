# React-Component-Catalog

[![npm version](https://badge.fury.io/js/react-component-catalog.svg)](https://badge.fury.io/js/react-component-catalog)
[![Build Status](https://travis-ci.com/natterstefan/react-component-catalog.svg?branch=master)](https://travis-ci.com/natterstefan/react-component-catalog)
[![Coverage Status](https://coveralls.io/repos/github/natterstefan/react-component-catalog/badge.svg?branch=master)](https://coveralls.io/github/natterstefan/react-component-catalog?branch=master) [![GitHub license](https://img.shields.io/github/license/natterstefan/react-component-catalog.svg)](https://github.com/natterstefan/react-component-catalog/blob/master/LICENCE)

[![Dependencies](https://img.shields.io/david/natterstefan/react-component-catalog.svg)](https://github.com/natterstefan/react-component-catalog/blob/master/package.json)
[![Known Vulnerabilities](https://snyk.io/test/github/natterstefan/react-component-catalog/badge.svg)](https://snyk.io/test/github/natterstefan/react-component-catalog)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

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
import { Catalog } from 'react-component-catalog'
import Button from './button'

const catalog = new Catalog({
  components: {
    Button,
  },
})

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
import { Catalog } from 'react-component-catalog'

// different types of articles
import AudioArticle from './audio-article'
import BaseArticle from './base-article'
import VideoArticle from './video-article'

const catalog = new Catalog({
  components: {
    ArticlePage: {
      AudioArticle,
      BaseArticle,
      VideoArticle,
    },
  },
})

export default catalog
```

And you could later use it like this:

```jsx
// app.js
import React from 'react'
import CatalogComponent, { useCatalog } from 'react-component-catalog'

const App = props => {
  const { isAudioArticle, isVideoArticle } = props
  const { catalog } = useCatalog()

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
const catalog = new Catalog({
  components: {
    OuterComponent: () => <div>OuterComponent</div>,
    Title: ({ children }) => <h1>OuterTitle - {children}</h1>,
  },
})

const innerCatalog = new Catalog({
  components: {
    InnerComponent: () => <div>InnerComponent</div>,
    Title: ({ children }) => <h2>InnerTitle - {children}</h2>, // inner CatalogProvider overwrites Title of the outer catalog
  },
})

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
  const { catalog } = useCatalog()
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
      <CatalogProvider catalog={new Catalog({ components: { TestComponent } })}>
        <TestComponent ref={this.setRef} />
      </CatalogProvider>
    )
  }
}
```

## How to build and test this package

```sh
# -- build the package --
npm i
npm build
```

```sh
# -- test the package --
# run the example in watch-mode
cd example
npm run watch

# or if you want to run them individually
npm run watch-client
npm run watch-server

# or run the example in production mode
cd example
npm run build
npm run start
```

Then open the [example](./example) folder and follow the setup instructions.
Afterwards, you can see the package in action.

## How to release and publish the package

This package uses [standard-version](https://github.com/conventional-changelog/standard-version)
and [commitizen](https://github.com/commitizen/cz-cli) for standardizing commit
messages, release tags and the changelog.

When you're ready to release, execute the following commands in the given order:

1. `git checkout master`
2. `git pull origin master`
3. `npm run release`
4. `git push --tags`
5. `npm publish`

### Links

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)
  - [Modules Important to Conventional Changelog Ecosystem](https://github.com/conventional-changelog/conventional-changelog#modules-important-to-conventional-changelog-ecosystem)
- [semantic-release](https://github.com/semantic-release/semantic-release)
  (standard-version alternative, with extended CI support)
- [commitlint](https://github.com/conventional-changelog/commitlint)

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
