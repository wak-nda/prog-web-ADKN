import baseInstance from './api'

export const fetchTotalDataFrance = async () => {
    const totalDataFrance = await baseInstance.get('api/getDataFrance');
    return totalDataFrance;
};
