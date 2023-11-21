const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    proxy: "https://order.gawebecik.id",
    // proxy: "https://formorder.gawebecik.com",
    // proxy: "https://arjuna-backend.gawebecik.com/api",
  },
  transpileDependencies: ["vuetify", "bootstrap"],
});

