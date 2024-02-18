import React, { useEffect, useMemo, useState } from 'react';
import FieldType from '@models/enums/FieldTypeEnum';
import BSelect from '../BSelect';

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
	redefineValuesDep?: boolean;
	realTime?: boolean;
	onChange: (filter: Record<string, any> | null) => void;
}

const BFilter: React.FC<IBFilterProps> = (props: IBFilterProps) => {
	const { filterFields, redefineValuesDep, realTime, onChange } = props;
	const [filter, setFilter] = useState<Record<string, any> | null>(null);

	const saveButton = useMemo(() => {
		console.log(realTime);
		if (!realTime) {
			return (
				<button data-testid='BFilterSaveButton' onClick={() => onChange(filter)}>
					Save
				</button>
			);
		}
		return null;
	}, [realTime]);

	useEffect(() => {
		const result: Record<string, any> = {};
		filterFields.forEach((f) => (result[f.keyName] = f.value));
		setFilter(result);
		console.log(result);
	}, [redefineValuesDep]);

	useEffect(() => {
		if (realTime) onChange(filter);
	}, [filter]);

	return (
		<div data-testid='BFilter'>
			<>
				{filterFields.map((filterField) => {
					switch (filterField.fieldType) {
						case FieldType.INPUT: {
							const field = filterField as IFilterInput;
							return (
								<input
									key={'BFilterFieldKey-' + field.keyName}
									type={field.type}
									value={filter ? filter[field.keyName] : ''}
									data-testid={'BFilterFieldKey-' + field.keyName}
									onChange={(e) => {
										e.persist();
										setFilter({
											...filter,
											[field.keyName]: e.target.value,
										});
									}}
								/>
							);
						}
						case FieldType.DATEPICKER: {
							const field = filterField as IFilterDatePicker;
							return (
								<input
									key={'BFilterFieldKey-' + field.keyName}
									type='date'
									data-testid={'BFilterFieldKey-' + field.keyName}
									value={filter ? filter[field.keyName] : ''}
									onChange={(e) => {
										e.persist();
										setFilter({
											...filter,
											[field.keyName]: e.target.value,
										});
									}}
								/>
							);
						}
						case FieldType.CHECKBOX: {
							const field = filterField as IFilterCheckbox;
							return (
								<input
									key={'BFilterFieldKey-' + field.keyName}
									type='checkbox'
									data-testid={'BFilterFieldKey-' + field.keyName}
									checked={filter ? filter[field.keyName] : false}
									onChange={(e) => {
										e.persist();
										if (!filter) return;
										setFilter({
											...filter,
											[field.keyName]: !filter[field.keyName],
										});
									}}
								/>
							);
						}
						case FieldType.RADIO: {
							const field = filterField as IFilterRadio;
							return (
								<input
									key={'BFilterFieldKey-' + field.keyName}
									type='radio'
									data-testid={'BFilterFieldKey-' + field.keyName}
									value={filter ? filter[field.keyName] : ''}
									onChange={(e) => {
										e.persist();
										if (!filter) return;
										setFilter({
											...filter,
											[field.keyName]: e.target.value,
										});
									}}
								/>
							);
						}
						case FieldType.SELECT: {
							const field = filterField as IFilterSelect<unknown, any>;
							return (
								<BSelect
									key={'BFilterFieldKey-' + field.keyName}
									dataTestId={'BFilterFieldKey-' + field.keyName}
									getMethod={field.getMethod}
									label={field.label}
									value={filter ? filter[field.keyName] : null}
									reduceListItem={field.reduceListItem}
									reduceElemName={field.reduceElemName}
									reduceValue={field.reduceValue}
									searchQueryParam={field.searchQueryParam}
									createMethod={field.createMethod}
									disabled={field.disabled}
									extraParams={field.extraParams}
									filterable={field.filterable}
									multiple={field.multiple}
									style={field.style}
									onChange={(e) => {
										if (!filter) return;
										setFilter({
											...filter,
											[field.keyName]: e,
										});
									}}
								/>
							);
						}
						case FieldType.COMPONENT: {
							const field = filterField as IFilterFieldComponent;
							return field.component({
								...field,
								key: 'BFilterFieldKey-' + field.keyName,
								value: filter ? filter[field.keyName] : '',
								onChange: (e) => {
									if (!filter) return;
									setFilter({
										...filter,
										[field.keyName]: e,
									});
								},
							});
						}
						default:
							break;
					}
				})}
			</>
			{!filterFields.length ? <span>No filters</span> : null}
			{saveButton}
		</div>
	);
};

export default BFilter;
