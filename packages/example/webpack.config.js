const { resolve } = require('path')

const webpack = require('webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

require('dotenv').config()

const mode = process.env.BABEL_ENV || process.env.NODE_ENV || 'development'
const isProduction = mode === 'production'

const bundle = client => ({
  [`${client}.bundled.js`]: [
    'core-js',
    'regenerator-runtime/runtime',
    resolve(__dirname, 'src/client', client, 'index.tsx'),
  ],
})

module.exports = {
  entry: {
    ...bundle('base'),
    ...bundle('client1'),
  },
  output: {
    chunkFilename: '[name].bundled.js',
    filename: '[name]',
    path: resolve(__dirname, './dist/static'),
  },
  target: 'web',
  mode,
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            // https://webpack.js.org/loaders/babel-loader
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            // https://github.com/TypeStrong/ts-loader
            loader: 'ts-loader',
          },
        ],
      },
      {
        type: 'javascript/auto',
        test: /\.mjs$/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    /**
     * required to make the monorepo-ts setup work
     * @see https://github.com/TypeStrong/ts-loader#baseurl--paths-module-resolution
     */
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    /**
     * inspired by
     * @see https://reactjs.org/docs/codebase-overview.html#development-and-production
     */
    new webpack.DefinePlugin({
      __DEV__: !isProduction,
    }),
  ],
}
