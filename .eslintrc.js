module.exports = {
  extends: ['eslint-config-ns-ts'],
  rules: {
    // react settings
    'react/jsx-props-no-spreading': 0,
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
