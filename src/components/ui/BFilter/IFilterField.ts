import FilterFieldType from '@models/enums/FilterFieldType';

export interface IGeneralFilterField<V> {
	fieldType?: FilterFieldType;
	id?: string;
	name?: string;
	keyName: string;
	placeholder?: string;
	label?: React.ReactNode;
	style?: React.CSSProperties;
	value: V;
	onChange?: (value: V | null) => void;
}

export interface IFilterSelect<T, V = number> extends IGeneralFilterField<V> {
	multiple?: boolean;
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
	onChange?: (value: V | null) => void;
}

export interface IFilterDatePicker extends IGeneralFilterField<string | Date | null> {
	format?: string;
	value: string | Date;
	onChange?: (value: string | Date | null) => void;
}

export interface IFilterCheckbox extends IGeneralFilterField<boolean | null> {
	color?: string;
	value: boolean;
	onChange?: (value: boolean | null) => void;
}

export interface IFilterRadio extends IGeneralFilterField<string | null> {
	text: string;
	value: string;
	onChange?: (value: string | null) => void;
}

export interface IFilterInput extends IGeneralFilterField<string> {
	type?: string;
	value: string;
	onChange?: (value: string | null) => void;
}

export interface IFilterFieldComponent {
	component: (field: IGeneralFilterField<any> & { key: string }) => React.ReactNode;
	fieldType?: FilterFieldType;
	id?: string;
	name?: string;
	keyName: string;
	placeholder?: string;
	label?: React.ReactNode;
	style?: React.CSSProperties;
	value?: any;
	onChange?: (value: any) => void;
}

type IFilterField =
	| IFilterInput
	| IFilterDatePicker
	| IFilterCheckbox
	| IFilterRadio
	| IFilterSelect<any, any>
	| IFilterFieldComponent;

export default IFilterField;
