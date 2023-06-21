/** @file manages state pertaining to user preferences, such as light / dark mode and static text language */
import {
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	// useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

import {
	ThemeProvider,
	createTheme,
	responsiveFontSizes,
	useMediaQuery,
} from '@mui/material';
import {
	deepOrange,
	deepPurple,
	green,
	yellow, 
} from '@mui/material/colors';

interface PreferencesContextValue {
	// allowNotificationsState: boolean;
	darkModeState: boolean;
	// setAllowNotificationsState: Dispatch<SetStateAction<boolean>>;
	setDarkModeState: Dispatch<SetStateAction<boolean>>;
}

const PreferencesContext = createContext<PreferencesContextValue>({} as PreferencesContextValue);

const PreferencesProvider: FC<PropsWithChildren> = ({ children }) => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const [darkModeState, setDarkModeState] = useState(prefersDarkMode);

	useEffect(
		() => setDarkModeState(prefersDarkMode),
		[prefersDarkMode],
	);

	const preferencesContextValue = useMemo(
		() => ({
			darkModeState,
			setDarkModeState,
		}),
		[darkModeState, setDarkModeState],
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
						info: { main: '#5B995A' },
						mode: darkModeState
							? 'dark'
							: 'light',
						primary: darkModeState
							? { main: '#F3A800' }
							: { main: '#824026' },
						secondary: darkModeState
							? { main: '#824026' }
							: { main: '#F3A800' },
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
