import { IAction } from './IAction';
import { ITableField, ITableFooterField } from './ITableField';
import { ITableOptions } from './ITableOptions';

interface IBTableBaseProps<T> {
	data: T[];
	fields: ITableField[];
	footFields?: ITableFooterField[];
	actions?: IAction[];
	count?: number;
	limit?: number;
	curPage?: number;
	getData?: (...args: any[]) => void;
	resetPagination?: () => void;
	rowClick?: (itemId?: number | string) => void | null;
	listOptions?: ITableOptions;
	style?: React.CSSProperties;
	nodeStyle?: React.CSSProperties;
}

export default IBTableBaseProps;
