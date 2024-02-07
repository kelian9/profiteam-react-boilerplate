import { defineConfig } from "cypress";
import webpackConfig from "./webpack/cypress";

module.exports = defineConfig({
	viewportHeight: 720,
	viewportWidth: 1280,
	retries: {
		runMode: 3,
		openMode: 0,
	},
	supportFolder: "cypress/support",
	component: {
		supportFile: "cypress/support/component.ts",
		devServer: {
			framework: "react",
			bundler: "webpack",
			webpackConfig,
		},
	},
	e2e: {
		modifyObstructiveCode: false,
		viedo: false,
		baseUrl: "http://localhost:3001",
	}
});
