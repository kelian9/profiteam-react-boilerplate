import FieldTypeEnum from '@models/enums/FieldTypeEnum';
import EntityNameEnum from './enums/EntityNameEnum';

export interface IEntityField {
	name: string;
	fieldType?: FieldTypeEnum;
	entityName?: EntityNameEnum;
	filterableRowName?: string;
	rowName?: string;
	localFiltering?: boolean;
	constName?: string;
}
