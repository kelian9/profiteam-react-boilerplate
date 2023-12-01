import { useEffect, useRef } from 'react';

export function useEffectSkipFirst(callback: React.EffectCallback, dependencies?: React.DependencyList) {
	const wasChanged = useRef(false);
	useEffect(function () {
		if (wasChanged.current) return callback();
		wasChanged.current = true;
	}, dependencies);
}

export default useEffectSkipFirst;
