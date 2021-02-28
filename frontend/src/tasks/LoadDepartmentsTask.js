// import papa from 'papaparse';
import { features } from '../data/departments.json';
// import { features } from '../data/regionsLayer.json';
import { getDeptNumbers, getMaxHosp } from '../services/loadMapData';
import { LegendItem } from '../entities/LegendItem';

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
		try {
			const response = await getDeptNumbers();
			const depts = response.data;
			console.log(depts);
			await this.#processCovidData(depts);
		} catch (e) {
			console.log(e);
		}
		// await this.#processCovidData();
		setState(features);
	};

	#processCovidData = async (covidDepartments) => {
		console.log(this.mapDepartments);


		const valM = await getMaxHosp();
		const modulo = valM % 5;

		const dv = (modulo !== 0) ? (((valM - modulo) + 5) / 5) : (valM / 5);
		console.log(`V ${dv}`);
		const b2 = dv * 2;
		const b3 = dv * 3;
		const b4 = dv * 4;
		const b5 = dv * 5;

		const legendI = [
			new LegendItem(
				`${b5} +`,
				'#741f1f',
				// "#8b0000",
				(cases) => cases >= 1_000_000,
				'white'
			),

			new LegendItem(
				`${b3} - ${b4 - 1}`,
				// "#741f1f",
				'#9c2929',
				(cases) => cases >= b4 && cases < b5,
				'White'
			),

			new LegendItem(
				`${b2} - ${b3 - 1}`,
				'#c57f7f',
				(cases) => cases >= b2 && cases < b3
			),

			new LegendItem(
				`${dv} - ${b2 - 1}`,
				'#d8aaaa',
				(cases) => cases >= dv && cases < b2
			),

			new LegendItem(
				`0 - ${dv - 1}`,
				'#ebd4d4',
				(cases) => cases > 0 && cases < dv
			),

			new LegendItem('No Data', '#acc4ff', () => true)
		];
		console.table(legendI);

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
			this.#setDepartmentColor(depFromJSON, legendI);
		}

		console.log(this.mapDepartments);
		this.setState(this.mapDepartments);
	};

	#setDepartmentColor = (dep, lg) => {
		const legendItem = lg.find((item) => item.isFor(dep.properties.hosp));

		if (legendItem != null) dep.properties.color = legendItem.color;
	};

	#formatNumberWithCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
