const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    // proxy: "https://formorder.gawebecik.com",
    proxy: "https://893e-36-72-213-239.ngrok-free.app",
  },
  transpileDependencies: ["vuetify", "bootstrap"],
});

