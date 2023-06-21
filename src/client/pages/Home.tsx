import {
	FC,
	useEffect,
	useRef,
	useState,
} from 'react';

import {
	Box,
	Button,
	Typography,
} from '@mui/material';
import { Loader } from '@googlemaps/js-api-loader';

import Page from '../components/Page';
import { trpc } from '../utils/trpc';

const loader = new Loader({ version: 'weekly' });

const Home: FC = () => {
	const mapRef = useRef<HTMLDivElement>();
	const postLocation = trpc
		.postLocation
		.useMutation();
	const [coordinates, setCoordinates] = useState<{ lat: number, lng: number}>();

	useEffect(
		() => {
			if (coordinates) {
				loader
					.importLibrary('maps')
					.then(({ Map }) => {
						new Map(
							mapRef.current!,
							{
								center: {
									lat: coordinates.lat,
									lng: coordinates.lng,
								},
								mapId: '3eb05195c84a7aad',
								zoom: 18,
							},
						);
					})
					.catch((e) => {
						console.error(e);
					});
			}
		},
		[coordinates],
	);
	return (
		<Page>
			<Typography variant="body1">
				Starter App
			</Typography>
			<Button
				onClick={() => {
					if ('geolocation' in navigator) {
						navigator
							.geolocation
							.getCurrentPosition(
								({
									coords: {
										altitude,
										heading,
										latitude,
										longitude,
										speed,
									},
									timestamp,
								}) => {
									setCoordinates({
										lat: latitude,
										lng: longitude,
									});
									postLocation.mutate({
										latitude,
										longitude,
									});
								},
								(positionError) => {
									console.error(positionError.message);
								},
								{ enableHighAccuracy: true },
							);
					}
				}}
			>
				Get Location
			</Button>
			<Box
				ref={mapRef}
				sx={{ flexGrow: 1 }}
			/>
		</Page>
	);
};

export default Home;
