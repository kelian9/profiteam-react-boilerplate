/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');

module.exports = {
	description: 'Add an unconnected component',
	prompts: [
		{
			type: 'input',
			name: 'path',
			message: 'Where it should be?',
			default: 'views/',
		},
		{
			type: 'input',
			name: 'name',
			message: 'What should it be called?',
			default: 'Button',
			validate: (value) => {
				if (/.+/.test(String(value))) {
					return componentExists(value) ? 'A component or container with this name already exists' : true;
				}

				return 'The name is required';
			},
		},
		{
			type: 'confirm',
			name: 'memo',
			default: false,
			message: 'Do you want to wrap your component in React.memo?',
		},
		{
			type: 'confirm',
			name: 'wantLoadable',
			default: false,
			message: 'Do you want to load the component asynchronously?',
		},
	],
	actions: (data) => {
		// Generate index.tsx and test.spec.cy.tsx
		const actions = [
			{
				type: 'add',
				path: '../../src/components/{{path}}{{properCase name}}/index.tsx',
				templateFile: './component/index.tsx.hbs',
				abortOnFail: true,
			},
			{
				type: 'add',
				path: '../../src/components/{{path}}{{properCase name}}/test.spec.cy.tsx',
				templateFile: './component/test.tsx.hbs',
				abortOnFail: true,
			},
		];

		// If the user wants Loadable.tsx to load the component asynchronously
		if (data && data.wantLoadable) {
			actions.push({
				type: 'add',
				path: '../../src/components/{{path}}{{properCase name}}/Loadable.tsx',
				templateFile: './component/loadable.tsx.hbs',
				abortOnFail: true,
			});
		}

		return actions;
	},
};
