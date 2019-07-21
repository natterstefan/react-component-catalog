const { resolve } = require('path')

require('dotenv').config()

const bundle = client => ({
  [`${client}.bundled.js`]: [
    '@babel/polyfill',
    resolve(__dirname, 'client', client, 'index.js'),
  ],
})

module.exports = {
  entry: {
    // add new clients as you like and need
    ...bundle('base'),
    ...bundle('client1'),
  },
  mode: process.env.BABEL_ENV || process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: ['babel-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  output: {
    chunkFilename: '[name].bundled.js',
    filename: '[name]',
    path: resolve(__dirname, './dist/static'),
  },
  resolve: {
    // de-dupe react to be able to use hooks https://github.com/facebook/react/issues/14317#issuecomment-463097191
    // https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
    alias: {
      react: resolve(__dirname, 'node_modules/react'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
    },
  },
}
