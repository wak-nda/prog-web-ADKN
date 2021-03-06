import React, { useContext } from 'react';
import Toggle from 'react-toggle';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from '../context/ThemeContext';

import 'react-toggle/style.css';
import '../styles/css/ToggleModeNight.scss';

export const ToggleModeNight = () => {
	const { changeThemeContext } = useContext(ThemeContext);

	const handleChangeMode = (e) => {
		const themeValue = e.target.checked ? 'dark' : 'light';
		localStorage.setItem('dark', themeValue);
		changeThemeContext(themeValue);
	};
	return (
		<div className="ToggleModeNight">
			{/*
				here We have to prevent render Toggle
				on the first render theme is undefined, so we do not want to
				render Toggle with defaultChecked={undefined}
				check the doc > https://www.npmjs.com/package/react-toggle
			 */}
			{ (
				<Toggle
					id="mode"
					icons={{
						checked: (
							<FontAwesomeIcon class="adjust" icon={faMoon} className="fa faMoon" />
						),
						unchecked: (
							<FontAwesomeIcon class="adjustI" icon={faSun} className="fa faSun" />
						)
					}}
					// defaultChecked={theme === localStorage.getItem('dark')}
					checked={localStorage.getItem('dark') !== 'light'}
					onChange={handleChangeMode}
				/>
			)}
		</div>
	);
};
