/** @file responsible for rendering the app bar at the top or bottom of the user's screen on every page */
import {
	FC,
	PropsWithChildren,
} from 'react';

import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';

import NavigationButtonSet from './NavigationButtonSet';
// import { UserContext } from '../contexts/user.jsx';

const Navigation: FC<PropsWithChildren> = ({ children }) => {
	const {
		breakpoints,
		palette: {
			primary,
			secondary,
		},
	} = useTheme();
	const desktop = useMediaQuery(breakpoints.up('md'));

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: 'calc(100vh - env(safe-area-inset-bottom))',
				// height: '100vh',
			}}
		>
			<AppBar
				position="sticky"
				sx={{
					background: `linear-gradient(to right, ${primary.main}, calc(2/3 * 100%), ${secondary.main})`,
					display: 'flex',
					top: 0,
				}}
			>
				<Toolbar>
					<Typography
						component="div"
						sx={{
							flexGrow: 1,
							visibility: {
								lg: 'visible',
								md: 'visible',
								sm: 'hidden',
								xl: 'visible',
								xs: 'hidden',
							},
						}}
						variant="h2"
					>
						{desktop
							? 'Starter App'
							: ''}
					</Typography>
					<NavigationButtonSet />
				</Toolbar>
			</AppBar>
			{children}
		</Box>
	);
};

export default Navigation;
