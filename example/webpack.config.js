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
    chunkFilename: '[name].bundled.js',
    filename: '[name]',
    path: resolve(__dirname, './dist/static'),
  },
  mode: 'development',
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
  resolve: {
    alias: {
      Base: resolve(__dirname, 'client/base/'),
      react: resolve(__dirname, 'node_modules/react'),
      'react-component-catalog': resolve(__dirname, '..', 'dist/'),
      'react-dom': resolve(__dirname, 'node_modules/react-dom'),
    },
  },
}
