import { useState } from 'react';

// Hook for controlled input,
// you only need to destructure the returned object
// like <input type="text" {...inputState} />
const useFormState = (inititalValue: any) => {
	const [value, setValue] = useState(inititalValue);
	const handleChange = (e: any) => {
		setValue(e.target['value']);
	};

	return {
		value: value,
		onChange: handleChange,
	};
};

export default useFormState;
