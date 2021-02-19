import baseInstance from './api'

export const login = async (email, password) => {
	try {
		const responseJson = await baseInstance.post('api/user', {
			mail: email,
			password: password
		});
		// const responseJson = await response.json();
		// console.log(responseJson);
		return responseJson;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
		throw err;
	}
};
