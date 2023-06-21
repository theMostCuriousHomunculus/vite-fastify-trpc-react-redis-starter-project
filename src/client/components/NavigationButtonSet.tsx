/** @file responsible for rendering the main navigation links, core setting toggles and authentication button at the top or bottom of the user's screen on every page */
import {
	FC,
	useContext,
} from 'react';

import LightModeIcon from '@mui/icons-material/LightMode.js';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound.js';

import { PreferencesContext } from '../contexts/preferences';
import { ResponsiveLabeledIconButton } from './ResponsiveLabeledIcon';

const NavigationButtonSet: FC = () => {
	const {
		darkModeState,
		setDarkModeState,
	} = useContext(PreferencesContext);
	
	return (
		<>
			<ResponsiveLabeledIconButton
				icon={darkModeState
					? NightlightRoundIcon
					: LightModeIcon}
				onClick={() => setDarkModeState((prevState) => !prevState)}
				title={darkModeState
					? 'Switch to Light Mode'
					: 'Switch to Dark Mode'}
			/>
		</>
	);
};

export default NavigationButtonSet;
