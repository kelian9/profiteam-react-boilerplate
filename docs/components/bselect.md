# Example

{% code title="index.tsx" overflow="wrap" lineNumbers="true" %}

```typescript
import React from 'react';
import BSelect from '@ui/BSelect';
import EntityAPI from '@api/EntityAPI';

const MyComponent: React.FC = () => {
	const [selected, setSelected] = useState<number | null>(null);

	return (
		<>
			// template
			<BSelect
				value={selected}
				getMethod={EntityAPI.getList}
				label='Select entity'
				dataTestId='EntityName'
				multiple={false}
				disabled={false}
				reduceElemName={(elem) => elem.name}
				reduceListItem={(elem) => (
					<span>{ elem.name }</span>
				)}
				reduceValue={(elem) => elem.id}
				searchQueryParam='name'
				onChange={(e) => setSelected(e)}
			/>
		</>
	);
}
```

{% endcode %}

## BSelect props

`IBSelectProps<T, V>`

Property           | Description                                 | Type                  | Default
------------------ | ------------------------------------------- | --------------------- | -------------------
label              | label element for this input  | ```React.ReactNode```          | -
value                 | query params prop value | ```V```          | -
multiple                 | ... | ```boolean```          | false
dataTestId              | test id for cypress  | ```string```          | undefined
disabled               | ...  | ```boolean```          | false
reduceListItem            | generate list item template  | ``` (elem: T) => React.ReactNode ``` | -
reduceElemName        | generate list item name  | ``` (elem: T) => string ```          | undefined
reduceValue              | get item value  | ``` (elem: T) => V ```          | -
getMethod              | callback that will be used for getting data list  | ```Function```          | -
onChange           | Callback when selected item is changed                      | ``` (value: V | V[] | null) => void ``` | -
extraParams              | properties of query params that don't participate in filtration  | ```Object```          | null
searchQueryParam              | query param that is used for searching  | ```string```          | ''
filterable              | search items locally  | ```boolean```          | false
createMethod              | callback that will be used for list item creation  | ```Function```          | undefined
style              | container styles  | ```React.CSSProperties```          | undefined
