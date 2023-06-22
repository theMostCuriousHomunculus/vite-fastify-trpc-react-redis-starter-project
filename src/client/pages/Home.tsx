import {
	FC,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import {
	Button,
	Typography,
} from '@mui/material';
import {
	DirectionsRenderer,
	GoogleMap,
	MarkerF,
	useLoadScript,
} from '@react-google-maps/api';

import Page from '../components/Page';
import animals from '../constants/animals';
import distance from '../utils/distance';
import { trpc } from '../utils/trpc';

const Home: FC = () => {
	const directionsRendererRef = useRef<google.maps.DirectionsRenderer>();
	const mapRef = useRef<google.maps.Map>();
	const watchID = useRef<number>();
	const postLocation = trpc
		.postLocation
		.useMutation();
	const [_directions, setDirections] = useState<google.maps.DirectionsResult>();
	const [userCoordinates, setUserCoordinates] = useState<google.maps.LatLngLiteral>();
	const options = useMemo<google.maps.MapOptions>(
		() => ({
			clickableIcons: false,
			mapId: '3eb05195c84a7aad',
		}),
		[],
	);
	const { isLoaded } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY });
	const onLoadDirectionsRenderer = useCallback(
		(directionsRenderer: google.maps.DirectionsRenderer) => {
			directionsRendererRef.current = directionsRenderer;
		},
		[],
	);
	const onLoadMap = useCallback(
		(map: google.maps.Map) => {
			mapRef.current = map;
		},
		[],
	);
	const navigatorPositionArgs: [
		PositionCallback,
		PositionErrorCallback,
		PositionOptions,
	] = [
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
			console.error(positionError.message);
		},
		{ enableHighAccuracy: true },
	];
	const fetchDirections = (animal: google.maps.LatLngLiteral) => {
		if (!userCoordinates) return;

		const service = new google.maps.DirectionsService();
		service.route(
			{
				destination: animal,
				origin: userCoordinates,
				travelMode: google.maps.TravelMode.WALKING,
			},
			(result, status) => {
				if (
					status === google.maps.DirectionsStatus.OK
					&& result
				) {
					/** @tutorial: https://stackoverflow.com/questions/76149553/next-js-react-18-google-maps-js-api-not-clearing-prior-map-state/76150188#76150188 */
					directionsRendererRef.current?.setMap(mapRef.current ?? null);
					directionsRendererRef.current?.setDirections(result);
					setDirections(result);
				}
			},
		);
	};

	useEffect(
		() => {
			return () => {
				if (watchID.current) {
					navigator.geolocation.clearWatch(watchID.current);
				}
			};
		},
		[],
	);

	// useEffect(
	// 	() => {
	// 		if (userCoordinates) {
	// 			for (const animal of animals) {
	// 				if (
	// 					distance(
	// 						userCoordinates,
	// 						animal.position,
	// 					) <= 10
	// 				) {
	// 					animal.info();
	// 				}
	// 			}
	// 		}
	// 	},
	// 	[userCoordinates],
	// );

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
							.getCurrentPosition(...navigatorPositionArgs);
						watchID.current = navigator
							.geolocation
							.watchPosition(...navigatorPositionArgs);
					}
				}}
			>
				Get Location
			</Button>
			{isLoaded
				&& (
					<GoogleMap
						center={userCoordinates}
						mapContainerClassName="map-container"
						onLoad={onLoadMap}
						options={options}
						zoom={17}
					>
						<DirectionsRenderer onLoad={onLoadDirectionsRenderer} />
						{animals
							.map(
								(animal) => (
									<MarkerF
										icon={{
											scaledSize: new google.maps.Size(
												30,
												30,
											),
											url: animal.url,
										}}
										key={animal.name}
										onClick={() => {
											fetchDirections(animal.position);
										}}
										position={animal.position}
									/>
								),
							)}
					</GoogleMap>
				)}
		</Page>
	);
};

export default Home;
