# React-Component-Catalog

[![npm version](https://badge.fury.io/js/react-component-catalog.svg)](https://badge.fury.io/js/react-component-catalog)
[![DevDependencies](https://api.travis-ci.org/natterstefan/react-component-catalog.svg?branch=master)](https://travis-ci.org/natterstefan/react-component-catalog)
[![Dependencies](https://img.shields.io/david/natterstefan/react-component-catalog.svg)](https://github.com/natterstefan/react-component-catalog/blob/master/package.json)
[![Coverage Status](https://coveralls.io/repos/github/natterstefan/react-component-catalog/badge.svg?branch=master)](https://coveralls.io/github/natterstefan/react-component-catalog?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/natterstefan/react-component-catalog/badge.svg)](https://snyk.io/test/github/natterstefan/react-component-catalog)
[![GitHub license](https://img.shields.io/github/license/natterstefan/react-component-catalog.svg)](https://github.com/natterstefan/react-component-catalog/blob/master/LICENCE)

React-Component-Catalog is a library for registering, retrieving, and rendering
React components dynamically based on the requested client-package.

## Getting started

```bash
npm i react-component-catalog --save
```

## Basic Usage

### Requirements

As this package depends on [`react-hooks`](https://reactjs.org/docs/hooks-overview.html),
`"react": "^16.8.0"` and `"react-dom": "^16.8.0"` are required (see
`peerDependencies` in [package.json](./package.json)).

### First register the components

```jsx
// button.js
import React from 'react';

const Button = (props) => <button>{props.children}</button>

export default Button;
```

```jsx
// catalog.js
import { Catalog } from 'react-component-catalog';
import Button from './button';

const catalog = new Catalog({
  components: {
    Button,
  },
});

export default catalog;
```

### Create a CatalogProvider

```jsx
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

import { CatalogProvider } from 'react-component-catalog';
import catalog from './catalog';
import App from './app';

ReactDOM.render(
  <CatalogProvider catalog={catalog}>
    <App />
  </CatalogProvider>,
  document.getElementById('_root'),
);
```

#### Nesting CatalogProvider

`<CatalogProvider />` can be nested, whereas the inner provider will extend and
overwrite the parent provider.

```js
// setup catalogs
const catalog = new Catalog({
  components: {
    OuterComponent: () => <div>OuterComponent</div>,
    Title: ({ children }) => <h1>OuterTitle - {children}</h1>
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

  // or you use them with the <CatalogComponent /> component
  return (
    <div>
      <CatalogComponent component="Title">Hello Client1</CatalogComponent>
      <CatalogComponent
        component="Card"
        fallbackComponent={() => <div>Component not found</div>}
      >
        Hello Card
      </CatalogComponent>
      {Button && <Button />}
    </div>
  )
}

export default App
```

## How to build and test this package

```sh
# build the package
npm i
npm build

# run the example in watch-mode
cd example
npm run watch-client
npm run watch-server

# or run the example in production mode
cd example
npm run build
npm run start
```

Then open the [example](./example) folder and follow the setup instructions.
Afterwards, you can see the package in action.

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
