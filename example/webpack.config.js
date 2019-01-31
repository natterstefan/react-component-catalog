const { resolve } = require('path')

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
  output: {
    filename: '[name]',
    chunkFilename: '[name].bundled.js',
    path: resolve(__dirname, './dist/static'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    alias: {
      'react-component-catalog': resolve(__dirname, '..', 'dist/'),
      Base: resolve(__dirname, 'client/base/'),
    },
  },
}
