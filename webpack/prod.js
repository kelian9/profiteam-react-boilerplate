const { merge } = require("webpack-merge");
const base = require("./base.js");
const path = require("path");
const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;


module.exports = merge(base, {
	mode: "production",
	devtool: "source-map",
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, '../dist'),
	},
	optimization: {
		minimize: true,
		usedExports: true,
		splitChunks: {
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				react: {
					test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
					name: "react",
					priority: 5,
				},
				lodash: {
					test: /[\\/]node_modules[\\/](lodash)[\\/]/,
					name: "lodash",
					priority: 5,
				},
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					priority: 1,
				},
			},
		},
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
	plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production"),
        }),
		new CaseSensitivePathsPlugin(),
		process.env.ANALYZE && new BundleAnalyzerPlugin(),
	].filter((x) => x),
});