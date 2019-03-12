const path = require('path')

module.exports = {
  extends: 'eslint-config-ns',
  plugins: ['react-hooks'],
  rules: {
    'jest/consistent-test-it': [
      'error',
      {
        fn: 'it',
        withinDescribe: 'it',
      },
    ],
    'jest/prefer-strict-equal': 'error',
    'no-underscore-dangle': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        'no-console': 0,
      },
    },
  ],
  // required in the example-app
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['react-component-catalog', path.resolve(__dirname, 'dist')],
          ['Base', path.resolve(__dirname, 'example/client/base')],
        ],
      },
    },
  },
}
