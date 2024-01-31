import { IAction } from './IAction';
import { IField } from './IField';

interface IBTableNodeProps {
	node: any;
	fields: IField[];
	actions?: IAction[];
	rowClick?: (item?: any) => void;
	styleNode?: React.CSSProperties;
}

export default IBTableNodeProps;
