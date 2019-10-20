/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')

module.exports = {
  entry: resolve(__dirname, 'src/index.ts'),
  output: {
    filename: 'index.js',
    library: 'ReactComponentCatalog',
    libraryTarget: 'umd',
    path: resolve(__dirname, './dist'),
  },
  // addition - add source-map support
  devtool: 'source-map',
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(t|j)sx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          useCache: true,
        },
      },
      // add source-map support
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}
