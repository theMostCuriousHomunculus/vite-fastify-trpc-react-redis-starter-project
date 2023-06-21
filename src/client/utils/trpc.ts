import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '../../server/router/index';
 
export const trpc = createTRPCReact<AppRouter>();
