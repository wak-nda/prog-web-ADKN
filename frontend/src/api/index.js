import axios from 'axios'

const url = 'http://localhost:9000/api';

export const fetchTotalData = async () => {
    let getTotalDataUrl = `${url}/getTotalData`;
    try {
        const totalData = await axios.get(getTotalDataUrl)
        console.log(totalData)
    } catch (error) {
        console.log(error)
    }
}
