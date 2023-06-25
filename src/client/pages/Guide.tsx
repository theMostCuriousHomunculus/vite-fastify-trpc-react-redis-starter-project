import {
	FC,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	IconButton,
	InputAdornment,
	List,
	ListItem,
	Paper,
	TextField,
	Typography,
	// useMediaQuery,
} from '@mui/material';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SendIcon from '@mui/icons-material/Send';
import { franc } from 'franc-min';
import iso6393To1 from '../constants/iso-6393-to-1';
import { useTheme } from '@mui/material';

import Page from '../components/Page';
import { PreferencesContext } from '../contexts/preferences';
import { ResponsiveLabeledIconButton } from '../components/ResponsiveLabeledIcon';
import { trpc } from '../utils/trpc';

type Message = {
	content: string;
	from: 'assistant';
	lang: typeof iso6393To1[string];
	timestamp: number;
} | {
	content: string;
	from: 'user';
	timestamp: number;
};

const Guide: FC = () => {
	const { language } = useContext(PreferencesContext);
	const newMessageRef = useRef<HTMLInputElement>();
	const [newMessageText, setNewMessageText] = useState('');
	const [messages, setMessages] = useState<Array<Message>>([]);
	const {
		breakpoints,
		palette: {
			primary,
			secondary,
		},
	} = useTheme();
	// const desktop = useMediaQuery(breakpoints.up('md'));
	const {
		data,
		mutate,
	} = trpc
		.prompt
		.useMutation();

	const preach = () => {
		setMessages(
			(prevState) => [
				...prevState,
				{
					content: newMessageText,
					from: 'user',
					timestamp: Date.now(),
				},
			],
		);
		mutate({ query: newMessageText });
		setNewMessageText('');
		newMessageRef.current?.focus();
	};

	useEffect(
		() => {
			if (data) {
				setMessages(
					(prevState) => [
						...prevState,
						{
							content: data,
							from: 'assistant',
							lang: iso6393To1[franc(data)],
							timestamp: Date.now(),
						},
					],
				);
			}
		},
		[data],
	);

	return (
		<Page>
			<Card
				style={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
				}}
			>
				<CardHeader title={<Typography variant="h2">AI Zoo Guide</Typography>} />
				<CardContent
					style={{
						display: 'flex',
						flexDirection: 'column-reverse',
						flexGrow: 1,
						marginRight: 16,
						overflowY: 'auto',
					}}
				>
					<List sx={{ padding: 0 }}>
						{messages
							.map((message) => (
								<ListItem
									key={message.timestamp}
									sx={{
										display: 'flex',
										flexDirection: message.from === 'user'
											? 'row-reverse'
											: 'row',
										margin: '4px 0',
										padding: 0,
									}}
								>
									<Paper
										sx={{
											backgroundColor: message.from === 'user'
												? primary.main
												: secondary.main,
											minWidth: '50%',
											overflowWrap: 'break-word',
											padding: '0 8px',
											textAlign: message.from === 'user'
												? 'right'
												: 'left',
										}}
									>
										{message.from === 'assistant'
											&& (
												<ResponsiveLabeledIconButton
													icon={GraphicEqIcon}
													onClick={() => {
														const utterThis = new SpeechSynthesisUtterance(message.content);
														// eslint-disable-next-line prefer-destructuring
														utterThis.lang = message.lang;
														// https://stackoverflow.com/questions/41539680/speechsynthesis-speak-not-working-in-chrome
														speechSynthesis.cancel();
														speechSynthesis.speak(utterThis);
													}}
													title="Read"
												/>
											)}
										{message.content
											.split('\n')
											.map(
												(subString, index) => (
													<Typography
														key={index}
														variant="body1"
													>
														{subString}
													</Typography>
												),
											)}
										<Typography variant="caption">
											{new Date(message.timestamp).toLocaleString()}
										</Typography>
									</Paper>
								</ListItem>
							))}
					</List>
				</CardContent>
				<CardActions
					sx={{
						alignItems: 'stretch',
						columnGap: 1,
						flexDirection: 'row',
					}}
				>
					<TextField
						InputProps={{
							endAdornment: (
								<InputAdornment
									position="end"
									sx={{
										alignSelf: 'flex-end',
										display: 'flex',
										flexDirection: 'row',
										height: '100%',
									}}
								>
									{!newMessageText.length
										&& (
											<IconButton
												onClick={() => {
													const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
													const recognition = new SpeechRecognition();
													let timer: NodeJS.Timeout;
													recognition.continuous = false;
													recognition.interimResults = true;
													recognition.lang = language;
													recognition.start();
													recognition.onresult = (sre) => setNewMessageText(sre.results[0][0].transcript);
													recognition.onspeechend = () => {
														timer = setTimeout(
															() => recognition.stop(),
															4000,
														);
													};
													recognition.onspeechstart = () => clearTimeout(timer);
												}}
											>
												<KeyboardVoiceIcon />
											</IconButton>
										)}
									<IconButton
										disabled={newMessageText.length === 0}
										onClick={() => {
											if (newMessageText.length > 0) preach();
										}}
									>
										<SendIcon />
									</IconButton>
								</InputAdornment>
							),
						}}
						autoComplete="off"
						fullWidth
						inputRef={newMessageRef}
						maxRows={6}
						minRows={2}
						multiline
						onChange={(event) => {
							if (event.target.value !== '\n') {
								setNewMessageText(event.target.value);
							}
						}}
						onKeyDown={(event) => {
							if (
								!event.shiftKey
								&& event.key === 'Enter'
								&& newMessageText.length > 0
							) {
								preach();
							}
						}}
						type="text"
						value={newMessageText}
					/>
				</CardActions>
			</Card>
		</Page>
	);
};

export default Guide;
