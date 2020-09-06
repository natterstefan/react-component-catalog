const path = require('path')

module.exports = {
  extends: ['eslint-config-ns-ts'],
  plugins: ['react-hooks'],
  globals: {
    __DEV__: true,
  },
  rules: {
    // universal rules
    'no-underscore-dangle': 0,
    'sort-keys': 0,

    // react settings
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    // typescript settings
    // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md#enforce-that-interface-names-do-not-begin-with-an-i
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        leadingUnderscore: 'allow',
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
    // removed
    '@typescript-eslint/interface-name-prefix': 0,
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
    {
      files: ['webpack.*.js'],
      rules: {
        'import/no-extraneous-dependencies': 0,
        'no-console': 0,
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
}
