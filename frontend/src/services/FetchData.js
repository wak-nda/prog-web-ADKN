import baseInstance from './api'

export const fetchTotalDataFrance = async () => {
    const totalDataFrance = await baseInstance.get('api/getDataFrance');
    return totalDataFrance;
};

export const fetchTotalDataHosp = async () => {
    const totalDataHosp = await baseInstance.get('api/getTotalData');
    return totalDataHosp;
}

export const fetchDailyDataFrance = async () => {
    const dailyDataFrance = await baseInstance.get('api/getDailyDataFrance');
    return dailyDataFrance;
}
