import TableTypes from '@models/enums/TableTypeEnum';
import { IAction } from 'src/components/ui/BTable/BTableBase/models/IAction';
import { ITableField, ITableFooterField } from 'src/components/ui/BTable/BTableBase/models/ITableField';
import { ITableOptions } from 'src/components/ui/BTable/BTableBase/models/ITableOptions';

export interface IEntityTable<T> {
	type: TableTypes;
	data?: T[];
	tableFields: ITableField[];
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
