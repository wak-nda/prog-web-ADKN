// import papa from 'papaparse';
import { features } from '../data/departments.json';
// import { features } from '../data/regionsLayer.json';
import { getDeptNumbers, getLegendsItemsByType } from '../services/loadMapData';
// import { LegendItem } from '../entities/LegendItem';

export class LoadDepartmentsTask {
	covidUrl =
		'https://www.data.gouv.fr/fr/datasets/r/63352e38-d353-4b54-bfd1-f1b3ee1cabd7';

	setState = null;

	mapDepartments = [...features];

	load = async (setState, selection) => {
		this.setState = setState;
		/*papa.parse(this.covidUrl, {
			download: true,
			header: true,
			complete: (result) => {
				// console.log(result);
				this.#processCovidData(result.data);
			}
		});*/
		try {
			const response = await getDeptNumbers();
			const depts = response.data;
			console.log(depts);
			await this.#processCovidData(depts, selection);
		} catch (e) {
			console.log(e);
		}
		// await this.#processCovidData();
		setState(this.mapDepartments);
	};

	#processCovidData = async (covidDepartments, selection) => {
		// console.log(this.mapDepartments);
		const l = await getLegendsItemsByType(selection);

		for (let i = 0; i < this.mapDepartments.length; i += 1) {
			const depFromJSON = this.mapDepartments[i];

			const covidDepartment = covidDepartments.find(
				// eslint-disable-next-line no-underscore-dangle
				(depFromData) => depFromJSON.properties.code === depFromData._id
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

				let d = selection;
				if (!Array.isArray(d)) {
					d = [d];
				}
				if (d[0] === 'Hospitalisation') {
					depFromJSON.properties.TEXT = this.#formatNumberWithCommas(
						hosp
					);
				}
				if (d[0] === 'Decès') {
					depFromJSON.properties.TEXT = this.#formatNumberWithCommas(
						dc
					);
				}
				if (d[0] === 'Reanimation') {
					depFromJSON.properties.TEXT = this.#formatNumberWithCommas(
						rea
					);
				}
				if (d[0] === 'Retour à domicile') {
					depFromJSON.properties.TEXT = this.#formatNumberWithCommas(
						rad
					);
				}
			}
			/*const covidDepartment = covidDepartments.find(
				// eslint-disable-next-line no-underscore-dangle
				(depFromData) => depFromJSON.properties.dep === depFromData._id
			);
			console.log(covidDepartment);*/
			//break;
			this.#setDepartmentColor(depFromJSON, l, selection);
		}

		console.log(this.mapDepartments);
		this.setState(this.mapDepartments);
	};

	#setDepartmentColor = (dep, lg, selection) => {
		if (!Array.isArray(selection)) {
			selection = [selection];
		}
		let legend;
		if (selection[0] === 'Hospitalisation') {
			legend = lg.find((item) => item.isFor(dep.properties.hosp));
		}
		if (selection[0] === 'Decès') {
			legend = lg.find((item) => item.isFor(dep.properties.dc));
		}
		if (selection[0] === 'Reanimation') {
			legend = lg.find((item) => item.isFor(dep.properties.rea));
		}
		if (selection[0] === 'Retour à domicile') {
			legend = lg.find((item) => item.isFor(dep.properties.rad));
		}

		if (legend != null) dep.properties.color = legend.color;
	};

	#formatNumberWithCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
