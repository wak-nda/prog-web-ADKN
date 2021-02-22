import React, { useState, useEffect } from 'react';

import { Chart } from '../../components/Chart/Chart'

import { fetchDepartementData } from '../../api';

import RegionsList from '../../data/regions.json';

import styles from './CovidTracker.module.scss';
import { AutoComplete } from '../../components/AutoComplete/AutoComplete';

export const CovidTracker = () => {
    const [departementData, setDepartementData] = useState([]);
    const [region, setRegion] = useState("");

    useEffect(() => {
        const fetchAPI = async () => {
            setDepartementData(await fetchDepartementData())
        }
        fetchAPI();
    }, []);
    return (
        <div className={styles.container}>
            <AutoComplete data={RegionsList} onSelect={region => setRegion(region)} />
            <div> {region && (
                        <pre className="text-left">
                            {JSON.stringify(region, 0, 2)}
                        </pre>
                    )}</div>
            <Chart data={departementData} departement="" />
            <Chart data={departementData} departement="Alpes-Maritimes" />
        </div>
    );
};

