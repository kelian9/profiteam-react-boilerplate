import TableTypes from '@models/enums/TableTypeEnum';
import { IAction } from 'src/components/ui/BTable/BTableBase/models/IAction';
import { ITableField, ITableFooterField } from 'src/components/ui/BTable/BTableBase/models/ITableField';
import { ITableOptions } from 'src/components/ui/BTable/BTableBase/models/ITableOptions';

export interface ISectionTable<T> {
	type: TableTypes;
	data?: T[];
	fields: ITableField[];
	footFields?: ITableFooterField[];
	actions?: IAction<T>[];
	count?: number;
	perPage?: number;
	curPage?: number;
	resetPagination?: () => void;
	rowClick?: (item?: number | string) => void;
	listOptions?: ITableOptions;
	style?: React.CSSProperties;
	styleNode?: React.CSSProperties;
}
