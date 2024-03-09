# BaseCrudPage
BaseCrudPage allows you to quickly create a window with a standard implementation of the CRUD functionality.
## Example

{% code title="index.tsx" overflow="wrap" lineNumbers="true" %}

```typescript
import React from 'react';
import Entity from '@entities/Entity'
import BaseCrudPage from '@views/BaseCrudPage';

const MyComponent: React.FC = () = {

	return (
		<>
			<BaseCrudPage
				methods={Entity.methods}
				fields={Entity.fields}
				queryFilter={Entity.queryFilter}
				filters={Entity.filters}
				table={Entity.table}
				forms={Entity.forms}
				style={style}
			/>
		</>
	);
};

export default MyComponent;
```
{% endcode %}

## BaseCrudPage props

`BaseCrudPageProps<T>`

Property           | Description                                 | Type                  | Default
------------------ | ------------------------------------------- | --------------------- | -------------------
methods              | crud methods  | [```IMethods<T>```](#imethods)          | -
fields                 | fields for basecrudpage | [```IEntityField``` ](#ientityfield)        | -
queryFilter                 | pagination params | [```IQueryFilter```](#iqueryfilter)            | -
filters              | filters fields and save method  |[ ```IEntityFilter```](#ientityfilter)         | -
table               | table params  | [```IEntityTable```](#ientitytable)          | -
forms        | form params  | [``` IEntityForm ```](#ientityform)           | -
style              | container styles  | ```React.CSSProperties```          | undefined

### `IMethods`

```typescript
interface IMethods<T> {
	getData: ((...args: any[]) => Promise<AxiosResponse<T[] | IErrorResponse>>) | ((...args: any[]) => void);
	getById?: (id: number) => Promise<AxiosResponse<T | IErrorResponse>>;
	create?: (body: any) => Promise<AxiosResponse<boolean | IErrorResponse>>;
	update?: (id: number, body: any) => Promise<AxiosResponse<boolean | IErrorResponse>>;
	delete?: (id: number) => Promise<AxiosResponse<boolean | IErrorResponse>>;
}
```

### `IEntityField`

```typescript
interface IEntityField {
	[key: string]: {
		name: string;
		keyName: string;
		fieldType?: FieldTypeEnum;
		entityName?: EntityNameEnum;
		label?: string;
		filterableRowName?: string;
		rowName?: string;
		localFiltering?: boolean;
		constName?: string;
	};
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

### `IQueryFilter`

```typescript
interface IQueryFilter {
	parameters: {
		name: string;
		type: PaginationParams;
		defaultValue?: string | number;
		required?: boolean;
	}[];
}

enum PaginationParams {
	OFFSET = 'offset',
	LIMIT = 'limit',
	SORT_BY = 'sortBy',
	SORT_ORDER = 'sortOrder',
}
```

### `IEntityFilter`

```typescript
interface IEntityFilter {
	filterFields: IFilterField[];
	onSave: (...args: any) => void;
}
```

### `IEntityTable`

```typescript
interface IEntityTable {
	type: TableType;
	tableFields: ITableField[];
	actions?: IAction[];
	footFields?: ITableFooterField[];
	limit?: number;
	rowClick?: (itemId?: number | string) => void;
	style?: React.CSSProperties;
	nodeStyle?: React.CSSProperties;
}
```

### `IEntityForm`

```typescript
interface IEntityForm {
	[key: string]: {
		formFields: IFormField[];
	};
}
```
