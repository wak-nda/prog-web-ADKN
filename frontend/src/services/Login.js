import baseInstance from './api'
import AuthHelperMethods from './AuthHelperMethods';

export const login = async (email, password) => {
	try {
		const responseJson = await baseInstance.post('api/user', {
			mail: email,
			password: password
		});
		if (responseJson.data.res) {
			const Auth = new AuthHelperMethods();
			Auth.setToken(responseJson.data.token)
		}
		return responseJson;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
		return { data: { res: false } };
	}
};

