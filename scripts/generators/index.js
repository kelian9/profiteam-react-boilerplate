const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const componentGenerator = require('./component/index.js');

/**
 * Every generated backup file gets this extension
 * @type {string}
 */
const BACKUPFILE_EXTENSION = 'rbgen';

module.exports = (plop) => {
	plop.setGenerator('component', componentGenerator);
	plop.setHelper('directory', (comp) => {
		try {
			fs.accessSync(path.join(__dirname, `../../src/components/${comp}`), fs.constants.F_OK);
			return `components/${comp}`;
		} catch (e) {
			console.log('error in directory helper');
		}
	});
	plop.setHelper('curly', (object, open) => (open ? '{' : '}'));
	plop.setActionType('prettify', (answers, config) => {
		const folderPath = `${path.join(
			__dirname,
			'../../src/components/',
			String(config.path),
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			plop.getHelper('properCase')(answers.name),
			'**',
			'**.tsx',
		)}`;

		try {
			execSync(`npm run prettify -- "${folderPath}"`);
			return folderPath;
		} catch (err) {
			throw err;
		}
	});
	plop.setActionType('backup', (answers, config) => {
		try {
			fs.copyFileSync(
				path.join(__dirname, String(config.path), String(config.file)),
				path.join(__dirname, String(config.path), `${config.file}.${BACKUPFILE_EXTENSION}`),
			);
			return path.join(__dirname, String(config.path), `${config.file}.${BACKUPFILE_EXTENSION}`);
		} catch (err) {
			throw err;
		}
	});
}

// export default BACKUPFILE_EXTENSION;
