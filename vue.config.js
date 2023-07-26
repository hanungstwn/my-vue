const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: "https://ef54-147-139-137-136.ngrok-free.app",
  },
  transpileDependencies: ["vuetify", "bootstrap"],
});

