import { IAction } from './IAction';
import { ITableField } from './ITableField';

interface IBTableNodeProps<T> {
	node: T;
	fields: ITableField[];
	actions?: IAction<T>[];
	rowClick?: (itemId?: number | string) => void;
	styleNode?: React.CSSProperties;
}

export default IBTableNodeProps;
