import { IAction } from './IAction';
import { IField, IFootField } from './IField';
import { ITableOptions } from './ITableOptions';

interface IBTableBaseProps {
	data: any[];
	fields: IField[];
	footFields?: IFootField[];
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
