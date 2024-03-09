# BTable
Just describe table fields. Use subclasses of [TableField](https://github.com/kelian9/profiteam-react-boilerplate/blob/main/src/components/ui/BTable/BTableBase/models/ITableField.ts).

## Example

{% code title="index.tsx" overflow="wrap" lineNumbers="true" %}

```typescript
import React from 'react';
import BTable from '@ui/BTable';
import ITableField from '@ui/BTable/BtableBase/models/ITableField';

const MyComponent: React.FC = () = {
	const actions = [
		{
			type: BTableActionType.EDIT,
			method: (e: any) => handleModal(e, EntityChangeFormType.UPDATE),	
		},
		{
			type: BTableActionType.DELETE,
			method: (e: any) => handleModal(e, EntityChangeFormType.DELETE),
		}
	];

	const listOptions = {
			pagination: {
				enabled: true,
			},
			sort: {
				enabled: false,
			},
		};

	const tableFields: ITableField[] = [
		{
			name: 'title',
			keyName: 'title',
			label: 'Заголовок',
		},
		{
			name: 'id пользователя',
			keyName: 'userId',
			label: 'id пользователя',
		},
	];

	const footFields = [];

	return (
		<>
			<BTable
				fields={tableFields}
				getData={(data: any) => API.getData(data)}
				actions={actions}
				listOptions={listOptions}
				footFields={footFields}
				limit={20}
				rowClick={rowClick}
				style={style}
				nodeStyle={nodeStyle}
			/>
		</>
	);
};

export default MyComponent;
```
{% endcode %}

## BTable props

`IBTableProps<T>`

Property           | Description                                 | Type                  | Default
------------------ | ------------------------------------------- | --------------------- | -------------------
fields              | table fields  | [```ITableField[]```](#ITableField)          | -
getData                 | data get method | ```(...args: any[]) => Promise<AxiosResponse<T[] | IErrorResponse> | T[]>```          | -
footFields                 | table foot fields | [```ITableFooterField[]```](#ITableFooterField)            | -
actions              | array of actions with data in the table  |[ ```IAction[]```](#IAction)         | -
limit               | number of rows in the table  | ```number```          | 10
rowClick            |click on row  | ```(item?: number | string) => void``` | -
listOptions        | table pagination and sorting options  | [``` ITableOptions ```](#ITableOptions)           | -
style              | container styles  | ```React.CSSProperties```          | undefined
nodeStyle              | node styles  | ```React.CSSProperties```          | undefined

### `ITableField`

```typescript
interface ITableField {
	keyName: string;
	label: string;
	sortable?: boolean;
	fieldType?: FieldType;
	props?: any;
	template?: JSX.Element;
}

enum FieldType {
	DATEPICKER,
	SELECT,
	CHECKBOX,
	RADIO,
	INPUT,
	COMPONENT,
}
```

### `ITableFooterField`

```typescript
interface ITableFooterField {
	key: string;
	label?: string;
}
```

### `IAction`

```typescript
interface IAction {
	method: ((...args: any) => void) | boolean;
	type: BTableActionType;
	template?: JSX.Element;
}

enum BTableActionType {
	READ,
	EDIT,
	DELETE,
	CUSTOM,
}
```

### `ITableOptions`

```typescript
interface ITableOptions {
	pagination?: {
		enabled: boolean;
		method?: (page: number) => void;
	};
	sort?: {
		enabled: boolean;
		method?: (sortData: any) => void;
	};
}
```

