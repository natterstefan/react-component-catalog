module.exports = {
  collectCoverageFrom: ['src/**/*.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/(dist|es|esm|lib|node_modules)/'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
}
