import { IAction } from './IAction';
import { ITableField } from './ITableField';

interface IBTableNodeProps {
	node: any;
	fields: ITableField[];
	actions?: IAction[];
	rowClick?: (item?: any) => void;
	styleNode?: React.CSSProperties;
}

export default IBTableNodeProps;
