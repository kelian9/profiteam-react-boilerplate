import { IAction } from './IAction';
import { ITableField, ITableFooterField } from './ITableField';
import { ITableOptions } from './ITableOptions';

interface IBTableBaseProps<T> {
	testId?: string;
	data: T[];
	fields: ITableField[];
	footFields?: ITableFooterField[];
	actions?: IAction<T>[];
	count?: number;
	perPage?: number;
	curPage?: number;
	getData?: (...args: any[]) => void;
	resetPagination?: () => void;
	rowClick?: (itemId?: number | string) => void;
	listOptions?: ITableOptions;
	style?: React.CSSProperties;
	styleNode?: React.CSSProperties;
}

export default IBTableBaseProps;
