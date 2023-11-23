const { merge } = require("webpack-merge");
const base = require("./base.js");
const webpack = require("webpack");

module.exports = merge(base, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    port: 3001,
    hot: true,
    client: {
      overlay: false,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.REACT_APP_VERSION": JSON.stringify("cypress"),
    }),
  ],
});