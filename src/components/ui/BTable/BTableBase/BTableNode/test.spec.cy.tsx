import { mount } from 'cypress/react18';
import { describe, it } from 'local-cypress';
import React from 'react';
import BTableNode from '.';
import { ITableField } from '../models/ITableField';

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

describe('<BTableNode />', () => {

	it('mounts', () => {
		mount(
			<>
				{
					generalList.map((item) => (
						<BTableNode
							fields={generalTableFields}
							node={item}
						/>
					))
				}
			</>
		);
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
			<>
				{
					generalList.map((item, index) => (
						<BTableNode
							fields={tableFields}
							node={item}
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
					))
				}
			</>
		);
		generalList.forEach((item) => {
			cy.getByTestId(`BTableNode-${item.id}-${'save'}`).should('exist');
			cy.getByTestId(`BTableNode-${item.id}-${'delete'}`).should('exist');
		});
	});

	// it('edit filter fields and check values', () => {

	// });
});
