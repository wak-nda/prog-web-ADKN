import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

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

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> Infected</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={data.map(({ numberOfHospitalized }) => numberOfHospitalized)} duration={2.5} separator="," />
                        </Typography>
                        {/* <Typography color='textSecondary'>{new Date(lastUpdate).toDateString()}</Typography> */}
                        <Typography variant="body2"> Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> Recovered</Typography>
                        <Typography variant="h5"><CountUp start={0} end={data.map(({ numberOfRecovered }) => numberOfRecovered)} duration={2.5} separator="," />
                        </Typography>
                        {/* <Typography color='textSecondary'>{new Date({data.map(({numberOfRecovered}) => numberOfRecovered)}).toDateString()}</Typography> */}
                        <Typography variant="body2"> Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> Deaths</Typography>
                        <Typography variant="h5"><CountUp start={0} end={data.map(({ numberOfDeaths }) => numberOfDeaths)} duration={2.5} separator="," />
                        </Typography>
                        {/* <Typography color='textSecondary'>{new Date({data.map(({numberOfRecovered}) => numberOfRecovered)}).toDateString()}</Typography> */}
                        <Typography variant="body2"> Number of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}

