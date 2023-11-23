const { merge } = require("webpack-merge");
const base = require("./base.js");
const webpack = require("webpack");
  
module.exports = merge(base, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    port: 8080,
    hot: true,
    open: true,
  },
  plugins: [
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
});