# React-Component-Catalog

React-Component-Catalog is a library for registering, retrieving, and rendering
React components dynamically based on the requested client-package.

## Getting started

```bash
npm i react-component-catalog --save
```

## Basic Usage

### First register the components

```jsx
// button.js
import React from 'react';

const Button = (props) => {
  return <button>{props.children}</button>
};

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

### Import and use the catalog

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

```jsx
// app.js
import React, { Component } from 'react'
import CatalogComponent, { withCatalog } from 'react-component-catalog'

let Button

class App extends Component {
  constructor(props) {
    super(props)

    // you can import and use registered components with catalog.getComponent
    const { catalog } = props
    Button = catalog.getComponent('Button')
  }

  render() {
    // or you use them with the <CatalogComponent /> component
    return (
      <div>
        <CatalogComponent name="Button">Button 1</CatalogComponent>
        <Button>Button 2</Button>
      </div>
    )
  }
}

export default withCatalog(App)
```

## How to build and test this package

```bash
npm i
npm build
```

Then open the [example](./example) folder and follow the setup instructions.
Afterwards, you can see the package in action.

## Credits

Inspired by [Building a Component Registry in React by Erasmo Marín](https://medium.com/smartboxtv-engineering/building-a-component-registry-in-react-4504ca271e56).
I did not find a package implementing his thoughts and ideas in such a
straightforward way. That is why, I decided to create it.

## Licence

[MIT](LICENCE)

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
