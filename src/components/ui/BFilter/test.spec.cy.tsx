import { mount } from 'cypress/react18';
import { describe, it } from 'local-cypress';
import React from 'react';
import BFilter from '.';
import { FilterComponentField, FilterDatePickerField, FilterInputField, FilterSelectField } from './FilterField';
import IFilterField from './IFilterField';

const usersList = [
	{ id: 1, name: 'Alex' },
	{ id: 2, name: 'Francesco' },
	{ id: 3, name: 'Totti' },
];

let filterParams: Record<string, any> = {
	search: '',
	userId: null,
	dateCreated: '2024-05-05',
	custom: '',
};

const filterFields: IFilterField[] = [
	new FilterInputField({
		keyName: 'search',
		name: 'Поиск',
		value: filterParams.search,
		label: 'Поиск',
	}),
	new FilterSelectField({
		keyName: 'userId',
		label: 'Пользователь',
		getMethod: () => usersList,
		reduceListItem: (elem) => elem.name,
		reduceValue: (elem) => elem.id,
		value: filterParams?.userId ?? null,
		searchQueryParam: 'name',
	}),
	new FilterDatePickerField({
		keyName: 'dateCreated',
		label: 'Date Created',
		value: filterParams.dateCreated,
	}),
	new FilterComponentField({
		keyName: 'custom',
		value: filterParams.custom,
		component: ({ keyName, value, key, onChange }) =>
			<input type='text' data-testid={'BFilterFieldKey-' + keyName} key={key} value={value} onChange={(e) => onChange(e.target.value)} />,
	})
];

describe('<BFilter />', () => {

	it('mounts', () => {
		mount(
			<BFilter
				filterFields={filterFields}
				redefineValuesDep={false}
				realTime={false}
				onChange={(e) => filterParams = e}
			/>
		);
		cy.getByTestId('BFilter').should('exist');
	});

	it('edit filter fields and check values', () => {
		mount(
			<BFilter
				filterFields={filterFields}
				redefineValuesDep={false}
				realTime={true}
				onChange={(e) => filterParams = e}
			/>
		);

		// Type text in input and check it's value
		cy.getByTestId('BFilterFieldKey-search').click().type('Andrey', { force: true });
		cy.getByTestId('BFilterFieldKey-search').should('have.value', 'Andrey');

		// Select entity
		cy.getByTestId('BFilterFieldKey-userId').find('input').focus();
		cy.getByTestId('Пользователь' + 1).click();

		// Type date
		cy.getByTestId('BFilterFieldKey-dateCreated').type('2022-11-11').blur();

		// Check that custom field (component) works
		cy.getByTestId('BFilterFieldKey-custom').type('custom value');
		cy.getByTestId('BFilterFieldKey-custom').should('have.value', 'custom value');

		// Check that filter has the expected value
		cy.wait(200).then(() => {
			expect(filterParams).to.deep.equal({
				search: 'Andrey',
				userId: 1,
				dateCreated: '2022-11-11',
				custom: 'custom value',
			});
			filterParams.search = '';
			filterParams.userId = null;
			filterParams.dateCreated = null;
			filterParams.custom = null;
		});
	});

	it('edit filter field from outside', () => {
		let redefineValuesDep = false;
		mount(
			<BFilter
				filterFields={filterFields}
				redefineValuesDep={redefineValuesDep}
				realTime={true}
				onChange={(e) => filterParams = e}
			/>
		);

		// Type text in input and check it's value
		cy.getByTestId('BFilterFieldKey-search').click().type('Alex', { force: true });
		cy.getByTestId('BFilterFieldKey-search').should('have.value', 'Alex');

		cy.wait(500).then(() => {
			filterParams.search = 'Mike';
			filterFields[0].value = 'Mike';
			redefineValuesDep = true;
		});

		// Select entity
		cy.getByTestId('BFilterFieldKey-userId').find('input').focus();
		cy.getByTestId('Пользователь' + 1).click();

		// Check search value attr (do it after sth else, because value changes asynchronously)
		cy.wait(200).then(() => {
			cy.getByTestId('BFilterFieldKey-search').should('have.value', 'Mike');
		});

		// Check that filter has the expected value
		cy.wait(200).then(() => {
			expect(filterParams).to.deep.equal({
				search: 'Mike',
				userId: 1,
				dateCreated: '2024-05-05',
				custom: '',
			});
			filterParams.search = '';
			filterParams.userId = null;
			filterParams.dateCreated = null;
			filterParams.custom = null;
		});
	})
});
