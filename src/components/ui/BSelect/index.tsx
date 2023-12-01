import React, { useEffect, useMemo, useState } from 'react';

interface IBSelectProps<T, V = number> {
	label: React.ReactNode;
	multiple: boolean;
	value?: V | V[];
	disabled?: boolean;
	reduceListItem: (elem: T) => React.ReactNode;
	reduceElemName?: (elem: T) => string;
	reduceValue: (elem: T) => V;
	getMethod: Function;
	extraParams?: object;
	filterable?: boolean;
	searchQueryParam?: string;
	createMethod?: Function;
	onChange: (value: V | V[] | null) => void;
	style?: React.CSSProperties;
}

const BSelect = <T extends object, V = number>(props: IBSelectProps<T, V>) => {
	/* eslint-disable */
	const {
		label,
		multiple,
		value,
		disabled,
		reduceListItem,
		reduceElemName,
		reduceValue,
		getMethod,
		extraParams,
		createMethod,
		onChange,
		searchQueryParam
	} = props;

	const [searchSubstr, setSearchSubstr] = useState<string>('');
	const [data, setData] = useState<T[]>([]);

	const disableCreation: boolean = useMemo(() => {
		return (
			data.findIndex(
				(elem) =>
					React.isValidElement(reduceListItem(elem)) && reduceElemName
						? reduceElemName(elem).includes(searchSubstr)
						: (reduceListItem(elem) as string).includes(searchSubstr)
			) !== -1
			|| !searchSubstr
			|| !createMethod
		);
	}, [data, searchSubstr]);

	const getList = async () => {
		const response = await getMethod(searchQueryParam ? { [searchQueryParam]: searchSubstr, ...extraParams } : { ...extraParams });
		// fix setData argument
		setData(response);
	};

	const createEntity = async () => {
		if (!createMethod || disableCreation) return;
		const response = await createMethod(searchSubstr);
		// push new entity to the data
		// fix next line if response is not a created entity
		setData([...data, response]);
	};

	const handleChange = (item: T) => {
		if (disabled) {
			return;
		}
		if (multiple && Array.isArray(value)) {
			const itemValueIndex: number = value.findIndex(v => v === reduceValue(item));
			if (itemValueIndex !== -1) {
				onChange([...value.slice(0, itemValueIndex), ...value.slice(itemValueIndex + 1)]);
			} else {
				onChange([...value, reduceValue(item)]);
			}
		} else {
			setSearchSubstr(React.isValidElement(reduceListItem(item)) && reduceElemName ? reduceElemName(item) : reduceListItem(item) as string);
			// setSearchSubstr(typeof reduceListItem(item) !== 'string' && reduceElemName ? reduceElemName(item) : reduceListItem(item) as string);
			onChange(reduceValue(item));
		}
	};

	useEffect(() => {
		getList();
	}, [searchSubstr]);

	useEffect(() => {
		getList();
		onChange(null);
	}, [extraParams]);

	/* eslint-enable */

	return <>{label}</>;
};

export default BSelect;
