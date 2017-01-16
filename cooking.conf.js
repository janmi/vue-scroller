var cooking = require('cooking')
cooking.set({
  entry: './src/index.js',
  dist: './dist',
  // template: './src/index.html',
  devServer: true,
  assetsPath: 'static',
  moduleName: 'Scroller',
  chunk: false,
  format: 'cjs',
  // Production
  clean: true,
  hash: false,
  sourceMap: false,
  extractCSS: true,
  extends: ['vue', 'lint'],
  alias: {
    'src': require('path').join(__dirname, './src')
  }
})

module.exports = cooking.resolve()