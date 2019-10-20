const path = require('path')

module.exports = {
  extends: [
    'eslint-config-ns',
    // add typescript specific linting rules and add prettier typescript support
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks'],
  globals: {
    __DEV__: true,
  },
  rules: {
    'jest/prefer-strict-equal': 'error',
    'no-underscore-dangle': 0,
    'sort-keys': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/interface-name-prefix': [
      2,
      {
        prefixWithI: 'always',
        allowUnderscorePrefix: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        'max-classes-per-file': 0,
        'no-console': 0,
        // lets loosen the typescript rules in test files a little
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': 0,
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
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
}
