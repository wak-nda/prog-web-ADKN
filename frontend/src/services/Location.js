import { useState, useEffect } from 'react';

export const useCurrentLocation = () => {
	const [error, setError] = useState();
	const [userLocation, setUserLocation] = useState();
	const handleSuccess = (position) => {
		const { latitude, longitude } = position.coords;

		setUserLocation({
			latitude: latitude,
			longitude: longitude
		});
	};

	const handleError = (errorH) => {
		setError(errorH);
	};
	useEffect(() => {
		const geolocationOptions = {
			enableHighAccuracy: true,
			timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
			maximumAge: 1000 * 3600 * 24 // 24 hour
		};
		// If the geolocation is not defined in the used browser you can handle it as an error
		navigator.geolocation.getCurrentPosition(handleSuccess, handleError, geolocationOptions);
	}, []);// Expose location result and the possible error message

	return { location: userLocation, error: error };
};
