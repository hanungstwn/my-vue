const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: "https://formorder.gawebecik.com",
    // proxy: "https://5aa3-36-72-213-239.ngrok-free.app",
  },
  transpileDependencies: ["vuetify", "bootstrap"],
});

