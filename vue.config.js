const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: "https://formorder.gawebecik.com",
    // proxy: "https://2b3b-36-72-216-172.ngrok-free.app",
  },
  transpileDependencies: ["vuetify", "bootstrap"],
});

