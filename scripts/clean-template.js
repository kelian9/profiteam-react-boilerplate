const shell = require('shelljs');
const addCheckMark = require('./helpers/checkmark.js');

if (!shell.which('git')) {
	shell.echo('Sorry, this script requires git');
	shell.exit(1);
}

if (!shell.test('-e', 'scripts/templates')) {
	shell.echo('The example is deleted already.');
	shell.exit(1);
}

process.stdout.write('Cleanup started...');

// Handle views/
shell.rm('-rf', 'src/components/views/Home');
shell.mv('scripts/templates/components/views/Home', 'src/components/views');

// Cleanup e2e tests and gitbook yaml file
shell.rm('-rf', 'cypress/e2e/*');
shell.rm('-rf', '.gitbook.yaml');

// Replace the files in the root src/ folder
shell.cp('scripts/templates/index.scss', 'src/index.scss');

// Remove the templates folder
shell.rm('-rf', 'scripts/templates');

addCheckMark();

// Commit the changes
// if (
// 	shell.exec('git add . --all && git commit -qm "Remove default example"')
// 		.code !== 0
// ) {
// 	shell.echo('\nError: Git commit failed');
// 	shell.exit(1);
// }

shell.echo('\nCleanup done. Happy Coding!!!');
