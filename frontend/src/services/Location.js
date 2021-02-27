export const getLocation = () => {
	let position = [0, 0];
	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition((location) => {
			position = [location.coords.latitude, location.coords.longitude];
		});
	}
	return position;
};
