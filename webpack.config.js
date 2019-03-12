const { resolve } = require('path')

module.exports = {
  entry: resolve(__dirname, 'src/index.js'),
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
  // de-dupe react to be able to use hooks https://github.com/facebook/react/issues/14317#issuecomment-463097191
  // https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
  resolve: {
    alias: {
      react: resolve('./node_modules/react'),
      'react-dom': resolve('./node_modules/react-dom'),
    },
  },
}
