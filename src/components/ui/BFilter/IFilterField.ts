import FieldType from '@models/enums/FieldType';

export interface IGeneralFilterField {
	fieldType: FieldType;
	id?: string;
	name: string;
	keyName: string;
	placeholder?: string;
	label?: React.ReactNode;
	style?: React.CSSProperties;
	value: any;
}

export interface IFilterSelect<T, V = number> extends IGeneralFilterField {
	multiple: boolean;
	value: V;
	disabled?: boolean;
	reduceListItem: (elem: T) => React.ReactNode;
	reduceElemName?: (elem: T) => string;
	reduceValue: (elem: T) => V;
	getMethod: Function;
	extraParams?: object;
	filterable?: boolean;
	searchQueryParam?: string;
	createMethod?: Function;
	onChange: (value: V | null) => void;
}

export interface IFilterDatePicker extends IGeneralFilterField {
	format?: string;
	value: string | Date;
}

export interface IFilterCheckbox extends IGeneralFilterField {
	color?: string;
	value: boolean;
}

export interface IFilterRadio extends IGeneralFilterField {
	text: string;
	value: string;
}

export interface IFilterInput extends IGeneralFilterField {
	type: string;
	value: string;
}

export interface IFilterFieldComponent extends IGeneralFilterField {
	component: React.ReactNode;
	value: any;
}

type IFilterField =
	| IFilterInput
	| IFilterDatePicker
	| IFilterCheckbox
	| IFilterRadio
	| IFilterSelect<any, any>
	| IFilterFieldComponent;

export default IFilterField;
