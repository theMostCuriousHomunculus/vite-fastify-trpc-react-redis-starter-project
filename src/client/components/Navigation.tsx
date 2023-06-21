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
	useTheme,
} from '@mui/material';

import NavigationButtonSet from './NavigationButtonSet';
// import { UserContext } from '../contexts/user.jsx';

const Navigation: FC<PropsWithChildren> = ({ children }) => {
	const {
		palette: {
			primary,
			secondary,
		},
	} = useTheme();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100vh',
			}}
		>
			<AppBar
				position="sticky"
				sx={{
					background: `linear-gradient(to right, ${primary.main}, calc(2/3 * 100%), ${secondary.main})`,
					display: {
						lg: 'flex',
						md: 'none',
						sm: 'none',
						xl: 'flex',
						xs: 'none',
					},
					top: 0,
				}}
			>
				<Toolbar>
					<Typography
						component="div"
						sx={{
							display: {
								md: 'block',
								sm: 'none',
							},
							flexGrow: 1,
						}}
						variant="h3"
					>
						Cube Level Midnight
					</Typography>
					<NavigationButtonSet />
				</Toolbar>
			</AppBar>
			{children}
			<AppBar
				position="sticky"
				sx={{
					bottom: 0,
					display: {
						lg: 'none',
						md: 'flex',
					},
				}}
			>
				<Toolbar
					component="nav"
					sx={{
						background: `linear-gradient(to right, ${primary.main}, calc(2/3 * 100%), ${secondary.main})`,
						display: 'flex',
						justifyContent: 'space-around',
					}}
				>
					<NavigationButtonSet />
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navigation;
