const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: 'https://a02e-36-72-217-210.ngrok-free.app'
  },
  transpileDependencies: [
    'vuetify',
    'bootstrap'
  ]
})
