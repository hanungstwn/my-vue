const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    // proxy: "https://formorder.gawebecik.com",
    proxy: "https://f3f0-125-163-149-53.ngrok-free.app",
  },
  transpileDependencies: ["vuetify", "bootstrap"],
});

