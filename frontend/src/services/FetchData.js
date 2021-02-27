import baseInstance from './api';
import regions from '../data/regions.json';

export const fetchTotalDataFrance = async () => {
    const totalDataFrance = await baseInstance.get('api/getDataFrance');
    return totalDataFrance;
};

export const fetchTotalDataHospFrance = async () => {
    const totalDataHospFrance = await baseInstance.get('api/getTotalData');
    return totalDataHospFrance;
}

export const fetchDailyDataFrance = async () => {
    const dailyDataFrance = await baseInstance.get('api/getDailyDataFrance');
    return dailyDataFrance;
}

export const fetchTotalDataHospRegions = async () => {
    const totalDataHospRegions = await baseInstance.get('api/getHopsDataInRegions');
    return totalDataHospRegions;
}

export const fetchRegions = async () => {
    console.log(regions);
    return regions;
}
