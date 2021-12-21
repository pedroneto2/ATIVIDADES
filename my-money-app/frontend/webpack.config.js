const webpack = require("webpack");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: __dirname + "/public",
    filename: "./app.js",
  },
  devServer: {
    port: 8080,
    contentBase: "./public",
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      modules: __dirname + "/node_modules",
      // jquery: "modules/admin-lte/plugins/jQuery/jquery-2.2.3.min.js",
      // bootstrap: "modules/admin-lte/bootstrap/js/bootstrap.js",
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
  module: {
    rules: [
      {
        test: /.js[x]?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"],
            plugins: ["transform-object-rest-spread"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.woff|.woff2|.ttf|.svg|.eot|.png|.jpg*.*$/,
        loader: "file-loader",
      },
    ],
  },
};
