import FieldControlType from './enums/FieldControlTypeEnum';

export interface IFormField {
	name: string;
	keyName: string;
	controlType: FieldControlType;
	default?: string;
	required?: boolean;
	disabled?: boolean;
	multiple?: boolean;
}
