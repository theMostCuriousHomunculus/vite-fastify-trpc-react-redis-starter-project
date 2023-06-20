import { FC } from 'react';

import {
	Outlet,
	RootRoute,
	Route,
	Router,
} from '@tanstack/router';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';

import Home from './pages/Home.jsx';
import Navigation from './components/Navigation.jsx';
import { PreferencesProvider } from './contexts/preferences.jsx';

const queryClient = new QueryClient();

const Root: FC = () => (
	<QueryClientProvider client={queryClient}>
		<PreferencesProvider>
			<Navigation>
				<Outlet />
			</Navigation>
		</PreferencesProvider>
	</QueryClientProvider>
);

const rootRoute = new RootRoute({ component: Root });

const indexRoute = new Route({
	component: Home,
	getParentRoute: () => rootRoute,
	path: '/',
});

const routeTree = rootRoute.addChildren([indexRoute]);

const router = new Router({
	defaultPreload: 'intent',
	routeTree,
});

declare module '@tanstack/router' {
	interface Register {
		router: typeof router;
	}
}

export default router;
