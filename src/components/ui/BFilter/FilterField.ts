import FieldType from '@models/enums/FieldTypeEnum';
import {
	IFilterCheckbox,
	IFilterDatePicker,
	IFilterFieldComponent,
	IFilterInput,
	IFilterRadio,
	IFilterSelect,
	IGeneralFilterField,
} from './IFilterField';

class FilterField implements IGeneralFilterField {
	constructor(field: IGeneralFilterField) {
		this.fieldType = field.fieldType;
		this.id = field.id;
		this.name = field.name;
		this.keyName = field.keyName;
		this.placeholder = field.placeholder;
		this.label = field.label;
		this.style = field.style;
		this.value = field.value;
	}

	public fieldType: FieldType;
	public id?: string;
	public name: string;
	public keyName: string;
	public placeholder?: string;
	public label?: React.ReactNode;
	public style?: React.CSSProperties;
	public value: any;
}

export class FilterInputField extends FilterField implements IFilterInput {
	constructor(field: IFilterInput) {
		super(field);
		this.type = field.type;
	}
	public type: string;
}

export class FilterDatePickerField extends FilterField implements IFilterDatePicker {
	constructor(field: IFilterDatePicker) {
		super(field);
		this.value = String(field.value);
	}
	public value: string | Date;
	public format?: string;
}

export class FilterCheckboxField extends FilterField implements IFilterCheckbox {
	constructor(field: IFilterCheckbox) {
		super(field);
		this.value = field.value;
		this.color = field.color;
	}
	public value: boolean;
	public color?: string;
}

export class FilterRadioField extends FilterField implements IFilterRadio {
	constructor(field: IFilterRadio) {
		super(field);
		this.value = field.value;
		this.text = field.text;
	}
	public value: string;
	public text: string;
}

export class FilterSelectField<T, V> extends FilterField implements IFilterSelect<T, V> {
	constructor(field: IFilterSelect<T, V>) {
		super(field);
		this.value = field.value;
		this.multiple = field.multiple;
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
	public multiple: boolean;
	public disabled?: boolean;
	public reduceListItem: (elem: T) => React.ReactNode;
	public reduceElemName?: (elem: T) => string;
	public reduceValue: (elem: T) => V;
	public getMethod: Function;
	public extraParams?: object;
	public filterable?: boolean;
	public searchQueryParam?: string;
	public createMethod?: Function;
	public onChange: (value: V | null) => void;
}

export class FilterComponentField extends FilterField implements IFilterFieldComponent {
	constructor(field: IFilterFieldComponent) {
		super(field);
		this.component = field.component;
	}
	public component: React.ReactNode;
}
