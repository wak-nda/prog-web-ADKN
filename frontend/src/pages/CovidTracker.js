import React, { useState, useEffect } from 'react';

import { fetchTotalData } from '../api';

export const CovidTracker = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setData(await fetchTotalData());
            // console.log(data);
        }
        fetchAPI();
        // console.log(data);
    }, []);

    return (
        <div>
            <h1> Hello Covid tracker</h1>
            <h2>{ data.map(({ numberOfHospitalized }) => numberOfHospitalized) }</h2>
        </div>
    );
}

