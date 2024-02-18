import { IAction } from './IAction';
import { ITableField } from './ITableField';

interface IBTableNodeProps<T> {
	node: T;
	fields: ITableField[];
	actions?: IAction[];
	rowClick?: (itemId?: number | string) => void;
	nodeStyle?: React.CSSProperties;
}

export default IBTableNodeProps;
