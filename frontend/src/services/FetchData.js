import baseInstance from './api';
import regions from '../data/regions.json';
import typeData from '../data/typeData.json';


export const fetchTotalDataFrance = async () => {
	const totalDataFrance = await baseInstance.get('api/getDataFrance');
	return totalDataFrance;
};

export const fetchTotalDataHospFrance = async () => {
	const totalDataHospFrance = await baseInstance.get('api/getTotalData');
	return totalDataHospFrance;
};

export const fetchDailyDataFrance = async () => {
	const dailyDataFrance = await baseInstance.get('api/getDailyDataFrance');
	return dailyDataFrance;
};

export const fetchTotalDataHospRegions = async () => {
	const totalDataHospRegions = await baseInstance.get('api/getHopsDataInRegions');
	return totalDataHospRegions;
};

export const fetchDailyDataHospRegion = async (region) => {
    const dailyDataHospRegion = await baseInstance.get(`api/getHopsDataInRegions/${region}`);
	console.log(dailyDataHospRegion)
    return dailyDataHospRegion;
}

export const fetchMockData = async () => [
	{
		regionName: 'Grand Est',
		numberOfPeopleInRea: 81981,
		numberOfHospitalized: 678636,
		numberOfRecovered: 27398,
		numberOfDeaths: 7867,
		jour: '2021-02-21'
	},
	{
		regionName: 'Occitanie',
		numberOfPeopleInRea: 50325,
		numberOfHospitalized: 269910,
		numberOfRecovered: 13651,
		numberOfDeaths: 3109,
		jour: '2021-02-21'
	},
	{
		regionName: 'Provence-Alpes-Côte d\'Azur',
		numberOfPeopleInRea: 74628,
		numberOfHospitalized: 524956,
		numberOfRecovered: 25816,
		numberOfDeaths: 5436,
		jour: '2021-02-21'
	}
];

export const fetchRegions = async () => {
	console.log(regions);
	return regions;
};

export const fetchDataType = async () => typeData;

export const fetchCurrentTauxIncidenceFrance = async () => {
	const currentTauxIncidence = await baseInstance.get('api/getCurrentTauxIncidenceFrance');
	return currentTauxIncidence;
};

export const fetchWeeklyTauxIncidenceFrance = async () => {
	const weeklyTauxIncidence = await baseInstance.get('api/getWeeklyTauxIncidenceFrance');
	return weeklyTauxIncidence;
};
