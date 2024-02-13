import FieldTypeEnum from '@models/enums/FieldTypeEnum';

export interface IEntityField {
	name: string;
	fieldType?: FieldTypeEnum;
	entityName?: string;
	filterableRowName?: string;
	rowName?: string;
	localFiltering?: boolean;
	constName?: string;
}
