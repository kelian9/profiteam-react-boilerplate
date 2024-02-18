import TableType from '@models/enums/TableTypeEnum';
import { IAction } from 'src/components/ui/BTable/BTableBase/models/IAction';
import { ITableField, ITableFooterField } from 'src/components/ui/BTable/BTableBase/models/ITableField';

export interface IEntityTable {
	type: TableType;
	tableFields: ITableField[];
	actions?: IAction[];
	footFields?: ITableFooterField[];
	limit?: number;
	rowClick?: (itemId?: number | string) => void;
	style?: React.CSSProperties;
	nodeStyle?: React.CSSProperties;
}
