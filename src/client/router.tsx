import {
	FC,
	useState,
} from 'react';

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
import { httpBatchLink } from '@trpc/client';

import Guide from './pages/Guide';
import Home from './pages/Home';
import Map from './pages/Map';
import Navigation from './components/Navigation';
import { PreferencesProvider } from './contexts/preferences';
import { trpc } from './utils/trpc';

const Root: FC = () => {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() => trpc.createClient({ links: [httpBatchLink({ url: import.meta.env.VITE_TRPC_ENDPOINT })] }));
	
	return (
		<trpc.Provider
			client={trpcClient}
			queryClient={queryClient}
		>
			<QueryClientProvider client={queryClient}>
				<PreferencesProvider>
					<Navigation>
						<Outlet />
					</Navigation>
				</PreferencesProvider>
			</QueryClientProvider>
		</trpc.Provider>
	);
};

const rootRoute = new RootRoute({ component: Root });

const homeRoute = new Route({
	component: Home,
	getParentRoute: () => rootRoute,
	path: '/',
});

const mapRoute = new Route({
	component: Map,
	getParentRoute: () => rootRoute,
	path: '/map',
});

const guideRoute = new Route({
	component: Guide,
	getParentRoute: () => rootRoute,
	path: '/guide',
});

const routeTree = rootRoute.addChildren([
	guideRoute,
	homeRoute,
	mapRoute,
]);

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
