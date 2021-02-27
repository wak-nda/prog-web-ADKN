import decode from 'jwt-decode';

export default class AuthHelperMethods {
	// Initializing important variables

	loggedIn = () => {
		// Checks if there is a saved token and it's still valid
		const token = this.getToken();// Getting token from localstorage
		if (token == null) {
			return true;
		}
		return this.isTokenExpired(token);
	};

	isTokenExpired = (token) => {
		try {
			const decoded = decode(token);
			if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
				return true;
			}
			return false;
		} catch (err) {
			console.log('expired check failed! Line 42: AuthService.js');
			return false;
		}
	};

	setToken = (idToken, email, name) => {
		// Saves user token to localStorage
		localStorage.setItem('id_token', idToken);
		localStorage.setItem('email', email);
		localStorage.setItem('name', name);
		localStorage.setItem('dark', 'dark');
	};

	getToken = () => localStorage.getItem('id_token');

	getMail = () => localStorage.getItem('email');

	getName = () => localStorage.getItem('name');


	logout = () => {
		// Clear user token and profile data from localStorage
		localStorage.removeItem('id_token');
		return true;
	};
}
