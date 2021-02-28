import baseInstance from './api';
import { LegendItem } from '../entities/LegendItem';

export const getDeptNumbersBy = async (dep) => {
	const deptNumbers = await baseInstance.get(`api/getSumByDep/${dep}`);
	// console.log(deptNumbers);
	return deptNumbers;
};

export const getDeptNumbers = async () => {
	const deptNumbers = await baseInstance.get('api/getSumByDeps');
	// console.log(deptNumbers);
	return deptNumbers;
};

export const getMaxHosp = async () => {
	const maxHosp = await baseInstance.get('api/getMaxSumByDeps');
	return maxHosp.data.maxHos;
};


export const getLegendsItemsByType = async (type) => {
	if (!Array.isArray(type)) {
		type = [type];
	}

	let val = 0;
	const v = await baseInstance.get('api/getMaxSumByDeps');
	console.log('message ');
	// alert(v.data.maxHos);
	console.log(type);
	if (type[0] === 'Hospitalisation') {
		//alert('oco');
		// console.log(type[0]);
		val = v.data.maxHos;
	}
	if (type[0] === 'Decès') {
		// console.log(type[0]);
		val = v.data.maxDec;
	}
	if (type[0] === 'Reanimation') {
		val = v.data.maxRea;
	}
	if (type[0] === 'Retour à domicile') {
		val = v.data.maxRad;
	}
	const modulo = val % 5;
	const dv = (modulo !== 0) ? (((val - modulo) + 5) / 5) : (val / 5);
	//console.log('UCU');
	//console.table(v);
	const b2 = dv * 2;
	const b3 = dv * 3;
	const b4 = dv * 4;
	const b5 = dv * 5;

	return [
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
};
