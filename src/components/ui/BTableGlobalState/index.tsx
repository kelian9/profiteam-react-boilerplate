import React from 'react';
import BTable from '../BTable';

interface IBTableGlobalStateProps<V = number> {
	data: [];
	fields: [];
	footFields?: [];
	actions?: {};
	count?: V;
	perPage?: V;
	curPage?: V;
	fetchData?: () => void;
	changePage?: Function;
	resetPagination?: () => void;
	changeOrdering?: (sortBy: string) => void;
	rowClick?: Function;
	fieldClick?: Function;
	saveItem?: Function;
	editItem?: Function;
	deleteItem?: Function;
	style?: React.CSSProperties;
}

/* eslint-disable */
const BTableGlobalState = <T extends object, V = number>(props: IBTableGlobalStateProps<V>) => {
	const {
		data,
		fields,
		footFields,
		actions,
		count,
		perPage,
		curPage,
		fetchData,
		changePage,
		resetPagination,
		changeOrdering,
		rowClick,
		fieldClick,
		saveItem,
		editItem,
		deleteItem,
		style,
	} = props;

	const sortTable = (sortBy: string, sortDesc: boolean) => {
		if (sortDesc) {
			changeOrdering(sortBy);
		} else {
			changeOrdering(`-${sortBy}`);
		};
		resetPagination();
		setTimeout(() => {
			fetchData();
		}, 0);
	};

	const changeCurPage = (page: number) => {
		changePage(page);
		fetchData();
	};

	return (
		<BTable
			data={data}
			footFields={footFields}
			fieds={fields}
			actions={actions}
			count={count}
			perPage={perPage}
			curPage={curPage}
			fetchData={fetchData}
			resetPagination={resetPagination}
			changePage={changeCurPage}
			sortTable={sortTable}
			rowClick={rowClick}
			fieldClick={fieldClick}
			saveItem={saveItem}
			editItem={editItem}
			deleteItem={deleteItem}
			style={style}
		/>
	);
};

export default BTableGlobalState;
