import TableTypes from '@models/enums/TableTypeEnum';
import { IAction } from 'src/components/ui/BTable/BTableBase/models/IAction';
import { ITableField } from 'src/components/ui/BTable/BTableBase/models/ITableField';
import { ITableOptions } from 'src/components/ui/BTable/BTableBase/models/ITableOptions';

export interface IEntityTable<T> {
	type: TableTypes;
	tableFields: ITableField[];
	actions?: IAction<T>[];
	listOptions?: ITableOptions;
}
