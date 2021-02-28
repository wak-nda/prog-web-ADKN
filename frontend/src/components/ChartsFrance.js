import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';
import styles from '../styles/css/ChartsFrance.module.scss';

export const ChartsFrance = ({ dailyDataFrance }) => {
	console.log(dailyDataFrance);
	const lineChartCasData = {
		labels: dailyDataFrance.map(({ date }) => date),
		datasets: [{
			data: dailyDataFrance.map(({ casConfirmes }) => casConfirmes),
			label: 'Infectés',
			borderColor: '#3333ff',
			fill: true,
			pointRadius: 0
		}]
	};

	const lineChartCas = (
		dailyDataFrance.length
			? (
				<Line data={lineChartCasData} />
			) : null
	);

	const lineChartDeathsData = {
		labels: dailyDataFrance.map(({ date }) => date),
		datasets: [{
			data: dailyDataFrance.map(({ deces }) => deces),
			label: 'Décédés',
			borderColor: 'red',
			backgroundColor: 'rgba(255,0,0,0.5)',
			fill: true,
			pointRadius: 0
		}]
	};

	const lineChartDeaths = (
		dailyDataFrance.length
			? (
				<Line data={lineChartDeathsData} />
			) : null
	);

	return (
		<div className={styles.container}>
			{lineChartCas}
			{lineChartDeaths}
		</div>
	);
};

ChartsFrance.propTypes = {
	dailyDataFrance: PropTypes.isRequired
};
