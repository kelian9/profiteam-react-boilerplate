import { mount } from 'cypress/react18';
import { describe, expect, it } from 'local-cypress';
import React from 'react';
import BSelect from '.';

describe('<BSelect>', () => {
	const data = [
		{ id: 1, name: 'elem 1' },
		{ id: 2, name: 'elem 2' },
		{ id: 3, name: 'elem 3' },
	];

	it('mounts', () => {
		let val = null;
		mount(
			<BSelect
				value={val}
				getMethod={({ name }: { name: string }) => {
					console.log('getList');
					if (name) {
						return data.filter((elem) => elem.name.includes(name));
					}
					return data;
				}}
				label='TestSelect'
				reduceListItem={(elem) => elem.name}
				reduceValue={(elem) => elem.id}
				searchQueryParam='name'
				onChange={(e) => (val = e)}
			/>,
		);
		cy.get('label').should('contains.text', 'TestSelect');
		cy.get('input').should('exist');
	});

	it('select item', () => {
		let val = 1;
		mount(
			<BSelect
				value={val}
				getMethod={({ name }: { name: string }) => {
					console.log('getList');
					if (name) {
						return data.filter((elem) => elem.name.includes(name));
					}
					return data;
				}}
				label='TestSelect'
				reduceListItem={(elem) => elem.name}
				reduceValue={(elem) => elem.id}
				searchQueryParam='name'
				onChange={(e) => (val = e)}
			/>,
		);
		cy.get('input').focus();
		cy.getByTestId('TestSelect2').click();
		cy.get('input').should('contain.value', 'elem 2');
		cy.get('input').blur();
		cy.wait(500).then(() => {
			expect(val).to.equal(2);
			cy.get('ul').should('not.exist');
		});
	});

	it('search items', () => {
		let val = 1;
		mount(
			<BSelect
				value={val}
				getMethod={({ name }: { name: string }) => {
					console.log('getList');
					if (name) {
						return data.filter((elem) => elem.name.includes(name));
					}
					return data;
				}}
				label='TestSelect'
				reduceListItem={(elem) => elem.name}
				reduceValue={(elem) => elem.id}
				searchQueryParam='name'
				onChange={(e) => (val = e)}
			/>,
		);
		cy.get('input').focus().type('elem 3');
		cy.getByTestId('TestSelect2').should('not.exist');
		cy.getByTestId('TestSelect3').should('exist');
	});

	// Test item creation
});
