import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loading } from '../components/Loading';
import { MapComponent } from '../components/MapComponent';
import { Legend } from '../components/Legend';
import { LoadDepartmentsTask } from '../tasks/LoadDepartmentsTask';
import { getLegendsItemsByType } from '../services/loadMapData';

export const Covid19Map = ({ selection }) => {
	// const [countries, setCountries] = useState([]);
	const [departments, setDepartments] = useState([]);
	//const legendItemsReverse = [...legendItems].reverse();
	const [location, setUserLocation] = useState();
	//console.log(useCurrentLocation(geolocationOptions));
	const [legendItemsReverse, setlegendItemsReverse] = useState([]);
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
				// alert(selection);
				const l = await getLegendsItemsByType(selection);
				setlegendItemsReverse(l.reverse());
				const loadDepartmentsTask = new LoadDepartmentsTask();
				await loadDepartmentsTask.load(setDepartments, selection);
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e);
			}
		})();
	}, [departments, selection]);

	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const l = await getLegendsItemsByType(selection);
	// 			setlegendItemsReverse(l.reverse());
	// 		} catch (e) {
	// 			// eslint-disable-next-line no-console
	// 			console.log(e);
	// 		}
	// 	})();
	// }, [selection]);

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

Covid19Map.propTypes = {
	selection: PropTypes.string
};

Covid19Map.defaultProps = {
	selection: 'Hospitalisation'
};
