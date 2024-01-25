import React, { useState } from 'react';
import BTable from '../BTable';

interface IBTableLocalStateProps {
	fields: any[];
	footFields?: [];
	actions?: {};
	perPage?: number;
	fetchData?: (data?: any) => void;
	rowClick?: () => void;
	fieldClick?: () => void;
	tableParams?: any;
	style?: React.CSSProperties;
}

/* eslint-disable */
const BTableLocalState = (props: IBTableLocalStateProps) => {
	const {
		fields,
		footFields,
		actions,
		perPage = 20,
		fetchData,
		rowClick,
		fieldClick,
		tableParams,
		style,
	} = props;

	const [data, setData] = useState<any[]>([
		{
			name: 'Test 1',
			id: 1,
			work: 'Student',
		},
		{
			name: 'Test 2',
			id: 2,
			work: 'Men',
		},
		{
			name: 'Test 3',
			id: 3,
			work: 'Krutoy',
		},
	]);
	const [sort, setSort] = useState<string>('');
	const [count, setCount] = useState<number>(0);
	const [curPage, setCurPage] = useState<number>(1);

	const sortTable = (sortBy: string, sortDesc: boolean) => {
		if (sortDesc) {
			setSort(sortBy);
		} else {
			setSort(`-${sortBy}`);
		};
		resetPagination();
		setTimeout(() => {
			fetchItems();
		}, 0);
	};

	const changePage = (page: number) => {
		setCurPage(page);
		fetchItems();
	};

	const resetPagination = () => {
		setCurPage(1);
	};

	const fetchItems = () => {
		if (!fetchData) return;
		const data = {
			sort: sort,
			offset: ((curPage - 1) * perPage),
			limit: perPage,
		}
		fetchData()
			.then((response: any) => {
				setData(response.data.results);
				setCount(response.data.count);
			})
			.catch((error: any) => { })
	};

	return (
		<BTable
			data={data}
			fields={fields}
			footFields={footFields}
			actions={actions}
			count={count}
			perPage={perPage}
			curPage={curPage}
			fetchData={fetchData}
			resetPagination={resetPagination}
			changePage={changePage}
			sortTable={sortTable}
			rowClick={rowClick}
			fieldClick={fieldClick}
			tableParams={tableParams}
			style={style}
		/>
	);
};

export default BTableLocalState;
