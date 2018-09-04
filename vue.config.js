module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 7556,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:7555/',
        changeOrigin: true,
        xfwd: false,
      },
    },
  },
}
