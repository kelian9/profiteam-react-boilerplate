import { LazyExoticComponent, lazy } from 'react';

export interface RouteDescriptor {
	path: string;
	component: LazyExoticComponent<React.ComponentType>;
	title?: string;
}

const routes: RouteDescriptor[] = [
	{
		path: '/',
		component: lazy(() => import('@views/Home')),
	},
	{
		path: '',
		component: lazy(() => import('../components/services/NotFound')),
	},
];

export default routes;
