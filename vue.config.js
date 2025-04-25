const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost', // PHP伺服器的網址與Port（例如XAMPP）
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
})
