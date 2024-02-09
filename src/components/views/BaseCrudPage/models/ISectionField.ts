import FieldTypeEnum from '@models/enums/FieldTypeEnum';

export interface ISectionField {
	key: string;
	label: string;
	type?: FieldTypeEnum;
	entityName?: string;
	filterableRowName?: string;
	rowName?: string;
	localFiltering?: boolean;
	constName?: string;
	sortable?: boolean;
	props?: any[];
	template?: JSX.Element;
}
