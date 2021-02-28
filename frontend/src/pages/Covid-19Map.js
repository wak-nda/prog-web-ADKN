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
	const [legendItemsReverse, setlegendItemsReverse] = useState([]);
	// console.log(legendItemsReverse);

	/*const load = () => {
		// console.log("load");
		// const loadCountriesTask = new LoadCountriesTask();
		// loadCountriesTask.load(setCountries);
		// console.log(countries);
		const loadDepartmentsTask = new LoadDepartmentsTask();
		await loadDepartmentsTask.load(setDepartments);
		// console.log(departments);
	};*/

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
		(async () => {
			try {
				alert(selection);
				const l = await getLegendsItemsByType(selection);
				setlegendItemsReverse(l.reverse());
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e);
			}
		})();
	}, [selection]);

	//useEffect(load, [countries, departments]);

	return (
		<div>
			{departments.length === 0 ? (
				<Loading />
			) : (
				<div>
					<MapComponent departments={departments} />
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
