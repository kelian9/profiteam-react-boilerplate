Simple pagination component.

## Example
{% code title="index.tsx" overflow="wrap" lineNumbers="true" %}

```typescript
import React from 'react';
import BPagination from '@ui/BPagination';

const MyComponent: React.FC = () => {
	const [data, setData] = useState<any[]>([
		// list
	]);
	const pageSize = 5;
	const [page, setPage] = useState<number>(1);

	return (
		<>
			// BTable or sth else
			<BPagination
				disabled={false}
				bigStep={false}
				currentPage={page}
				pageCount={Math.ceil(data.length / pageSize)}
				handlePageChange={(e) => (page = e)}
			/>
		</>
	);
};

export default MyComponent;
```

{% endcode %}

### BPagination props

Property           | Description                                 | Type                  | Default
------------------ | ------------------------------------------- | --------------------- | -------------------
disabled       | makes the element not mutable                                          | ```boolean```         | false
bigStep  | render additional buttons for going to the first/last page  | ```boolean```          | false
currentPage           | current page number  | ```number```          | -
pageCount           | count of pages  | ```number```          | -
handlePageChange           | Callback when page is changed                      | ```(page: number) => void``` | -

