import React from 'react';
import BTableBase from '../BTableBase';
import { IAction } from '../BTableBase/models/IAction';
import { ITableField, ITableFooterField } from '../BTableBase/models/ITableField';
import { ITableOptions } from '../BTableBase/models/ITableOptions';

interface IBTableStoreProps {
	data: any[];
	fields: ITableField[];
	footFields?: ITableFooterField[];
	actions?: IAction[];
	count?: number;
	perPage?: number;
	curPage?: number;
	getData?: (data?: any) => any;
	resetPagination?: () => void;
	rowClick?: (item?: number | string) => void;
	tableOptions?: ITableOptions;
	style?: React.CSSProperties;
	styleNode?: React.CSSProperties;
}

const BTableStore = (props: IBTableStoreProps) => {
	const {
		data,
		fields,
		footFields,
		actions,
		count,
		perPage,
		curPage,
		getData,
		resetPagination,
		rowClick,
		tableOptions,
		style,
		styleNode,
	} = props;

	return (
		<BTableBase
			data={data}
			footFields={footFields}
			fields={fields}
			actions={actions}
			perPage={perPage}
			count={count}
			curPage={curPage}
			getData={getData}
			resetPagination={resetPagination}
			rowClick={rowClick}
			tableOptions={tableOptions}
			style={style}
			styleNode={styleNode}
		/>
	);
};

export default BTableStore;
