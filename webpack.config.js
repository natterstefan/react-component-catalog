const { resolve } = require('path')

module.exports = {
  entry: resolve(__dirname, 'src/index.js'),
  output: {
    library: 'ReactComponentCatalog',
    libraryTarget: 'umd',
    filename: 'index.js',
    path: resolve(__dirname, './dist'),
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
}
