/** @file manages state pertaining to user preferences, such as light / dark mode and static text language */
import {
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import {
	ThemeProvider,
	createTheme,
	responsiveFontSizes,
	useMediaQuery,
} from '@mui/material';

import { trpc } from '../utils/trpc';

// const Language = [
// 	{
// 		code: 'en-us',
// 		name: 'English',
// 	},
// 	{
// 		code: 'ar-sa',
// 		name: 'Arabic',
// 	},
// 	{
// 		code: 'zh-cn',
// 		name: 'Chinese',
// 	},
// 	{
// 		code: 'fr-ca',
// 		name: 'French',
// 	},
// 	{
// 		code: 'de-de',
// 		name: 'German',
// 	},
// 	{
// 		code: 'hi-in',
// 		name: 'Hindi',
// 	},
// 	{
// 		code: 'ko-kr',
// 		name: 'Korean',
// 	},
// 	{
// 		code: 'pt-br',
// 		name: 'Portuguese',
// 	},
// 	{
// 		code: 'es-mx',
// 		name: 'Spanish',
// 	},
// ] as const;

interface PreferencesContextValue {
	// allowNotificationsState: boolean;
	darkModeState: boolean;
	geolocationPermission?: PermissionState;
	language: string;
	locating: boolean;
	// setAllowNotificationsState: Dispatch<SetStateAction<boolean>>;
	setDarkModeState: Dispatch<SetStateAction<boolean>>;
	setLanguage: Dispatch<SetStateAction<string>>;
	// setVoice: Dispatch<SetStateAction<SpeechSynthesisVoice['name']>>;
	toggleLocation(): void;
	userCoordinates?: google.maps.LatLngLiteral;
	// voice: SpeechSynthesisVoice['name'];
}

const PreferencesContext = createContext<PreferencesContextValue>({} as PreferencesContextValue);

const PreferencesProvider: FC<PropsWithChildren> = ({ children }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const [darkModeState, setDarkModeState] = useState(prefersDarkMode);
	const [geolocationPermission, setGeolocationPermission] = useState<PermissionState>();
	const [language, setLanguage] = useState(
		navigator
			.language
			.toLowerCase()
			.split('_#')[0]
			.replaceAll(
				'_',
				'-',
			),
	);
	const [locating, setLocating] = useState(false);
	const [userCoordinates, setUserCoordinates] = useState<google.maps.LatLngLiteral>();
	const watchID = useRef<number>();
	const postLocation = trpc
		.postLocation
		.useMutation();
	const deniedMessage = 'You have blocked Zoo Guide from accessing your location in your browser/device settings.  If you wish to utilize our location based services, you will need to grant Zoo Guide location permission in your browser/device settings.';
	const navigatorPositionArgs = useMemo<[
		PositionCallback,
		PositionErrorCallback,
		PositionOptions,
	]>(
		() => [
			({
				coords: {
					// altitude,
					// heading,
					latitude,
					longitude,
					// speed,
				},
				// timestamp,
			}) => {
				setGeolocationPermission('granted');
				setLocating(false);
				setUserCoordinates({
					lat: latitude,
					lng: longitude,
				});
				postLocation.mutate({
					latitude,
					longitude,
				});
			},
			(positionError) => {
				setLocating(false);
				if (positionError.code === 1) {
					setGeolocationPermission('denied');
					alert(deniedMessage);
				} else {
					alert(`Unable to retrieve your location: ${positionError.message}`);
				}
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
			},
		],
		[],
	);
	const toggleLocation = useCallback(
		() => {
			if ('geolocation' in navigator) {
				switch (geolocationPermission) {
					case 'denied':
						alert(deniedMessage);
						break;
					case 'granted':
						if (watchID.current) {
							navigator.geolocation.clearWatch(watchID.current);
						}

						setUserCoordinates(undefined);
						setGeolocationPermission('prompt');
						break;
					case 'prompt':
						setLocating(true);
						navigator
							.geolocation
							.getCurrentPosition(...navigatorPositionArgs);
						watchID.current = navigator
							.geolocation
							.watchPosition(...navigatorPositionArgs);
						break;
					default:
						throw new Error('Should not throw.');
				}
			} else {
				alert('Geolocation is not supported by your cave man browser and/or device.');
			}
		},
		[geolocationPermission, navigatorPositionArgs],
	);

	useEffect(
		() => {
			(async () => {
				const G = await navigator.permissions.query({ name: 'geolocation' });
				setGeolocationPermission(G.state);
				if (G.state === 'granted') {
					// i think this might only be necessary in development due to strict mode or something...
					if (watchID.current === 1) {
						navigator.geolocation.clearWatch(watchID.current);
					}
					setLocating(true);
					navigator
						.geolocation
						.getCurrentPosition(...navigatorPositionArgs);
					watchID.current = navigator
						.geolocation
						.watchPosition(...navigatorPositionArgs);
				}
			})();

			return () => {
				if (watchID.current) {
					navigator.geolocation.clearWatch(watchID.current);
				}
			};
		},
		[],
	);

	useEffect(
		() => setDarkModeState(prefersDarkMode),
		[prefersDarkMode],
	);

	useEffect(
		() => {
			const handleLanguageChange = () => setLanguage(
				navigator
					.language
					.toLowerCase()
					.split('_#')[0]
					.replaceAll(
						'_',
						'-',
					),
			);

			window.addEventListener(
				'languagechange',
				handleLanguageChange,
			);

			return () => {
				window.removeEventListener(
					'languagechange',
					handleLanguageChange,
				);
			};
		},
		[],
	);

	const preferencesContextValue = useMemo(
		() => ({
			darkModeState,
			geolocationPermission,
			language,
			locating,
			setDarkModeState,
			setLanguage,
			toggleLocation,
			userCoordinates,
		}),
		[
			darkModeState,
			geolocationPermission,
			language,
			locating,
			setDarkModeState,
			setLanguage,
			toggleLocation,
			userCoordinates,
		],
	);

	const theme = useMemo(
		() => {
			return responsiveFontSizes(
				createTheme({
					components: {
						MuiAccordion: { defaultProps: { disableGutters: true } },
						MuiButton: { defaultProps: { variant: 'contained' } },
						MuiCardActions: {
							defaultProps: {
								sx: {
									display: 'flex',
									justifyContent: 'flex-end',
								},
							},
						},
					},
					palette: {
						error: { main: '#431F07' },
						info: { main: '#824026' },
						mode: darkModeState
							? 'dark'
							: 'light',
						primary: darkModeState
							? { main: '#5B995A' }
							: { main: '#F3A800' },
						secondary: darkModeState
							? { main: '#F3A800' }
							: { main: '#5B995A' },
						success: { main: '#96D65E' },
						warning: { main: '#F8F17F' },
					},
					typography: { fontFamily: 'monospace' },
				}),
			);
		},
		[darkModeState],
	);

	return (
		<PreferencesContext.Provider value={preferencesContextValue}>
			<ThemeProvider theme={theme}>
				{children}
			</ThemeProvider>
		</PreferencesContext.Provider>
	);
};

export {
	PreferencesContext,
	PreferencesProvider,
};
