const { resolve } = require('path')

const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: resolve(__dirname, 'src/index.ts'),
  output: {
    filename: 'index.js',
    library: 'ReactComponentCatalog',
    libraryTarget: 'umd',
    path: resolve(__dirname, './dist'),
  },
  devtool: 'hidden-source-map',
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(t|j)sx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
        // https://github.com/webpack-contrib/terser-webpack-plugin#extractcomments
        extractComments: true,
        // https://github.com/webpack-contrib/terser-webpack-plugin#sourcemap
        sourceMap: true,
      }),
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}
