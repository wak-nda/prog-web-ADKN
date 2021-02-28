import React, { useEffect, useState } from 'react';
//import { setPosition } from 'leaflet/src/dom/DomUtil';
import { Loading } from '../components/Loading';
import { MapComponent } from '../components/MapComponent';
import { Legend } from '../components/Legend';
// import { LoadCountriesTask } from '../tasks/LoadCountriesTask';
//import { useCurrentLocation } from '../services/Location';
import { LoadDepartmentsTask } from '../tasks/LoadDepartmentsTask';
import { legendItems } from '../entities/LegendItems';

export const Covid19Map = () => {
	// const [countries, setCountries] = useState([]);
	const [departments, setDepartments] = useState([]);
	const legendItemsReverse = [...legendItems].reverse();
	const [location, setUserLocation] = useState();
	//console.log(useCurrentLocation(geolocationOptions));
	// console.log(legendItemsReverse);
	const handleSuccess = (position) => {
		const { latitude, longitude } = position.coords;

		setUserLocation({
			latitude: latitude,
			longitude: longitude
		});
	};
	// const loadLocation = () => {
	//
	// };
	useEffect(() => {
		(async () => {
			try {
				const loadDepartmentsTask = new LoadDepartmentsTask();
				await loadDepartmentsTask.load(setDepartments);
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e);
			}
		})();
	}, [departments]);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(handleSuccess);
		//console.log(location);
	}, []);

	//useEffect(load, [countries, departments]);

	return (
		<div>
			{departments.length === 0 ? (
				<Loading />
			) : (
				<div>
					<MapComponent departments={departments} location={location} />
					<Legend legendItems={legendItemsReverse} />
				</div>
			)}
		</div>
	);
};
