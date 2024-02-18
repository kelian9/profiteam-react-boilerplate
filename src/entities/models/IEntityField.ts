import FieldTypeEnum from '@models/enums/FieldTypeEnum';
import EntityNameEnum from '../../models/enums/EntityNameEnum';

export interface IEntityField {
	[key: string]: {
		name: string;
		keyName: string;
		fieldType?: FieldTypeEnum;
		entityName?: EntityNameEnum;
		label?: string;
		filterableRowName?: string;
		rowName?: string;
		localFiltering?: boolean;
		constName?: string;
	};
}
