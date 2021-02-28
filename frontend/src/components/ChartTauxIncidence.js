import React from 'react';
import PropTypes from 'prop-types';

import { Line } from 'react-chartjs-2';
import styles from '../styles/css/ChartsFrance.module.scss';

export const ChartTauxIncidenceFrance = ({ weeklyDataFrance }) => {
	console.log(weeklyDataFrance);
	const lineChartTauxIncidenceData = {
		labels: weeklyDataFrance.map(({ week }) => week),
		datasets: [{
			data: weeklyDataFrance.map(({ tauxIncidence }) => tauxIncidence),
			label: "Taux d'incidence",
			borderColor: '#6b3e26',
			fill: true,
			pointRadius: 0
		}]
	};

	const lineChartTauxIncidence = (
		weeklyDataFrance.length
			? (
				<Line data={lineChartTauxIncidenceData} />
			) : null
	);

	return (
		<div className={styles.container}>
			{lineChartTauxIncidence}
		</div>
	);
};

ChartTauxIncidenceFrance.propTypes = {
	weeklyDataFrance: PropTypes.isRequired
};
