import TableType from '@models/enums/TableTypeEnum';
import { ITableField } from 'src/components/ui/BTable/BTableBase/models/ITableField';

export interface IEntityTable {
	type: TableType;
	tableFields: ITableField[];
}
