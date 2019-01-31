# React-Component-Catalog

## Requirements

Run at least once `npm build` in the root folder of this project and build
the package first. This example depends on it.

## Start

Install all dependencies and start the server:

```bash
npm i
npm start
```

Then open [http://localhost:8000/base](http://localhost:8000/base) and check
out the base skin. There is another skin available at [http://localhost:8000/client1](http://localhost:8000/client1)

Any path will either resolve a skin (if it was registered
in [server/render.js](./server/render.js)) or falls back to the `base` skin.

For the purpose of this demo this should be enough.

## Setup new clients

In order to serve new clients (eg `hello`) in this demo, one has to extend the
folowing:

1. add new bundle to the [webpack.config.js](./webpack.config.js)
2. allow another client pattern in [server/render.js](./server/render.js))
3. create a new client folder and the respective setup (one root `index.js`
   as the entry-point and `components` for instance)
4. start the server again and open [http://localhost:8000/hello](http://localhost:8000/hello)
