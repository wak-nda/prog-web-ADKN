import baseInstance from './api';

export const getPeriods = async () => {
	const periods = await baseInstance.get('/api/getPeriods');
	return periods;
};
