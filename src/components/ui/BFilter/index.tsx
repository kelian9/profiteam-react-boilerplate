import FieldType from '@models/enums/FieldTypeEnum';
import React, { useMemo } from 'react';
import IFilterField, {
	IFilterCheckbox,
	IFilterDatePicker,
	IFilterFieldComponent,
	IFilterInput,
	IFilterRadio,
	IFilterSelect,
} from './IFilterField';

interface IBFilterProps {
	filterFields: IFilterField[];
	onSave?: Function;
}

const BFilter: React.FC<IBFilterProps> = (props: IBFilterProps) => {
	const { filterFields, onSave } = props;

	const fieldsView = useMemo(() => {
		return (
			<>
				{filterFields.map((filterField) => {
					switch (filterField.fieldType) {
						case FieldType.INPUT: {
							const field = filterField as IFilterInput;
							return <input type={field.type} />;
						}
						case FieldType.DATEPICKER: {
							const field = filterField as IFilterDatePicker;
							return <input type='date' value={String(field.value)} />;
						}
						case FieldType.CHECKBOX: {
							const field = filterField as IFilterCheckbox;
							return <input type='checkbox' checked={field.value} />;
						}
						case FieldType.RADIO: {
							const field = filterField as IFilterRadio;
							return <input type='radio' value={field.value} />;
						}
						case FieldType.SELECT: {
							const field = filterField as IFilterSelect<unknown, any>;
							return <select name='' id='' value={field.value}></select>;
						}
						case FieldType.COMPONENT: {
							const field = filterField as IFilterFieldComponent;
							return field.component;
						}
						default:
							break;
					}
				})}
			</>
		);
	}, [filterFields]);

	return (
		<>
			{fieldsView}
			{!filterFields.length ? <span>No filters</span> : null}
			{onSave ? <button onClick={() => onSave()}>Save</button> : null}
		</>
	);
};

export default BFilter;
