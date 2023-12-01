import React from 'react';
import useEffectSkipFirst from './useEffectSkipFirst';

function useSyncToRef<T>(data: T) {
	const ref = React.useRef(data);
	useEffectSkipFirst(() => {
		ref.current = data;
	}, [data]);
	return ref;
}

export default useSyncToRef;
