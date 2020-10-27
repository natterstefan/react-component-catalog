// TODO: use jest-preset-ns
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.dt.ts',
    '!src/**/(__mocks__|__stories__|__tests__)/*.{js,jsx,ts,tsx}',
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: 'tsconfig.test.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['/**/__tests__/*.test.ts', '/**/__tests__/*.test.tsx'],
  testPathIgnorePatterns: ['<rootDir>/(dist|es|esm|lib|node_modules)/'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
}
