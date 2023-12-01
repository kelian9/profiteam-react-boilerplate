import React, { useState } from 'react';

function useToggle(initial: boolean | (() => boolean)) {
	const [state, setState] = useState(initial);
	const toggle = React.useCallback(() => setState((state) => !state), []);
	return [state, toggle] as const;
}

export default useToggle;
