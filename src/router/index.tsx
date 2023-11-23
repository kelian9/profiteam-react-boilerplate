import history from '@utils/history';
// import { ConnectedRouter } from 'connected-react-router';
import { ReduxRouter } from '@lagunovsky/redux-react-router';
import React, { useEffect, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';

const AppRouter: React.FC = () => {
	const pathToComponentMap = useMemo(() => {
		console.log(routes);
		return routes.reduce(
			(a, x) => {
				a[x.path] = x.component;
				return a;
			},
			{} as Record<string, React.FC>,
		);
	}, []);

	useEffect(() => console.log('work'), []);

	return (
		<ReduxRouter history={history}>
			<Routes>
				{Object.entries(pathToComponentMap).map(([path, Component]) => (
					<Route key={path} path={path} element={<Component />} />
				))}
			</Routes>
		</ReduxRouter>
	);
};

export default AppRouter;
