import React, { useState, useEffect } from 'react';

import { Chart } from '../../components/Chart/Chart'

import { fetchDepartementData } from '../../api';

import styles from './CovidTracker.module.scss';

export const CovidTracker = () => {
    const [departementData, setDepartementData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDepartementData(await fetchDepartementData())
        }
        fetchAPI();
    }, []);
    return (
        <div className={styles.container}>
            <Chart data={departementData} departement="" />
            <Chart data={departementData} departement="Alpes-Maritimes" />
        </div>
    );
};

