import React, { useState, useEffect, useCallback } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fetchDailyData } from '../../api';

import styles from '../../styles/css/Chart.module.scss';

export const Chart = ({dailyData}) => {

    // const [dailyData, setDailyData] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const fetchAPI = useCallback(async () => {
    //     setLoading(true);
    //     try {
	// 		// const response = await fetchTotalData();
    //         // setTotalData(response);
    //         const responseDailyData = await fetchDailyData(region);
    //         setDailyData(responseDailyData);
	// 	} catch (e) {
	// 		// eslint-disable-next-line no-console
	// 		console.log(e);
	// 		// setError(true);
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// }, [])

    // useEffect(() => {
    //     fetchAPI(); 
    // }, []);

    // if(loading){
    //     return( <p>
	// 		{loading && (
	// 			<FontAwesomeIcon icon={faSpinner} spin className={styles.fa} />
	// 		)}
	// 	</p> )
    // }

    // console.log(data)
    // console.log(numberOfHospitalized)
    // const barChartData = {
    //     labels: ['Infected', 'Recovered', 'Deaths'],
    //     datasets: [{
    //         label: 'People',
    //         backgroundColor: [
    //             'rgba(0,0,255,0.5)',
    //             'rgba(0,255,0,0.5)',
    //             'rgba(255,0,0,0.5)'
    //         ],
    //         data: [numberOfHospitalized, numberOfRecovered, numberOfDeaths]
    //     }]
    // };

    // const barChartOptions = {
    //     legend: { display: false },
    //     title: { display: true, text: `Current state in ${departement}` },
    //     responsive: true,
    //     scales: {
    //         yAxes: [{
    //             ticks: {
    //                 beginAtZero: true
    //             }
    //         }]
    //     }
    // }

    const lineChartHospData = {
        labels: dailyData.map(({ jour }) => jour),
        datasets: [{
            data: dailyData.map(({ hosp }) => hosp),
            label: 'Hospitalisés',
            borderColor: '#3333ff',
            fill: true,
            pointRadius: 0
        }]
    }

    const lineChartHosp = (
        dailyData.length
        ? (
            <Line data={lineChartHospData} />
        ) : null
    );

    const lineChartDeathsData = {
        labels: dailyData.map(({ jour }) => jour),
        datasets: [ {
            data: dailyData.map(({ dc }) => dc),
            label: 'Décédés',
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill: true,
            pointRadius: 0
        }]
    }

    const lineChartDeaths = (
        dailyData.length
        ? (
            <Line data={lineChartDeathsData} />
        ) : null
    );

    const lineChartRadData = {
        labels: dailyData.map(({ jour }) => jour),
        datasets: [ {
            data: dailyData.map(({ rad }) => rad),
            label: 'Retour à domicile',
            borderColor: 'green',
            backgroundColor: 'rgba(0,255,0,0.5)',
            fill: true,
            pointRadius: 0
        }]
    }

    const lineChartRad = (
        dailyData.length
        ? (
            <Line data={lineChartRadData} />
        ) : null
    );

    // const barChart = (
    //     numberOfHospitalized
    //     ? (
    //         <Bar data={barChartData} options={barChartOptions} />
    //     ) : null
    // )

    return (
        <div className={styles.container}>
            {/* {departement ? barChart : lineChart} */}
            {/* {barChart} */}
            {lineChartHosp}
            {lineChartRad}
            {lineChartDeaths}
        </div>
    )
}

// Chart.propTypes = {
// 	data: PropTypes.shape({
// 		numberOfHospitalized: PropTypes.number,
// 		numberOfDeaths: PropTypes.number,
// 		numberOfRecovered: PropTypes.number,
//      lastUpdateDate: PropTypes.string
// 	}).isRequired,
// 	departement: PropTypes.string.isRequired
// };
