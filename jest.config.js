module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.dt.ts',
    '!src/**/(__mocks__|__stories__|__tests__)/*.{js,jsx,ts,tsx}',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: [
    '<rootDir>/src/**/__tests__/*.test.ts',
    '<rootDir>/src/**/__tests__/*.test.tsx',
  ],
  testPathIgnorePatterns: ['<rootDir>/(dist|es|esm|lib|node_modules)/'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
}
