Just describe filter fields.

## Example
```
	const [filterParams, setFilterParams] = useState<Record<string, any> | null>({
		search: '',
		userId: null,
		dateCreated: '2024-05-05',
		custom: '',
	});

	const [redefineValuesDep, setRedefineValuesDep] = useState<boolean>(false);

	const filterFields: IFilterField[] = [
		new FilterInputField({
			keyName: 'search',
			name: 'Поиск',
			value: filterParams.search,
			label: 'Поиск',
		}),
		new FilterSelectField({
			keyName: 'userId',
			label: 'Пользователь',
			getMethod: () => usersList,
			reduceListItem: (elem) => elem.name,
			reduceValue: (elem) => elem.id,
			value: filterParams?.userId ?? null,
			searchQueryParam: 'name',
		}),
		new FilterDatePickerField({
			keyName: 'dateCreated',
			label: 'Date Created',
			value: filterParams.dateCreated,
		}),
		new FilterComponentField({
			keyName: 'custom',
			value: filterParams.custom,
			component: ({ keyName, value, key, onChange }) =>
				<input type='text' data-testid={'BFilterFieldKey-' + keyName} key={key} value={value} onChange={(e) => onChange(e.target.value)} />,
		})
	];

	<BFilter
		filterFields={filterFields}
		redefineValuesDep={redefineValuesDep}
		realTime={true}
		onChange={(e: Record<string, any> | null) => filterParams = e}
	/>
```

### BFilter props

Property           | Description                                 | Type                  | Default
------------------ | ------------------------------------------- | --------------------- | -------------------
filterFields       | list of query params for filtration                                          | [```FilterFieldType``](#ifilterfield)         | -
redefineValuesDep  | BFilter subscribe to this prop changes <br>for redefine local state variable | ```boolean```          | false
realTime           | call onChange by change any field value or by click to save button  | ```boolean```          | false
onChange           | Callback that change query params and get data                      | ```(filter: Record<string, any> | null) => void``` | -


## IFilterField

```
type IFilterField =
	| IFilterInput
	| IFilterDatePicker
	| IFilterCheckbox
	| IFilterRadio
	| IFilterSelect<any, any>
	| IFilterFieldComponent;
```

### `IGeneralFilterField<V>`

Property           | Description                                 | Type                  | Default
------------------ | ------------------------------------------- | --------------------- | -------------------
fieldType          | type of input                               | [```FilterFieldType``](#filterfieldtype)         | -
id                 | id attribute | ```string```          | ''
name               | Field name  | ```string```          | ''
keyName            | query params prop name  | ```string```          | -
placeholder        | input placeholder  | ```string```          | ''
label              | input label  | ```React.ReactNode```          | keyName
style              | css for input  | ```React.CSSProperties```          | undefined
value              | filter field value that is necessary to (re)define filter object  | ```V```          | -
onChange           | Callback when input value is changed                      | ```(value: V | null) => void``` | -

### `FilterFieldType`

```
enum FilterFieldType {
	DATEPICKER,
	SELECT,
	CHECKBOX,
	RADIO,
	INPUT,
	COMPONENT,
}
```

### `IFilterSelect<T, V>`

IFilterSelect extends IGeneralFilterField

Property           | Description                                 | Type                  | Default
------------------ | ------------------------------------------- | --------------------- | -------------------
...IGeneralFilterField          | ...                               | ...         | ...
multiple                 | ... | ```boolean```          | false
value                 | query params prop value | ```V```          | -
disabled               | ...  | ```boolean```          | false
reduceListItem            | generate list item template  | ```(elem: T) => React.ReactNode``` | -
reduceElemName        | generate list item name  | ```(elem: T) => string```          | undefined
reduceValue              | get item value  | ```(elem: T) => V```          | -
getMethod              | callback that will be used for getting data list  | ```Function```          | -
extraParams              | properties of query params that don't participate in filtration  | ```Object```          | null
searchQueryParam              | query param that is used for searching  | ```string```          | ''
createMethod              | callback that will be used for list item creation  | ```Function```          | -
onChange           | Callback when selected item is changed                      | ```(value: V | null) => void``` | -


