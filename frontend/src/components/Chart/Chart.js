import React, {useState, useEffect} from 'react';
import { fetchMonthlyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.scss';

export const Chart = ({ data: { totalConfirmed, totalRecovered, totalDeaths }, departement }) => {
    const [ monthlyData, setMonthlyData ] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setMonthlyData(await fetchMonthlyData())
        }
        fetchAPI();
    }, []);

    const lineChart = (
        monthlyData.length ? (
        <Line 
            data = {{
                labels: monthlyData.map(({date}) => date),
                datasets: [{
                    data: monthlyData.map(({confirmed}) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: monthlyData.map(({recovered}) => recovered),
                    label: 'Recovered',
                    borderColor: 'green',
                    backgroundColor: 'rgba(0,255,0,0.5)',
                    fill: true,
                }, {
                    data: monthlyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true,
                }],
                }}/>) : null
    );

    const barChart = (
        totalConfirmed ? (
            <Bar 
                data = {{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor : [
                            'rgba(0,0,255,0.5)',                            
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)'
                        ],
                        data: [totalConfirmed, totalRecovered, totalDeaths]
                    }]
                }}
                options = {{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${departement}`},
                    responsive: true,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        ) : null
    )

    return (
        <div className={styles.container}>
            {departement ? barChart : lineChart}
        </div>
    )
}
