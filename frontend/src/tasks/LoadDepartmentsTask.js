// import papa from 'papaparse';
import { features } from '../data/departments.json';
// import { features } from '../data/regionsLayer.json';
import { legendItems } from '../entities/LegendItems';
// import { getDeptNumbers } from '../services/loadMapData';
// import { getDeptNumbers } from '../services/loadMapData';

export class LoadDepartmentsTask {
	covidUrl =
		'https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7';

	setState = null;

	mapDepartments = features;

	load = async (setState) => {
		this.setState = setState;
		/*papa.parse(this.covidUrl, {
			download: true,
			header: true,
			complete: (result) => {
				// console.log(result);
				this.#processCovidData(result.data);
			}
		});*/
		/*try {
			// eslint-disable-next-line no-await-in-loop
			const response = await getDeptNumbers();
			const depts = response.data;
			console.log(depts);
			this.#processCovidData(depts);
		} catch (e) {
			console.log(e);
		}*/
		// await this.#processCovidData();
		setState(features);
	};

	#processCovidData = async (covidDepartments) => {
		console.log(this.mapDepartments)
		for (let i = 0; i < this.mapDepartments.length; i += 1) {
			const depFromJSON = this.mapDepartments[i];

			const covidDepartment = covidDepartments.find(
				// eslint-disable-next-line no-underscore-dangle
				(depFromData) => depFromJSON.properties.dep === depFromData._id
			);

			depFromJSON.properties.hosp = 0;
			depFromJSON.properties.rea = 0;
			depFromJSON.properties.rad = 0;
			depFromJSON.properties.dc = 0;
			depFromJSON.properties.HOSP_TEXT = '0';
			depFromJSON.properties.REA_TEXT = '0';
			depFromJSON.properties.RAD_TEXT = '0';
			depFromJSON.properties.DC_TEXT = '0';

			if (covidDepartment != null) {
				const hosp = Number(covidDepartment.sum_hosp);
				const rea = Number(covidDepartment.sum_rea);
				const rad = Number(covidDepartment.sum_rad);
				const dc = Number(covidDepartment.sum_dc);
				//console.log(hosp, rea, rad, dc);
				depFromJSON.properties.hosp = hosp;
				depFromJSON.properties.rea = rea;
				depFromJSON.properties.rad = rad;
				depFromJSON.properties.dc = dc;
				depFromJSON.properties.HOSP_TEXT = this.#formatNumberWithCommas(
					hosp
				);
				depFromJSON.properties.REA_TEXT = this.#formatNumberWithCommas(
					rea
				);
				depFromJSON.properties.RAD_TEXT = this.#formatNumberWithCommas(
					rad
				);
				depFromJSON.properties.DC_TEXT = this.#formatNumberWithCommas(
					dc
				);
			}
			/*const covidDepartment = covidDepartments.find(
				// eslint-disable-next-line no-underscore-dangle
				(depFromData) => depFromJSON.properties.dep === depFromData._id
			);
			console.log(covidDepartment);*/
			//break;
			//this.#setDepartmentColor(depFromCSV);
		}

		console.log(this.mapDepartments)
		this.setState(this.mapDepartments);
	}

	#setDepartmentColor = (dep) => {
		const legendItem = legendItems.find((item) => item.isFor(dep.properties.confirmed));

		if (legendItem != null) dep.properties.color = legendItem.color;
	};

	#formatNumberWithCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
