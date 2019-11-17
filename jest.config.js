module.exports = {
  collectCoverageFrom: ['src/**/*.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/(dist|es|esm|lib|node_modules)/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
}
