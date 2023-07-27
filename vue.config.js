const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: "https://formorder.gawebecik.com",
  },
  transpileDependencies: ["vuetify", "bootstrap"],
});

