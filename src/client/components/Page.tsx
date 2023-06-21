/** @file a generic wrapper to place all content of a page on a paper component which stretches to fill the screen, applies padding and whose background reflects the user's dark mode setting */
import {
	FC,
	PropsWithChildren,
} from 'react';

import { Box } from '@mui/material';

const Page: FC<PropsWithChildren> = ({ children }) => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			flexGrow: 1,
			margin: 0.5,
			overflowY: 'auto',
			rowGap: 0.5,
		}}
	>
		{children}
	</Box>
);

export default Page;
