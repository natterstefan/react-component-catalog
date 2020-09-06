/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('../../jest.config.js')

const pack = require('./package.json')

module.exports = {
  ...baseConfig,
  displayName: pack.name,
  modulePaths: ['<rootDir>'],
  name: pack.name,
  rootDir: '.',
  setupFilesAfterEnv: ['../../jest.setup.ts'],
}
