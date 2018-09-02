// const path = require('path')
// const resolve = file => path.resolve(__dirname, file)

module.exports = {
  // assetsDir: 'static',
  // css: {
  //   loaderOptions: {
  //     stylus: {
  //       import: [resolve('./src/assets/styles/theme')],
  //     },
  //   },
  // },
  devServer: {
    host: '0.0.0.0',
    port: 3003,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:7555/',
        changeOrigin: true,
        xfwd: false,
      },
    },
  },
  transpileDependencies: ['mand-mobile'],
}
