import papa from 'papaparse';
import { features } from '../data/departments.json';
import { legendItems } from '../entities/LegendItems';

export class LoadDepartmentsTask {
	covidUrl =
		'https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7';

	setState = null;

	mapDepartments = features;

	load = (setState) => {
		this.setState = setState;
		papa.parse(this.covidUrl, {
			download: true,
			header: true,
			complete: (result) => {
				// console.log(result);
				this.#processCovidData(result.data);
			}
		});
		setState(features);
	};

	#processCovidData = (covidDepartments) => {
		for (let i = 0; i < this.mapDepartments.length; i += 1) {
			const depFromJSON = this.mapDepartments[i];
			const covidDepartment = covidDepartments.find(
				(depFromData) => depFromJSON.properties.dep === depFromData.dep
			);
			console.log(covidDepartment);

			depFromJSON.properties.confirmed = 0;
			depFromJSON.properties.CONFIRMEDTEXT = '0';

			if (covidDepartment != null) {
				const confirmed = Number(covidDepartment.Confirmed);
				covidDepartments.filter((dep) => dep === depFromJSON.properties.dep).map((filteredDep) => (console.log(filteredDep)));
				// console.log(confirmed);
				depFromJSON.properties.confirmed = confirmed;
				// countryFromCSV.properties.CONFIRMEDTEXT = confirmed;
				depFromJSON.properties.CONFIRMEDTEXT = this.#formatNumberWithCommas(
					confirmed
				);
			}
			break;
			//this.#setDepartmentColor(depFromCSV);
		}

		this.setState(this.mapDepartments);
	}

	#setDepartmentColor = (dep) => {
		const legendItem = legendItems.find((item) => item.isFor(dep.properties.confirmed));

		if (legendItem != null) dep.properties.color = legendItem.color;
	};

	#formatNumberWithCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
