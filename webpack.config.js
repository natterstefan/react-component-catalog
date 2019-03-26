const { resolve } = require('path')

module.exports = {
  entry: resolve(__dirname, 'src/index.js'),
  externals: {
    react: 'React',
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
  output: {
    filename: 'index.js',
    library: 'ReactComponentCatalog',
    libraryTarget: 'umd',
    path: resolve(__dirname, './dist'),
  },
}
