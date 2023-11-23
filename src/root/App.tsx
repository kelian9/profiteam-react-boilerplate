import AppRouter from '@router/index';
import React, { Suspense, useEffect } from 'react';
import ErrorBoundary from '../components/services/ErrorBoundary';
import Progress from '../components/services/Progress';

const App: React.FC = () => {
	useEffect(() => console.log('work 1'), []);

	return (
		<Suspense fallback={<Progress />}>
			<ErrorBoundary>
				<AppRouter />
			</ErrorBoundary>
		</Suspense>
	);
};

export default App;
