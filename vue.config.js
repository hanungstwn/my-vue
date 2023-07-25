const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: 'https://0e27-147-139-137-136.ngrok-free.app'
  },
  transpileDependencies: [
    'vuetify',
    'bootstrap'
  ]
})
