import React, { useState, useEffect, useCallback } from 'react';

import { Chart } from '../../components/Chart/Chart'
import styles from '../../styles/css/CovidTracker.module.scss'
import { fetchTotalData } from '../../api/index'

export const CovidTracker = () => {
    const [totalData, setTotalData] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchAPI = useCallback(async () => {
        setLoading(true);
        try {
			const response = await fetchTotalData();
            setTotalData(response);
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e);
			setError(true);
		} finally {
			setLoading(false);
		}
	}, [])

    useEffect(() => {
        fetchAPI(); 
    }, []);
    // console.log(totalData.data);
    return (
        <div className={styles.container}>
            {/* <Chart data={totalData} departement="" loading={loading} /> */}
            <Chart data={totalData} departement="Alpes-Maritimes" loading={loading}  />
        </div>
    );
};

