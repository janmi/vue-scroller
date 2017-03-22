var cooking = require('cooking')
cooking.set({
  entry: {
    'anima-vue-scroller': './src/index.js'
  }, 
  // entry: './example/main.js',
  dist: './dist',
  // template: './index.html',
  devServer: {
    // 是否启用
    enable: true,
    // 输出文件目录的 URL 路径，注意这里的配置会覆盖下面的 publicPath
    publicPath: '/',
    // 热替换
    hot: true,
    // 提取 CSS
    extractCSS: false,
    // 显示日志信息在页面上
    log: true,
    port: 3000,
    hostname: 'localhost',
    protocol: 'http:',
    // HTML5 history API
    historyApiFallback: true,
    // 控制台输出的信息
    stats: 'errors-only',
    noInfo: true,
    quiet: false,
    lazy: false
  },
  assetsPath: 'static',
  moduleName: 'scroller',
  chunk: false,
  format: 'umd',
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