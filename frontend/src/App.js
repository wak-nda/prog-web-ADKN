import React, { useCallback, useEffect, useState } from 'react';

import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';

import { Covid19Map } from './pages/Covid-19Map';
import { Itunes } from './pages/Itunes';
import { Error404 } from './pages/Error404';
import useLocalStorage from './lib/useLocalStorage';
import { ThemeContext } from './context/ThemeContext';
import { HistoryContextProvider } from './context/HistoryContext';
import './App.scss';
import { Login } from './pages/Login';

const App = () => {
	const [theme, setTheme] = useState();
	const [storageMode, setStorageMode] = useLocalStorage('darkmode');

	const changeThemeContext = useCallback((newTheme) => {
		setTheme(newTheme);
		setStorageMode(newTheme);
	}, [setStorageMode]);

	useEffect(() => {
		setTheme(storageMode);
	}, [storageMode]);

	return (
		<ThemeContext.Provider value={{ theme, changeThemeContext }}>
			<HistoryContextProvider>
				<Router>
					<Switch>
						<Route path="/covid-19-map">
							<Covid19Map />
						</Route>
						<Route path={[
							'/itunes/:search',
							'/itunes'
						]}
						>
							<Itunes />
						</Route>
						<Route exact path="/">
							<Login />
						</Route>
						<Route path="*">
							<Error404 />
						</Route>
					</Switch>
				</Router>
			</HistoryContextProvider>
		</ThemeContext.Provider>
	);
};

export default App;
