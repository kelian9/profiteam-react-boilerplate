import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

type TBase = { [key: string]: any };

interface IBSelectProps<T, V = number> {
	label: React.ReactNode;
	multiple?: boolean;
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
	dataTestId?: string;
}

const BSelect = <T extends TBase, V = number>(props: IBSelectProps<T, V>) => {
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
		searchQueryParam,
		dataTestId,
	} = props;

	const [searchSubstr, setSearchSubstr] = useState<string>('');
	const [data, setData] = useState<T[]>([]);

	const inputId = useId();
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [isFocused, setIsFocused] = useState<boolean>(false);

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

	// const listIsVisible = useMemo(() => {
	// 	console.log(document.activeElement, inputRef.current);
	// 	return document.activeElement && inputRef.current && document.activeElement.id === inputRef.current.id;
	// },
	// 	[document.activeElement, inputRef]
	// );

	useEffect(() => {
		getList();
	}, [searchSubstr]);

	useEffect(() => {
		getList();
		onChange(null);
	}, [extraParams]);


	return (
		<label data-testid={dataTestId} style={{ position: 'relative', width: '200px' }}>
			{label}
			<input
				ref={inputRef}
				id={inputId}
				type='text'
				value={searchSubstr}
				onChange={(e) => setSearchSubstr(e.target.value)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			{isFocused ? (
				<ul
					style={{
						position: 'absolute',
						top: '100%',
						left: 0,
						width: '100%',
						height: '200px',
						overflow: 'auto',
						zIndex: 2,
					}}
				>
					{data.map((elem) => (
						<li key={String(reduceValue(elem))} data-testid={label + elem.id} onMouseDown={() => handleChange(elem)}>
							{reduceListItem ? reduceListItem(elem) : elem[reduceElemName ? reduceElemName(elem) : '']}
						</li>
					))}
				</ul>
			) : null}
		</label>
	);
};

export default BSelect;
