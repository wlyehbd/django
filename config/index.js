// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var url = 'http://dm.1024.zhugefang.com/'
var url_offline = 'http://127.0.0.1:8000'
var data = {
  build: {
    sitEnv: require('./sit.env'),
    prodEnv: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',          // 请根据自己路径配置更改
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8089,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/spider': {
      //   target: url,
      //   changeOrigin: true
      // },
      // '/dm': {
      //   target: url,
      //   changeOrigin: true
      // },
      // '/etl': {
      //   target: url,
      //   changeOrigin: true
      // },
      // '/user': {
      //   target: url,
      //   changeOrigin: true
      // },
      // '/borough': {
      //   target: url,
      //   changeOrigin: true
      // }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

data.getProxyTable = function(proxy){
  console.log(proxy)
  if (proxy === 'offline') {
    for (var i in data.dev.proxyTable) {
      data.dev.proxyTable[i].target = url_offline
    }
  }
  return data.dev.proxyTable
}

module.exports = data
