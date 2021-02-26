import axios from 'axios';

const urlTotalData = 'http://localhost:5000/api/getTotalData';
const urlDailyDataPerRegion = 'http://localhost:5000/api/getDataFromHospitalInRegions';

export const fetchTotalData = async () => {
    try {
        const {data} = await axios.get(urlTotalData)
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const fetchDailyData = async (region) => {
    try {
        const {data} = await axios.get(`${urlDailyDataPerRegion}/${region}`)
        return data;
    } catch (error) {
    }
}

export const fetchDepartementData = async () => {
    console.log(departementData);
    return departementData;
}

export const fetchDepartementNameAndNumber = () => {
    console.log(departement);
    return departement;
}