/** @file responsible for rendering the main navigation links, core setting toggles and authentication button at the top or bottom of the user's screen on every page */
import {
	FC,
	useContext,
	useState,
} from 'react';

import {
	CircularProgress,
	Menu,
	MenuItem,
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import ExploreOffIcon from '@mui/icons-material/ExploreOff';
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import MapIcon from '@mui/icons-material/Map';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import {
	ResponsiveLabeledIconButton,
	ResponsiveLabeledIconLink,
} from './ResponsiveLabeledIcon';
import { PreferencesContext } from '../contexts/preferences';
import bcp47ToNativeLanguageName from '../constants/bcp47-to-native-language-name';

const NavigationButtonSet: FC = () => {
	const {
		darkModeState,
		geolocationPermission,
		language,
		locating,
		setDarkModeState,
		setLanguage,
		toggleLocation,
	} = useContext(PreferencesContext);
	const [languageMenuAnchorElement, setLanguageMenuAnchorElement] = useState<HTMLButtonElement | null>(null);
	console.log([...new Set(speechSynthesis.getVoices().map((voice) => voice.lang))]);
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

			{locating
				? <CircularProgress />
				: (
					<ResponsiveLabeledIconButton
						icon={geolocationPermission === 'granted'
							? ExploreIcon
							: ExploreOffIcon}
						onClick={toggleLocation}
						title={geolocationPermission === 'granted'
							? 'Disable Location Services'
							: 'Enable Location Services'}
					/>
				)}
			
			<ResponsiveLabeledIconButton
				icon={LanguageIcon}
				onClick={({ currentTarget }) => setLanguageMenuAnchorElement(currentTarget)}
				title="Language"
			/>
			<Menu
				anchorEl={languageMenuAnchorElement}
				anchorOrigin={{
					horizontal: 'right',
					vertical: 'bottom', 
				}}
				id="language-menu"
				onClick={() => setLanguageMenuAnchorElement(null)}
				onClose={() => setLanguageMenuAnchorElement(null)}
				open={Boolean(languageMenuAnchorElement)}
				transformOrigin={{
					horizontal: 'right',
					vertical: 'top', 
				}}
			>
				{[
					...new Set(
						speechSynthesis
							.getVoices()
							.map(
								(voice) => voice
									.lang
									.toLowerCase()
									.split('_#')[0]
									.replaceAll(
										'_',
										'-',
									),
							),
					),
				]
					.sort(
						(a, b) => {
							if (
								a === navigator
									.language
									.toLowerCase()
									.split('_#')[0]
									.replaceAll(
										'_',
										'-',
									)
							) return -1;
							if (
								b === navigator
									.language
									.toLowerCase()
									.split('_#')[0]
									.replaceAll(
										'_',
										'-',
									)
							) return 1;
							return 0;
						},
					)
					.map(
						(lang) => (
							<MenuItem
								key={lang}
								onClick={() => setLanguage(lang)}
								selected={language === lang}
							>
								{bcp47ToNativeLanguageName[lang as keyof typeof bcp47ToNativeLanguageName]}
							</MenuItem>
						),
					)}
			</Menu>

			<ResponsiveLabeledIconLink
				icon={HomeIcon}
				title="Home"
				to="/"
			/>

			<ResponsiveLabeledIconLink
				icon={QuestionAnswerIcon}
				title="Guide"
				to="/guide"
			/>

			<ResponsiveLabeledIconLink
				icon={MapIcon}
				title="Map"
				to="/map"
			/>
		</>
	);
};

export default NavigationButtonSet;
