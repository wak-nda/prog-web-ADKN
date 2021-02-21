import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography, Grid } from '@material-ui/core';
// import CountUp from 'react-countup';
// import cx from 'classnames';

import { fetchMonthlyData, fetchDepartementData } from '../../api';

import styles from './CovidTracker.module.scss'

export const CovidTracker = () => {
    // const [data, setData] = useState([]);
    // const [dailyData, setDailyData] = useState([]);
    const [departementData, setDepartementData] = useState([]);

    // useEffect(() => {
    //     const fetchAPI = async () => {
    //         setData(await fetchTotalData());
    //     }
    //     fetchAPI();
    // }, []);

    useEffect(() => {
        const fetchAPI = async () => {
            // setDailyData(await fetchMonthlyData());
            setDepartementData(await fetchDepartementData())
        }
        fetchAPI();
        // console.log(departementData);
    }, []);

    // const lineChart = (
    //     dailyData.length
    //     ? (
    //         <Line data={{
    //             labels: dailyData.map(({ date }) => date),
    //             datasets: [{
    //                 data: dailyData.map(({ confirmed }) => confirmed),
    //                 label: 'Infected',
    //                 borderColor: '#3333ff',
    //                 fill: true
    //             }, {
    //                 data: dailyData.map(({ deaths }) => deaths),
    //                 label: 'Deaths',
    //                 borderColor: 'red',
    //                 backgroundColor: 'rgba(255,0,0,0.5)',
    //                 fill: true
    //             }, {
    //                 data: dailyData.map(({ recovered }) => recovered),
    //                 label: 'Recovered',
    //                 borderColor: 'green',
    //                 // backgroundColor: 'rgba(255,0,0,0.5)',
    //                 fill: true
    //             }]
    //             }}
    //         />
    //     ) : null
    // );

    const barChart = (
        departementData.length
        ? (
            <Bar data={{
                labels: ['Infectés', 'Soignés', 'Décédés'],
                datasets: [{
                    label: 'Individus',
                    backgroundColor: [
                        'rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255,0,0,0.5)'
                    ]
                }],
                data: [departementData.map(({totalConfirmed}) => totalConfirmed), departementData.map(({totalRecovered}) => totalRecovered), departementData.map(({totalDeaths}) => totalDeaths)]
                }}
            options={{
                legend: { display: false },
                title: { display: true, text: 'Current state in this departement' }
            }}
            />
        ) : null
    )

    return (
        <div className={styles.container}>
            {/* <div>{lineChart}</div> */}
            <h1>{departementData.map(({totalConfirmed}) => totalConfirmed)}</h1>
            {barChart}
        </div>
    );
};

