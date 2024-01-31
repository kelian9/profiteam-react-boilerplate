import React, { useEffect, useState } from 'react';
import BTableBase from '../BTableBase';
import { IAction } from '../BTableBase/models/IAction';
import { IField, IFootField } from '../BTableBase/models/IField';
import { ITableOptions } from '../BTableBase/models/ITableOptions';

interface IBTableProps {
	fields: IField[];
	footFields?: IFootField[];
	actions?: IAction[];
	perPage?: number;
	getData?: (data?: any) => any;
	rowClick?: (item?: number | string) => void;
	tableOptions?: ITableOptions;
	style?: React.CSSProperties;
	styleNode?: React.CSSProperties;
}

/* eslint-disable */
const BTable = (props: IBTableProps) => {
	const {
		fields,
		footFields,
		actions,
		perPage,
		getData,
		rowClick,
		tableOptions,
		style,
		styleNode,
	} = props;

	const [data, setData] = useState<any[]>([]);
	const [sortData, setSortData] = useState<any>();
	const [count, setCount] = useState<number>(10);
	const [curPage, setCurPage] = useState<number>(1);

	const obtainData = () => {
		if (!getData) return;
		const data = {
			...sortData,
			_page: curPage,
			_limit: 10,
		}
		getData(data)
			.then((response: any) => {
				setData(response.data);
				// setCount(response.data.count);
			})
			.catch((error: any) => { })
	};

	const localTableOptions = {
		pagination: {
			enabled: tableOptions?.pagination?.enabled || false,
			method: (page: number) => setCurPage(page),
		},
		sort: {
			enabled: tableOptions?.sort?.enabled || false,
			method: (sortData: any) => setSortData(sortData),
		},
	}

	useEffect(() => {
		obtainData();
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
			getData={obtainData}
			resetPagination={() => setCurPage(1)}
			rowClick={rowClick}
			tableOptions={localTableOptions}
			style={style}
			styleNode={styleNode}
		/>
	);
};

export default BTable;
