import React from 'react';
import BTableBase from '../BTableBase';
import { IAction } from '../BTableBase/models/IAction';
import { ITableField, ITableFooterField } from '../BTableBase/models/ITableField';
import { ITableOptions } from '../BTableBase/models/ITableOptions';

interface IBTableStoreProps<T> {
	data: T[];
	fields: ITableField[];
	getData: (...args: any[]) => void;
	footFields?: ITableFooterField[];
	actions?: IAction<T>[];
	count?: number;
	limit?: number;
	curPage?: number;
	resetPagination?: () => void;
	rowClick?: (item?: number | string) => void;
	listOptions?: ITableOptions;
	style?: React.CSSProperties;
	styleNode?: React.CSSProperties;
}

const BTableStore = <T extends object>(props: IBTableStoreProps<T>) => {
	const {
		data,
		fields,
		footFields,
		actions,
		count,
		limit,
		curPage,
		getData,
		resetPagination,
		rowClick,
		listOptions,
		style,
		styleNode,
	} = props;

	return (
		<BTableBase
			data={data}
			footFields={footFields}
			fields={fields}
			actions={actions}
			limit={limit}
			count={count}
			curPage={curPage}
			getData={getData}
			resetPagination={resetPagination}
			rowClick={rowClick}
			listOptions={listOptions}
			style={style}
			styleNode={styleNode}
		/>
	);
};

export default BTableStore;
