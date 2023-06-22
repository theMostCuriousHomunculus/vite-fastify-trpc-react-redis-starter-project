const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

const distance = (a: google.maps.LatLngLiteral, b: google.maps.LatLngLiteral) => {
	const R = 6_378_137; // Radius of the Earth in meters
	const dLat = degreesToRadians(b.lat - a.lat);
	const dLon = degreesToRadians(b.lng - a.lng);

	const val =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(degreesToRadians(a.lat)) * Math.cos(degreesToRadians(b.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

	return R * 2 * Math.atan2(
		Math.sqrt(val),
		Math.sqrt(1 - val),
	); // Distance in meters
};

export default distance;
