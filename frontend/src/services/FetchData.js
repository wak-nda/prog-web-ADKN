import baseInstance from './api'

export const fetchTotalDataFrance = async () => {
    const totalDataFrance = await baseInstance.get('api/getDataFrance');
    return totalDataFrance;
};

export const fetchTotalDataHosp = async () => {
    const totalDataHosp = await baseInstance.get('api/getTotalData');
    return totalDataHosp;
}
