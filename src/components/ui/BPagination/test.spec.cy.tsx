import { mount } from 'cypress/react18';
import { describe, expect, it } from 'local-cypress';
import React from 'react';
import BPagination from '.';

describe('<BPagination />', () => {
	const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const pageSize = 3;

	it('mounts', () => {
		let page = 1;
		mount(
			<BPagination
				pageCount={Math.ceil(data.length / pageSize)}
				currentPage={page}
				handlePageChange={(e) => (page = e)}
			/>,
		);
		cy.getByTestId('BPagination').should('exist');
		for (let i = 0; i < Math.ceil(data.length / pageSize); i++) {
			cy.getByTestId('pageControl' + (i + 1));
		}
	});

	it('go to the next page', () => {
		let page = 1;
		mount(
			<BPagination
				pageCount={Math.ceil(data.length / pageSize)}
				currentPage={page}
				handlePageChange={(e) => (page = e)}
			/>,
		);
		cy.clickNextPage();
		cy.wait(200).then(() => expect(page).to.equal(2));
		cy.clickNextPage();
		cy.wait(200).then(() => expect(page).to.equal(3));
		cy.clickNextPage();
		cy.wait(200).then(() => expect(page).to.equal(4));
		cy.clickNextPage();
		cy.wait(200).then(() => expect(page).to.equal(4));
	});

	it('go to the previous page', () => {
		let page = 2;
		mount(
			<BPagination
				pageCount={Math.ceil(data.length / pageSize)}
				currentPage={page}
				handlePageChange={(e) => (page = e)}
			/>,
		);
		cy.clickPreviousPage();
		cy.wait(200).then(() => expect(page).to.equal(1));
		cy.clickPreviousPage();
		cy.wait(200).then(() => expect(page).to.equal(1));
	});

	it('go to the 3rd page', () => {
		let page = 2;
		mount(
			<BPagination
				pageCount={Math.ceil(data.length / pageSize)}
				currentPage={page}
				handlePageChange={(e) => (page = e)}
			/>,
		);
		cy.getByTestId('pageControl' + 3).click();
		cy.wait(200).then(() => expect(page).to.equal(3));
	});
});
