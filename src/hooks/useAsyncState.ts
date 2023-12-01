import { useCallback, useEffect, useRef, useState } from 'react';

function useAsyncState(initialState: any) {
	const [state, setState] = useState(initialState);
	const resolveState = useRef<any>();
	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (resolveState.current) {
			resolveState.current(state);
		}
	}, [state]);

	const setAsyncState = useCallback(
		(newState: any) =>
			new Promise((resolve) => {
				if (isMounted.current) {
					resolveState.current = resolve;
					setState(newState);
				}
			}),
		[],
	);

	return [state, setAsyncState];
}

export default useAsyncState;
