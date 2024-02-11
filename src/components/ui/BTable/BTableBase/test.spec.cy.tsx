import { mount } from 'cypress/react18';
import { describe, it } from 'local-cypress';
import React from 'react';
import BTableBase from '.';
import { ITableField } from './models/ITableField';

const generalList = [
	{ id: 1, name: 'Alex', balance: 5460 },
	{ id: 2, name: 'Francesco', balance: 3820 },
	{ id: 3, name: 'Totti', balance: 7190 },
];

const generalTableFields: ITableField[] = [
	{
		key: 'id',
		label: 'ID',
		sortable: true,
	},
	{
		key: 'name',
		label: 'Имя',
		sortable: true,
	},
];

describe('<BTableBase />', () => {

	it('mounts', () => {
		mount(
			<BTableBase
				testId='firstTest'
				data={generalList}
				fields={generalTableFields}
			/>
		);
		// check columns headings
		generalTableFields.forEach((item) => cy.getByTestId(`BTableBase-firstTest-${item.key}`).contains(item.label));
		// check table body content
		generalList.forEach((item) => {
			cy.getByTestId('BTableNode-' + item.id).should('exist');
			generalTableFields.forEach((field, index) => {
				cy.getByTestId(`BTableNode-${item.id}-field-${index}`).should('contain', item[field.key]);
			})
		});
	});

	it('rows with actions', () => {
		const tableFields: ITableField[] = [
			...generalTableFields,
			{
				key: 'balance',
				label: 'Баланс',
			},
		];
		mount(
			<BTableBase
				testId='firstTest'
				data={generalList}
				fields={tableFields}
				actions={[
					{
						type: 'save',
						method: () => {
							console.log('save')
						},
					},
					{
						type: 'delete',
						method: () => {
							console.log('delete');
						},
					}
				]}
			/>
		);
		// check columns headings
		tableFields.forEach((item) => cy.getByTestId(`BTableBase-firstTest-${item.key}`).contains(item.label));
		// check actions
		generalList.forEach((item) => {
			cy.getByTestId(`BTableNode-${item.id}-${'save'}`).should('exist');
			cy.getByTestId(`BTableNode-${item.id}-${'delete'}`).should('exist');
		});
	});
});
