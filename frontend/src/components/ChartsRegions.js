// import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
//import { useEffect } from 'react';
import styles from '../styles/css/ChartsFrance.module.scss';

export const ChartsRegion = ({ dailyData, periods }) => {
	//const [result, setResult] = useState([]);
	console.log(periods);
	const lineChartHospData = {
		series: [{
			data: dailyData.map((data) => ({ x: data.jour, y: data.hosp })),
			name: 'Hospitalisés'
		}],
		xaxis: {
			type: 'datetime',
			labels: {
				show: true,
				rotate: -45
			}
		},
		options: {
			annotations: {
				xaxis: [{
					x: '2020-03-29',
					x2: '2020-04-13',
					strokeDashArray: 0,
					borderColor: '#775dd0',
					label: {
						borderColor: '#775DD0',
						style: {
							color: '#fff',
							background: '#775DD0'
						},
						text: '1er Confinement (total)'
					}
				}]
			}
		}
	};
	const lineChartHosp = (
		dailyData.length && periods.length
			? (
				<Chart options={lineChartHospData.options} series={lineChartHospData.series} type="line" width="1000" />
			) : null
	);

	const lineChartDeathsData = {
		series: [{
			data: dailyData.map((data) => ({ x: data.jour, y: data.dc })),
			name: 'Hospitalisés'
		}],
		xaxis: {
			type: 'datetime',
			labels: {
				show: true,
				rotate: -45
			}
		},
		options: {
			annotations: {
				xaxis: [{
					x: '2020-03-29',
					x2: '2020-04-13',
					strokeDashArray: 0,
					borderColor: '#775dd0',
					label: {
						borderColor: '#775DD0',
						style: {
							color: '#fff',
							background: '#775DD0'
						},
						text: '1er Confinement (total)'
					}
				}]
			}
		}
	};
	const lineChartDeaths = (
		dailyData.length && periods.length
			? (
				<Chart options={lineChartDeathsData.options} series={lineChartDeathsData.series} type="line" width="1000" />
			) : null
	);

	const lineChartRadData = {
		series: [{
			data: dailyData.map((data) => ({ x: data.jour, y: data.rad })),
			name: 'Hospitalisés'
		}],
		xaxis: {
			type: 'datetime',
			labels: {
				show: true,
				rotate: -45
			}
		},
		options: {
			annotations: {
				xaxis: [{
					x: '2020-03-29',
					x2: '2020-04-13',
					strokeDashArray: 0,
					borderColor: '#775dd0',
					label: {
						borderColor: '#775DD0',
						style: {
							color: '#fff',
							background: '#775DD0'
						},
						text: '1er Confinement (total)'
					}
				}]
			}
		}
	};
	const lineChartRad = (
		dailyData.length && periods.length
			? (
				<Chart options={lineChartRadData.options} series={lineChartRadData.series} type="line" width="1000" />
			) : null
	);

	return (
		<div className={styles.container}>
			{lineChartHosp}
			{lineChartDeaths}
			{lineChartRad}
		</div>
	);
};

ChartsRegion.propTypes = {
	dailyData: PropTypes.shape([]).isRequired,
	periods: PropTypes.instanceOf(Array).isRequired
};
