import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography, Grid } from '@material-ui/core';
// import CountUp from 'react-countup';
// import cx from 'classnames';
import { Line } from 'react-chartjs-2';

import { fetchMonthlyData } from '../../api';

import styles from './CovidTracker.module.scss'

export const CovidTracker = () => {
    // const [data, setData] = useState([]);
    const [dailyData, setDailyData] = useState([]);

    // useEffect(() => {
    //     const fetchAPI = async () => {
    //         setData(await fetchTotalData());
    //     }
    //     fetchAPI();
    // }, []);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchMonthlyData());
        }
        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length
        ? (
            <Line data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true
                }, {
                    data: dailyData.map(({ recovered }) => recovered),
                    label: 'Recovered',
                    borderColor: 'green',
                    // backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true
                }]
                }}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    );
};

