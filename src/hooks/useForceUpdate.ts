import { useCallback, useState } from 'react';

function useForceUpdate() {
	const [, updateState] = useState({});
	return useCallback(() => updateState({}), []);
}

export default useForceUpdate;
