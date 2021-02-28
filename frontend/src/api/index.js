import axios from 'axios';

const url = 'http://localhost:5000/api/';

export const fetchTotalDataFrance = async () => {
	const totalDataFrance = await axios.get(`${url}/getDataFrance`);
	return totalDataFrance;
};
