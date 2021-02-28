import papa from 'papaparse';
import { features } from '../data/departments.json';
import { legendItems } from '../entities/LegendItems';

export class LoadDepartmentsTask {
	covidUrl =
		'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv';

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
			const depFromCSV = this.mapDepartments[i];
			//console.log(country);
			const covidDepartment = covidDepartments.find(
				(depFromData) => depFromCSV.properties.ISO_A3 === depFromData.ISO3
			);

			depFromCSV.properties.confirmed = 0;
			depFromCSV.properties.CONFIRMEDTEXT = '0';

			if (covidDepartment != null) {
				const confirmed = Number(covidDepartment.Confirmed);
				// console.log(confirmed);
				depFromCSV.properties.confirmed = confirmed;
				// countryFromCSV.properties.CONFIRMEDTEXT = confirmed;
				depFromCSV.properties.CONFIRMEDTEXT = this.#formatNumberWithCommas(
					confirmed
				);
			}
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
