import TableType from '@models/enums/TableTypeEnum';
import { ITableField, ITableFooterField } from 'src/components/ui/BTable/BTableBase/models/ITableField';

export interface IEntityTable {
	type: TableType;
	tableFields: ITableField[];
	footFields?: ITableFooterField[];
	limit?: number;
	rowClick?: (itemId?: number | string) => void;
	style?: React.CSSProperties;
	nodeStyle?: React.CSSProperties;
}
