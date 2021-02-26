import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { fetchMonthlyData } from '../../api';

import styles from './Chart.module.scss';

export const Chart = ({ data: {numberOfHospitalized,numberOfRecovered, numberOfDeaths,lastUpdateDate}, departement, loading }) => {

    if(loading){
        return( <p>
			{loading && (
				<FontAwesomeIcon icon={faSpinner} spin className={styles.fa} />
			)}
		</p> )
    }

    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setMonthlyData(await fetchMonthlyData())
        }
        fetchAPI();
    }, []);

    // console.log(data)
    console.log(numberOfHospitalized)
    const barChartData = {
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [{
            label: 'People',
            backgroundColor: [
                'rgba(0,0,255,0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(255,0,0,0.5)'
            ],
            data: [numberOfHospitalized, numberOfRecovered, numberOfDeaths]
        }]
    };

    const barChartOptions = {
        legend: { display: false },
        title: { display: true, text: `Current state in ${departement}` },
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    const lineChartData = {
        labels: monthlyData.map(({ date }) => date),
        datasets: [{
            data: monthlyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true
        }, {
            data: monthlyData.map(({ recovered }) => recovered),
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: 'rgba(0,255,0,0.5)',
            fill: true
        }, {
            data: monthlyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255,0,0,0.5)',
            fill: true
        }]
    }

    const lineChart = (
        monthlyData.length
        ? (
            <Line data={lineChartData} />
        ) : null
    );

    const barChart = (
        numberOfHospitalized
        ? (
            <Bar data={barChartData} options={barChartOptions} />
        ) : null
    )

    return (
        <div className={styles.container}>
            {/* {departement ? barChart : lineChart} */}
            {barChart}
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
