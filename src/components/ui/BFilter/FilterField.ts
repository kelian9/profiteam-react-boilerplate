import FilterFieldType from '@models/enums/FilterFieldType';
import {
	IFilterCheckbox,
	IFilterDatePicker,
	IFilterFieldComponent,
	IFilterInput,
	IFilterRadio,
	IFilterSelect,
	IGeneralFilterField,
} from './IFilterField';

class FilterField<V> implements IGeneralFilterField<V> {
	constructor(field: IGeneralFilterField<V>) {
		this.fieldType = field.fieldType;
		this.id = field.id;
		this.name = field.name;
		this.keyName = field.keyName;
		this.placeholder = field.placeholder;
		this.label = field.label;
		this.style = field.style;
		this.value = field.value;
		this.onChange = field.onChange;
	}

	public fieldType?: FilterFieldType;
	public id?: string;
	public name?: string;
	public keyName: string;
	public placeholder?: string;
	public label?: React.ReactNode;
	public style?: React.CSSProperties;
	public value: any;
	public onChange?: (value: V | null) => void;
}

export class FilterInputField extends FilterField<string | null> implements IFilterInput {
	constructor(field: IFilterInput) {
		field.fieldType = FilterFieldType.INPUT;
		super(field);
		this.type = field.type ? field.type : 'text';
		this.onChange = field.onChange;
	}
	public type?: string;
	public onChange?: (value: string | null) => void;
}

export class FilterDatePickerField extends FilterField<string | Date | null> implements IFilterDatePicker {
	constructor(field: IFilterDatePicker) {
		field.fieldType = FilterFieldType.DATEPICKER;
		super(field);
		this.value = String(field.value);
		this.onChange = field.onChange;
	}
	public value: string | Date;
	public format?: string;
	public onChange?: (value: string | Date | null) => void;
}

export class FilterCheckboxField extends FilterField<boolean | null> implements IFilterCheckbox {
	constructor(field: IFilterCheckbox) {
		field.fieldType = FilterFieldType.CHECKBOX;
		super(field);
		this.value = field.value;
		this.color = field.color;
		this.onChange = field.onChange;
	}
	public value: boolean;
	public color?: string;
	public onChange?: (value: boolean | null) => void;
}

export class FilterRadioField extends FilterField<string | null> implements IFilterRadio {
	constructor(field: IFilterRadio) {
		field.fieldType = FilterFieldType.RADIO;
		super(field);
		this.value = field.value;
		this.text = field.text;
		this.onChange = field.onChange;
	}
	public value: string;
	public text: string;
	public onChange?: (value: string | null) => void;
}

export class FilterSelectField<T, V> extends FilterField<V | null> implements IFilterSelect<T, V> {
	constructor(field: IFilterSelect<T, V>) {
		field.fieldType = FilterFieldType.SELECT;
		super(field);
		this.value = field.value;
		this.multiple = Boolean(field.multiple);
		this.disabled = field.disabled;
		this.reduceListItem = field.reduceListItem;
		this.reduceElemName = field.reduceElemName;
		this.reduceValue = field.reduceValue;
		this.getMethod = field.getMethod;
		this.extraParams = field.extraParams;
		this.filterable = field.filterable;
		this.searchQueryParam = field.searchQueryParam;
		this.createMethod = field.createMethod;
		this.onChange = field.onChange;
	}
	public value: V;
	public multiple?: boolean;
	public disabled?: boolean;
	public reduceListItem: (elem: T) => React.ReactNode;
	public reduceElemName?: (elem: T) => string;
	public reduceValue: (elem: T) => V;
	public getMethod: Function;
	public extraParams?: object;
	public filterable?: boolean;
	public searchQueryParam?: string;
	public createMethod?: Function;
	public onChange?: (value: V | null) => void;
}

export class FilterComponentField implements IFilterFieldComponent {
	constructor(field: IFilterFieldComponent) {
		this.fieldType = FilterFieldType.COMPONENT;
		this.id = field.id;
		this.name = field.name;
		this.keyName = field.keyName;
		this.placeholder = field.placeholder;
		this.label = field.label;
		this.style = field.style;
		this.value = field.value;
		this.component = field.component;
		this.onChange = field.onChange;
	}

	public fieldType?: FilterFieldType;
	public id?: string;
	public name?: string;
	public keyName: string;
	public placeholder?: string;
	public label?: React.ReactNode;
	public style?: React.CSSProperties;
	public value: any;
	public component: (field: IGeneralFilterField<any> & { key: string }) => React.ReactNode;
	public onChange?: (value: any) => void;
}
