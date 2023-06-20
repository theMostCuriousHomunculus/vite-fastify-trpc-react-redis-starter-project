import {
	FC,
	StrictMode,
	Suspense,
} from 'react';
import { RouterProvider } from '@tanstack/router';

import router from './router';

const createApp: FC = () => (
	<StrictMode>
		<Suspense>
			<RouterProvider router={router} />
		</Suspense>
	</StrictMode>
);

export { createApp };
