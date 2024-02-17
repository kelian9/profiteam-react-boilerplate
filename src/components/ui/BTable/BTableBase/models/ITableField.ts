import FieldType from '@models/enums/FieldTypeEnum';

export interface ITableField {
	keyName: string;
	label: string;
	sortable?: boolean;
	fieldType?: FieldType;
	props?: any;
	template?: JSX.Element;
}

export interface ITableFooterField {
	key: string;
	label?: string;
}
