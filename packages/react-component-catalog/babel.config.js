/* eslint-disable sort-keys */
/**
 * inspired by
 * @see https://github.com/mui-org/material-ui/blob/b62015a61a4dfef72dfcb79cef917d701d50469f/babel.config.js
 */
let defaultPresets
const environment = process.env.BABEL_ENV || 'umd'

// We release a ES version of the package.
// It's something that matches the latest official supported features of
// JavaScript. Nothing more (stage-1, etc), nothing less (require, etc).
if (environment === 'es') {
  defaultPresets = []
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: ['esm', 'umd'].includes(environment) ? false : 'commonjs',
      },
    ],
  ]
}

module.exports = {
  comments: false,
  presets: [
    // use babel to create *.js files from *ts(x) ones
    '@babel/preset-typescript',
    ...defaultPresets,
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    // https://github.com/4Catalyzer/babel-plugin-dev-expression
    'babel-plugin-dev-expression',
  ],
}
