import React, { useEffect, useState } from 'react';
import BTable from '../BTable';

interface IBTableLocalStateProps {
	fields: any[];
	footFields?: any[];
	actions?: { save?: (el?: any) => void; edit?: (el?: any) => void; delete?: (el?: any) => void };
	perPage?: number;
	getData?: (data?: any) => void;
	rowClick?: (row?: any) => void;
	fieldClick?: (field?: any) => void;
	tableParams?: { pagination: Boolean; sort: Boolean };
	style?: React.CSSProperties;
}

/* eslint-disable */
const BTableLocalState = (props: IBTableLocalStateProps) => {
	const {
		fields,
		footFields,
		actions,
		perPage = 20,
		getData,
		rowClick,
		fieldClick,
		tableParams,
		style,
	} = props;

	const [data, setData] = useState<any[]>([]);
	// const [sort, setSort] = useState<string>('');
	const [count, setCount] = useState<number>(10);
	const [curPage, setCurPage] = useState<number>(1);

	const sortTable = (sortBy: string, sortDesc: boolean) => {
		// add sort method
		setCurPage(1);
		setTimeout(() => {
			getItems();
		}, 0);
	};

	const getItems = () => {
		if (!getData) return;
		const data = {
			// sort: sort,
			_page: curPage,
			_limit: 10,
		}
		getData(data)
			.then((response: any) => {
				// console.log(response);
				setData(response.data);
				// setCount(response.data.count);
			})
			.catch((error: any) => { })
	};

	useEffect(() => {
		getItems();
	}, [curPage])

	return (
		<BTable
			data={data}
			fields={fields}
			footFields={footFields}
			actions={actions}
			count={count}
			perPage={perPage}
			curPage={curPage}
			getData={getItems}
			resetPagination={() => setCurPage(1)}
			changePage={setCurPage}
			sortTable={sortTable}
			rowClick={rowClick}
			fieldClick={fieldClick}
			tableParams={tableParams}
			style={style}
		/>
	);
};

export default BTableLocalState;
