import baseInstance from './api';
import AuthHelperMethods from './AuthHelperMethods';

export const SendingMail = async (subject, message, mail) => {
	const Auth = new AuthHelperMethods();
	try {
		const responseJson = await baseInstance.post('api/mailing', {
			mail: mail,
			subject: subject,
			msg: message,
			name: Auth.getName()
		});
		return responseJson;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
		return { data: { res: false } };
	}
};
