import React, { useState, useEffect, useCallback } from 'react';

import { Chart } from '../../components/Chart/Chart'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles/css/CovidTracker.module.scss'
import { fetchTotalData, fetchDailyData } from '../../api/index'
import { RegionPicker } from '../../components/RegionPicker/RegionPicker';

export const CovidTracker = () => {
    // // const [totalData, setTotalData] = useState([]);
    // const [dailyData, setDailyData] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [region, setRegion] = useState('');

    const [dailyData, setDailyData] = useState([]);
    const [loading, setLoading] = useState(false);
    const handleRegionChange = useCallback(async (region) => {
        setLoading(true);
        try {
			// const response = await fetchTotalData();
            // setTotalData(response);
            const responseDailyData = await fetchDailyData(region);
            setDailyData(responseDailyData);
            setRegion(region)
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e);
			// setError(true);
		} finally {
			setLoading(false);
		}
	}, [])

    if(loading){
        return( <p>
			{loading && (
				<FontAwesomeIcon icon={faSpinner} spin className={styles.fa} />
			)}
		</p> )
    }

    // useEffect(() => {
    //     fetchAPI(); 
    // }, []);

    // const handleRegionChange = async (region) => {
    //     // const fetchedData = await fetchDailyData(region);
    //     setRegion(region)
    // };
    return (
        <div className={styles.container}>
            {/* <Chart data={totalData} departement="" loading={loading} /> */}
            <RegionPicker handleRegionChange={ handleRegionChange } region = {region}/>
            <Chart dailyData={dailyData} region ={region} />
        </div>
    );
};

