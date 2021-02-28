import React, { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import { MapComponent } from '../components/MapComponent';
import { Legend } from '../components/Legend';
import { LoadCountriesTask } from '../tasks/LoadCountriesTask';
import { LoadDepartmentsTask } from '../tasks/LoadDepartmentsTask';
import { legendItems } from '../entities/LegendItems'

export const Covid19Map = () => {
	const [countries, setCountries] = useState([]);
	const [departments, setDepartments] = useState([]);
	const legendItemsReverse = [...legendItems].reverse();
	// console.log(legendItemsReverse);

	const load = () => {
		// console.log("load");
		const loadCountriesTask = new LoadCountriesTask();
		loadCountriesTask.load(setCountries);
		// console.log(countries);
		const loadDepartmentsTask = new LoadDepartmentsTask();
		loadDepartmentsTask.load(setDepartments);
		// console.log(departments);
	};

	useEffect(load, [countries, departments]);

	return (
		<div>
			{countries.length === 0 ? (
				<Loading />
			) : (
				<div>
					<MapComponent countries={countries} departments={departments} />
					<Legend legendItems={legendItemsReverse} />
				</div>
			)}
		</div>
	);
};
