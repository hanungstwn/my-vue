const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: 'https://5252-36-72-216-131.ngrok-free.app'
  },
  transpileDependencies: [
    'vuetify',
    'bootstrap'
  ]
})
