import { useEffect, useState } from 'react';

const useDebounce = (inputValue: any, delay: number) => {
	// State and setters for debounced value
	const [value, setValue] = useState<any>();

	useEffect(() => {
		// Update debounced value after delay
		const timeout = setTimeout(() => {
			setValue(inputValue);
		}, delay);

		// Cancel the timeout if value changes (also on delay change or unmount)
		// This is how we prevent debounced value from updating if value is changed ...
		// .. within the delay period. Timeout gets cleared and restarted.
		return () => {
			clearTimeout(timeout);
		};
	}, [inputValue]); // Only re-call effect if value changes

	return value;
};

export default useDebounce;
