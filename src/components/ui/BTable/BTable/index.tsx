import IErrorResponse from '@models/responses/IErrorResponse';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import BTableBase from '../BTableBase';
import { IAction } from '../BTableBase/models/IAction';
import { ITableField, ITableFooterField } from '../BTableBase/models/ITableField';
import { ITableOptions } from '../BTableBase/models/ITableOptions';

interface IBTableProps<T> {
	fields: ITableField[];
	getData: (...args: any[]) => Promise<AxiosResponse<T[] | IErrorResponse> | T[]>;
	footFields?: ITableFooterField[];
	actions?: IAction[];
	limit?: number;
	rowClick?: ((item?: number | string) => void) | null;
	listOptions?: ITableOptions;
	style?: React.CSSProperties;
	nodeStyle?: React.CSSProperties;
}

const BTable = <T extends object>(props: IBTableProps<T>) => {
	const { fields, footFields, actions, limit, getData, rowClick, listOptions, style, nodeStyle } = props;

	const [data, setData] = useState<T[]>([]);
	const [sortData, setSortData] = useState<any>();
	const [count, setCount] = useState<number>(10);
	const [curPage, setCurPage] = useState<number>(1);

	const fetchData = () => {
		const data = {
			...sortData,
			_page: curPage,
			_limit: limit,
		};
		getData(data)
			.then((response: any) => {
				setData(response.data as T[]);
				setCount(10);
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	const complexListOptions = {
		pagination: {
			enabled: listOptions?.pagination?.enabled || false,
			method: (page: number) => setCurPage(page),
		},
		sort: {
			enabled: listOptions?.sort?.enabled || false,
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
			limit={limit}
			curPage={curPage}
			getData={fetchData}
			resetPagination={() => setCurPage(1)}
			rowClick={rowClick}
			listOptions={complexListOptions}
			style={style}
			nodeStyle={nodeStyle}
		/>
	);
};

export default BTable;
