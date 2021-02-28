import baseInstance from './api';

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
