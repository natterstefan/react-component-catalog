module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'entry', corejs: '3.6' }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
}
