import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import BTableBase from '../BTableBase';
import { IAction } from '../BTableBase/models/IAction';
import { ITableField, ITableFooterField } from '../BTableBase/models/ITableField';
import { ITableOptions } from '../BTableBase/models/ITableOptions';

interface IBTableProps<T> {
	fields: ITableField[];
	footFields?: ITableFooterField[];
	actions?: IAction[];
	perPage?: number;
	getData?: (...args: any) => Promise<AxiosResponse | T>;
	rowClick?: (item?: number | string) => void;
	tableOptions?: ITableOptions;
	style?: React.CSSProperties;
	styleNode?: React.CSSProperties;
}

const BTable = <T extends object>(props: IBTableProps<T>) => {
	const { fields, footFields, actions, perPage, getData, rowClick, tableOptions, style, styleNode } = props;

	const [data, setData] = useState<any[]>([]);
	const [sortData, setSortData] = useState<any>();
	const [count, setCount] = useState<number>(10);
	const [curPage, setCurPage] = useState<number>(1);

	const fetchData = () => {
		if (!getData) return;
		const data = {
			...sortData,
			_page: curPage,
			_limit: 10,
		};
		getData(data)
			.then((response: any) => {
				setData(response.data.results as any[]);
				setCount(response.data.count as number);
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	const complexListOptions = {
		pagination: {
			enabled: tableOptions?.pagination?.enabled || false,
			method: (page: number) => setCurPage(page),
		},
		sort: {
			enabled: tableOptions?.sort?.enabled || false,
			method: (sortData: any) => setSortData(sortData),
		},
	};

	useEffect(() => {
		fetchData();
	}, [curPage, sortData]);

	return (
		<BTableBase
			data={data}
			fields={fields}
			footFields={footFields}
			actions={actions}
			count={count}
			perPage={perPage}
			curPage={curPage}
			getData={fetchData}
			resetPagination={() => setCurPage(1)}
			rowClick={rowClick}
			tableOptions={complexListOptions}
			style={style}
			styleNode={styleNode}
		/>
	);
};

export default BTable;
