import React, { lazy, Suspense } from 'react';

const loadable = (
	importFunc: () => Promise<{ default: React.ComponentType<any> }>,
	{ fallback = null } = { fallback: null },
) => {
	const LazyComponent = lazy(importFunc);

	return (props: any) => (
		<Suspense fallback={fallback}>
			<LazyComponent {...props} />
		</Suspense>
	);
};

export default loadable;
