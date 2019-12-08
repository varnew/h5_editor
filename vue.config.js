'use strict'

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 8098,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/demo': {
        target: 'http://193.112.72.172',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
