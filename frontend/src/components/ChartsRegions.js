import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import styles from '../styles/css/ChartsFrance.module.scss';

export const ChartsRegion = ({ dailyData }) => {
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
        datasets: [{
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
        datasets: [{
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

    return (
        <div className={styles.container}>
            {lineChartHosp}
            {lineChartRad}
            {lineChartDeaths}
        </div>
    )
}

ChartsRegion.propTypes = {
	dailyData: PropTypes.shape([]).isRequired
};
