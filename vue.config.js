const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: 'http://103.146.202.69:8787/'
  },
  transpileDependencies: [
    'vuetify'
  ]
})
