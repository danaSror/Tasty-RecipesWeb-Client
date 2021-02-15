const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')


module.exports = {
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ],
  },
  runtimeCompiler: true,
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    host: "localhost",
  },
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};


// vue.config.js


