import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
// import { Line } from 'react-chartjs-2';

import { fetchTotalData } from '../../api';

import styles from './CovidTracker.module.scss'

export const CovidTracker = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setData(await fetchTotalData());
        }
        fetchAPI();
    }, []);

    // const lineChart = (
    //     dailyData.length ? (
    //     <Line
    //         data = {{
    //             labels: dailyData.map(({date}) => date),
    //             datasets: [{
    //                 data: dailyData.map(({confirmed}) => confirmed),
    //                 label: 'Infected',
    //                 borderColor: '#3333ff',
    //                 fill: true,
    //             }, {
    //                 data: dailyData.map(({deaths}) => deaths),
    //                 label: 'Deaths',
    //                 borderColor: 'red',
    //                 backgroundColor: 'rgba(255,0,0,0.5)',
    //                 fill: true,
    //             }],
    //             }}/>) : null
    // );

    return (
        <div className={styles.container}>

        </div>
    );
};

