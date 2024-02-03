import { IAction } from './IAction';
import { ITableField, ITableFooterField } from './ITableField';
import { ITableOptions } from './ITableOptions';

interface IBTableBaseProps {
	data: any[];
	fields: ITableField[];
	footFields?: ITableFooterField[];
	actions?: IAction[];
	count?: number;
	perPage?: number;
	curPage?: number;
	getData?: (data?: any) => any;
	resetPagination?: () => void;
	rowClick?: (itemId?: number | string) => void;
	tableOptions?: ITableOptions;
	style?: React.CSSProperties;
	styleNode?: React.CSSProperties;
}

export default IBTableBaseProps;
