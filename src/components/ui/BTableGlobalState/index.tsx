import React from 'react';
import BTable from '../BTable';

interface IBTableGlobalStateProps {
	data: [];
	fields: any[];
	footFields?: any[];
	actions?: { save?: (el?: any) => void; edit?: (el?: any) => void; delete?: (el?: any) => void };
	count?: number;
	perPage?: number;
	curPage?: number;
	getData?: (data?: any) => void;
	changePage?: (page: number) => void;
	resetPagination?: () => void;
	// changeOrdering?: (sortBy: string) => void;
	rowClick?: (row?: any) => void;
	fieldClick?: (field?: any) => void;
	tableParams?: { pagination: Boolean; sort: Boolean };
	style?: React.CSSProperties;
}

/* eslint-disable */
const BTableGlobalState = <T extends object, V = number>(props: IBTableGlobalStateProps) => {
	const {
		data,
		fields,
		footFields,
		actions,
		count,
		perPage,
		curPage,
		getData,
		changePage,
		resetPagination,
		rowClick,
		fieldClick,
		tableParams,
		style,
	} = props;

	const sortTable = (sortBy: string, sortDesc: boolean) => {
		// if (sortDesc) {
		// 	changeOrdering(sortBy);
		// } else {
		// 	changeOrdering(`-${sortBy}`);
		// };
		if (!resetPagination) return;
		if (!getData) return;
		resetPagination();
		setTimeout(() => {
			getData();
		}, 0);
	};

	const changeCurPage = async (page: number) => {
		if (!changePage) return;
		changePage(page);
	};

	return (
		<BTable
			data={data}
			footFields={footFields}
			fields={fields}
			actions={actions}
			perPage={perPage}
			count={count}
			curPage={curPage}
			getData={getData}
			resetPagination={resetPagination}
			changePage={changeCurPage}
			rowClick={rowClick}
			fieldClick={fieldClick}
			tableParams={tableParams}
			style={style}
		/>
	);
};

export default BTableGlobalState;
